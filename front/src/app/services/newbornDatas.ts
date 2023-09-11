import INewBornDataGetDto from "../../interfaces/IChild/INewBornData/INewBornDataGetDto";
import INewBornDataCreateDto from "../../interfaces/IChild/INewBornData/INewBornDataCreateDto";
import { api } from "./api";

const newbornDatasApi = api.injectEndpoints({
    endpoints: (build) => ({
        getNewbornDatasByChildId: build.query<INewBornDataGetDto[], string>({
            query: (id: string) => ({
                url: `/newborn-data/${id}`,
                method: "GET",
            }),
            providesTags: ["NewbornData"]
        }),
        updateNewbornData: build.mutation<INewBornDataGetDto, {id: string, newbornData: INewBornDataCreateDto}>({
            query: ({id, newbornData}) => ({
                url: `/newborn-data/${id}`,
                method: "PUT",
                body: newbornData
            }),
            invalidatesTags: ["NewbornData"]
        })
    })
});

export const {
    useGetNewbornDatasByChildIdQuery,
    useUpdateNewbornDataMutation
} = newbornDatasApi;