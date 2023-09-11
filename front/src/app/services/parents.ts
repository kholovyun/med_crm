import IParentWithUserAndDoctorDto from "../../interfaces/IParent/IParentWithUserAndDoctorDto";
import IParentWithUserDto from "../../interfaces/IParent/IParentWithUserDto";
import { api } from "./api";

const parentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getParentsByDoctor: build.query<
            { rows: IParentWithUserDto[]; count: number },
            { offset: number; limit: number; id: string }>({
                query: ({ offset, limit, id }) => ({
                    url: `/parents/doctor/${id}`,
                    method: "GET",
                    params: { offset, limit },
                }),
                providesTags: ["Parent"],
            }),
        getParentByUserId: build.query<IParentWithUserAndDoctorDto, {id: string}>({
            query: ({ id }) => ({
                url: `/parents/${id}`,
                method: "GET",
            }),
            providesTags: ["Parent"],
        }),
        activateParent: build.mutation<IParentWithUserDto, string>({
            query: (id: string) => ({
                url: `/parents/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Parent"],
        })
    }),
});

export const {
    useLazyGetParentsByDoctorQuery,
    useGetParentByUserIdQuery,
    useActivateParentMutation,
} = parentsApi;