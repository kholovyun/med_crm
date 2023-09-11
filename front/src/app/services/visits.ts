import IVisitGetDto from "../../interfaces/IVisit/IVisitGetDto";
import IVisitCreateDto from "../../interfaces/IVisit/IVisitCreateDto";
import { api } from "./api";
import { IMessage } from "../../interfaces/IUser/IMessage";

const visitsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVisitsByChildId: build.query<IVisitGetDto[], string>({
            query: (id: string) => ({
                url: `/visits/${id}`,
                method: "GET",
            }),
            providesTags: ["Visit"]
        }),
        createVisit: build.mutation<IVisitGetDto, IVisitCreateDto>({
            query: (visitDto: IVisitCreateDto) => ({
                url: "/visits",
                method: "POST",
                body: visitDto
            }),
            invalidatesTags: ["Visit"]
        }),
        deleteVisit: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/visits/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Visit"]
        })
    })
});

export const {
    useLazyGetVisitsByChildIdQuery,
    useCreateVisitMutation,
    useDeleteVisitMutation
} = visitsApi;