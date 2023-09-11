import { IEmail } from "../../interfaces/IUser/IEmail";
import { IMessage } from "../../interfaces/IUser/IMessage";
import ISetPasswordData from "../../interfaces/IUser/ISetPasswordData";
import { api } from "./api";

const passwordApi = api.injectEndpoints({
    endpoints: build => ({
        resetPassword: build.mutation<IEmail, IEmail>({
            query: (body: IEmail) => ({
                url: "/send-set-password-link",
                method: "post",
                body
            }),
        }),
        setPassword: build.mutation<IMessage, ISetPasswordData>({
            query: (body: ISetPasswordData) => ({
                url: "/users/set-password",
                method: "post",
                body
            }),
        }),
    })
});

export const { useSetPasswordMutation, useResetPasswordMutation } = passwordApi;