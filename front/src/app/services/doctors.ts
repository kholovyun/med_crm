import IDoctor from "../../interfaces/IDoctor/IDoctor";
import IDoctorWithUser from "../../interfaces/IDoctor/IDoctorWithUser";
import IGetListParams from "../../interfaces/IGetListParams/IGetListParams";
import { api } from "./api";

const doctorsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query<{ rows: IDoctorWithUser[], count: number }, IGetListParams>({
            query: (params) => ({
                url: "/doctors",
                method: "GET",
                params: params,
            }),
            providesTags: ["Doctor"],
        }),
        getDoctorByUserId: build.query<IDoctorWithUser, { id: string }>({
            query: ({ id }) => ({
                url: `/doctors/userid/${id}`,
                method: "GET",
            }),
            providesTags: ["Doctor", "User"],
        }),
        getDoctorByDoctorId: build.query<IDoctorWithUser, { id: string }>({
            query: ({ id }) => ({
                url: `/doctors/${id}`,
                method: "GET",
            }),
            providesTags: ["Doctor"],
        }),
        editDoctor: build.mutation<IDoctor, { id: string, data: FormData }>({
            query: ({ id, data }) => ({
                url: `/doctors/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Doctor", "User"],
        }),
        activateDoctor: build.mutation<IDoctorWithUser, IDoctorWithUser>({
            query: (doctor) => ({
                url: `/doctors/${doctor.id}`,
                method: "PATCH",
                body: doctor,
            }),
            invalidatesTags: ["Doctor"],
        }),
        blockDoctor: build.mutation<IDoctorWithUser, IDoctorWithUser>({
            query: (doctor) => ({
                url: `/users/block/${doctor.userId}`,
                method: "PATCH",
                body: doctor,
            }),
            invalidatesTags: ["Doctor"],
        }),
        changeDoctorPrice: build.mutation<IDoctorWithUser, { id: string, obj: { price: string } }>({
            query: ({ id, obj }) => ({
                url: `/doctors/price/${id}`,
                method: "PATCH",
                body: obj,
            }),
            invalidatesTags: ["Doctor"],
        }),
    }),
});

export const {
    useGetDoctorsQuery,
    useGetDoctorByUserIdQuery,
    useGetDoctorByDoctorIdQuery,
    useEditDoctorMutation,
    useActivateDoctorMutation,
    useBlockDoctorMutation,
    useChangeDoctorPriceMutation
} = doctorsApi;