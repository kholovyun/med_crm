import IChatMessageStatusCreateDto from "../../interfaces/IChatMessagesStatus/IChatMessageStatusCreateDto";
import IChatMessagesStatusGetDto from "../../interfaces/IChatMessagesStatus/IChatMessagesStatusGetDto";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { api } from "./api";

const messagesStatusApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMessagesStatusByMessage: build.query<IChatMessagesStatusGetDto[], {id: string}>({
            query: ({id}) => ({
                url: `/messages-status/${id}`,
                method: "GET"
            }),
            providesTags: ["MessagesStatus"]
        }),
        createMessageStatus: build.mutation<{response: IMessage}, {newStatus: IChatMessageStatusCreateDto}>({
            query: ({newStatus}) => ({
                url: "/messages-status",
                method: "POST",
                body: newStatus
            }),
            invalidatesTags: ["MessagesStatus"]
        })
    }),
});

export const {
    useGetMessagesStatusByMessageQuery,
    useCreateMessageStatusMutation
} = messagesStatusApi;