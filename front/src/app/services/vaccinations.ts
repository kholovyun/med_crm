import { IMessage } from "../../interfaces/IUser/IMessage";
import IVaccinationGetDto from "../../interfaces/IVaccination/IVaccinationGetDto";
import IVaccinationCreateDto from "../../interfaces/IVaccination/IVaccinationCreateDto";
import { api } from "./api";

const vaccinationsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVaccinationsByChildId: build.query<IVaccinationGetDto[], string>({
            query: (id: string) => ({
                url: `/vaccinations/${id}`,
                method: "GET",
            }),
            providesTags: ["Vaccination"]
        }),
        createVaccination: build.mutation<IVaccinationGetDto,IVaccinationCreateDto>({
            query: (vacDto: IVaccinationCreateDto) => ({
                url: "/vaccinations",
                method: "POST",
                body: vacDto
            }),
            invalidatesTags: ["Vaccination"]
        }),
        deleteVaccination: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/vaccinations/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Vaccination"]
        })
    })
});

export const {
    useLazyGetVaccinationsByChildIdQuery,
    useDeleteVaccinationMutation,
    useCreateVaccinationMutation
} = vaccinationsApi;