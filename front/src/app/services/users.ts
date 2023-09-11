import { api } from "./api";
import IUserGetDto from "../../interfaces/IUser/IUserGetDto";
import IUserCreateDto from "../../interfaces/IUser/IUserCreateDto";
import IUserGetDtoWithToken from "../../interfaces/IUser/IUserGetDtoWithToken";
import IUserLoginDto from "../../interfaces/IUser/IUserLoginDto";
import IUserUpdateDto from "../../interfaces/IUser/IUpdateUserDto";
import IUserCreateParentWithChildDto from "../../interfaces/IUser/IUserCreateParentWithChildDto";

const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<{rows: IUserGetDto[], count: number}, {offset: number, limit: number, filter: string}>({
            query: ({offset, limit, filter}) => ({
                url: "/users",
                method: "GET",
                params: {offset, limit, filter}
            }),
            providesTags: ["User"]
        }),
        createUser: build.mutation<IUserCreateDto, IUserCreateDto>({
            query: (userDto: IUserCreateDto) => ({
                url: "/users",
                method: "POST",
                body: userDto
            }),
            invalidatesTags: ["User", "Doctor"]
        }),
        editUser: build.mutation<IUserGetDtoWithToken, {id: string, userDto:IUserUpdateDto}>({
            query: ({id, userDto}) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: userDto
            }),
            invalidatesTags: ["User", "Parent", "Doctor"]
        }),
        login: build.mutation<IUserGetDtoWithToken, IUserLoginDto>({
            query: (body: IUserLoginDto) => ({
                url: "/users/login",
                method: "POST",
                body
            }),
        }),
        blockUser: build.mutation<IUserGetDto, IUserGetDto>({
            query: (user) => ({
                url: `/users/block/${user.id}`,
                method: "PATCH",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        createUserParent: build.mutation<IUserCreateParentWithChildDto, IUserCreateParentWithChildDto>({
            query: (userDto: IUserCreateParentWithChildDto) => ({
                url: "/users/parent",
                method: "POST",
                body: userDto
            }),
            invalidatesTags: ["User", "Doctor"]
        }),
        checkToken: build.query<IUserGetDtoWithToken, void>({
            query: () => ({
                url: "/users/token",
                method: "GET"
            }),
            providesTags: ["User"]
        })
    })
});

export const { 
    useGetUsersQuery, 
    useCreateUserMutation, 
    useLoginMutation, 
    useBlockUserMutation,
    useEditUserMutation,
    useCreateUserParentMutation,
    useLazyCheckTokenQuery
} = usersApi;
export default usersApi;