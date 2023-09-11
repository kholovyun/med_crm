
import IDocumentGetDto from "../../interfaces/IDocument/IDocumentGetDto";
import { IMessage } from "../../interfaces/IUser/IMessage";
import {api} from "./api";

const documentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDocumentsByChildId: build.query<IDocumentGetDto[], string>({
            query: (id: string) => ({
                url: `/documents/${id}`,
                method: "GET",
            }),
            providesTags: ["Document"]
        }),
        createDocument: build.mutation<IDocumentGetDto, FormData>({
            query: (documentDto: FormData) => ({
                url: "/documents/",
                method: "POST",
                body: documentDto
            }),
            invalidatesTags: ["Document"]
        }),

        deleteDocument: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/documents/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Document"]
        })
    }),
});

export const {
    useCreateDocumentMutation,
    useGetDocumentsByChildIdQuery,
    useDeleteDocumentMutation
} = documentsApi;