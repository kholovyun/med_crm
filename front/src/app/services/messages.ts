import IChatMessage from "../../interfaces/IChatMessages/IChatMessage";
import IChatMessageWithUserGetDto from "../../interfaces/IChatMessages/IChatMessageWithUserGetDto";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { api } from "./api";

const messagesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMessagesByQuestion: build.query<IChatMessageWithUserGetDto[], {id: string}>({
            query: ({id}) => ({
                url: `/messages/${id}`,
                method: "GET"
            }),
            providesTags: ["Message"]
        }),
        createMessage: build.mutation<{response: IChatMessage}, {newMessage: FormData}>({
            query: ({newMessage}) => ({
                url: "/messages",
                method: "POST",
                body: newMessage
            }),
            invalidatesTags: ["Message", "MessagesStatus"]
        }),
        deleteMessage: build.mutation<{response: IMessage}, {id: string}>({
            query: ({id}) => ({
                url: `/messages/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Message", "MessagesStatus"]
        })
    }),
});

export const {
    useGetMessagesByQuestionQuery,
    useCreateMessageMutation,
    useDeleteMessageMutation
} = messagesApi;