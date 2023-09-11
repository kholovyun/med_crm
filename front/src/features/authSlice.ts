import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";
import usersApi from "../app/services/users";
import IAuthState from "./IAuthState";
import { getTokenFromStorage } from "../helpers/getTokenFromStorage";
import jwt_decode from "jwt-decode";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

const localToken = getTokenFromStorage();

const getUserFromToken = (token: string | null) => {
    try {
        const user: IUserGetDto | null = jwt_decode(token || "");
        return user;
    } catch (error: unknown) {
        return null;
    }
};

const localUser = getUserFromToken(localToken);

const initialState: IAuthState = {
    user: localUser,
    token: localToken
};

const authSlice  = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.login.matchFulfilled,
            (state: IAuthState, action: PayloadAction<IUserGetDtoWithToken>) => {
                const userWithToken = action.payload;
                state.user = {
                    id: userWithToken.id,
                    role: userWithToken.role,
                    email: userWithToken.email,
                    phone: userWithToken.phone,
                    name: userWithToken.name,
                    surname: userWithToken.surname,
                    patronim: userWithToken.patronim,
                    isBlocked: userWithToken.isBlocked
                };
                state.token = action.payload.token;
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            }
        );
        builder.addMatcher(
            usersApi.endpoints.editUser.matchFulfilled,
            (state: IAuthState, action: PayloadAction<IUserGetDtoWithToken>) => {
                const userWithToken = action.payload;
                state.user = {
                    id: userWithToken.id,
                    role: userWithToken.role,
                    email: userWithToken.email,
                    phone: userWithToken.phone,
                    name: userWithToken.name,
                    surname: userWithToken.surname,
                    patronim: userWithToken.patronim,
                    isBlocked: userWithToken.isBlocked
                };
                state.token = action.payload.token;
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            }
        );
        builder.addMatcher(
            usersApi.endpoints.checkToken.matchFulfilled,
            (state: IAuthState, action: PayloadAction<IUserGetDtoWithToken>) => {
                const userWithToken = action.payload;
                state.user = {
                    id: userWithToken.id,
                    role: userWithToken.role,
                    email: userWithToken.email,
                    phone: userWithToken.phone,
                    name: userWithToken.name,
                    surname: userWithToken.surname,
                    patronim: userWithToken.patronim,
                    isBlocked: userWithToken.isBlocked
                };
                state.token = action.payload.token;
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            }
        );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;