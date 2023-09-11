import ISpecialistExamsGetDto from "../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";
import ISpecialistExamsCreateDto from "../../interfaces/ISpecialistExams/ISpecialistExamsCreateDto";
import { api } from "./api";
import { IMessage } from "../../interfaces/IUser/IMessage";

const spexExamsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSpecExamsByChildId: build.query<ISpecialistExamsGetDto[], string>({
            query: (id: string) => ({
                url: `/examinations/${id}`,
                method: "GET",
            }),
            providesTags: ["Examination"]
        }),
        createExam: build.mutation<ISpecialistExamsGetDto, ISpecialistExamsCreateDto>({
            query: (exam: ISpecialistExamsCreateDto) => ({
                url: "/examinations",
                method: "POST",
                body: exam
            }),
            invalidatesTags: ["Examination"]
        }),
        deleteExam: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/examinations/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Examination"]
        })
    })
});

export const {
    useLazyGetSpecExamsByChildIdQuery,
    useCreateExamMutation,
    useDeleteExamMutation
} = spexExamsApi;