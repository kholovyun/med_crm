import IAllergyGetDto from "../../interfaces/IAllergy/IAllergyGetDto";
import IAllergyCreateDto from "../../interfaces/IAllergy/IAllergyCreateDto";
import { api } from "./api";
import { IMessage } from "../../interfaces/IUser/IMessage";

const allergiesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllergiesByChildId: build.query<IAllergyGetDto[], string>({
            query: (id: string) => ({
                url: `/allergies/${id}`,
                method: "GET",
            }),
            providesTags: ["Allergy"]
        }),
        createAllergy: build.mutation<IAllergyGetDto, IAllergyCreateDto>({
            query: (allergyDto: IAllergyCreateDto) => ({
                url: "/allergies",
                method: "POST",
                body: allergyDto
            }),
            invalidatesTags: ["Allergy"]
        }),
        deleteAllergy: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/allergies/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Allergy"]
        })
    })
});

export const {
    useLazyGetAllergiesByChildIdQuery,
    useCreateAllergyMutation,
    useDeleteAllergyMutation
} = allergiesApi;