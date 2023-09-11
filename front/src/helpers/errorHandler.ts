import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { IMessage } from "../interfaces/IUser/IMessage";
import { IErrorResponse } from "../interfaces/IUser/IErrorResponse";
import { toast } from "react-toastify";
import {useEffect} from "react";

const errorHandler = (isError: boolean, data: FetchBaseQueryError | SerializedError | undefined) => {
    const err = data as IErrorResponse<IMessage>;
    return useEffect(() => {
        isError && toast.error(`Ошибка ${err.data.message}`);
    }, [isError]);
};

export default errorHandler;