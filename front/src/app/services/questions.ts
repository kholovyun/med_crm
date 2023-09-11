import IQuestionCreateDto from "../../interfaces/IQuestion/IQuestionCreateDto";
import IQuestionGetDto from "../../interfaces/IQuestion/IQuestionGetDto";
import { api } from "./api";

const questionsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getQuestionsByChildId: build.query<IQuestionGetDto[], string>({
            query: (id: string) => ({
                url: `/questions/child/${id}`,
                method: "GET",
            }),
            providesTags: ["Question"]
        }),
        getQuestionsByDoctorId: build.query<IQuestionGetDto[], string>({
            query: (id: string) => ({
                url: `/questions/doctor/${id}`,
                method: "GET",
            }),
            providesTags: ["Question"]
        }),
        createQuestion: build.mutation<IQuestionGetDto, IQuestionCreateDto>({
            query: (question: IQuestionCreateDto) => ({
                url: "/questions/",
                method: "POST",
                body: question
            }),
            invalidatesTags: ["Question"]
        }),
    })
});

export const {
    useLazyGetQuestionsByChildIdQuery,
    useCreateQuestionMutation,
    useLazyGetQuestionsByDoctorIdQuery,
    useGetQuestionsByDoctorIdQuery
} = questionsApi;