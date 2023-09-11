import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ERoles } from "../enums/ERoles";
import jwt from "jsonwebtoken";
import { errorCodesMathcher } from "../helpers/errorCodeMatcher";
import { EErrorMessages } from "../enums/EErrorMessages";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export const permission = (roles?: ERoles[]) => {
    return (expressReq: Request, res: Response, next: NextFunction) => {
        const req = expressReq as IRequestWithTokenData;
        if (req.method === "OPTIONS") next();
        try {
            const data = jwt.verify(req.get("Authorization") || "", process.env.SECRET_KEY || "") as IUserGetDto;
            if (roles && !roles.includes(data.role)) throw new Error(EErrorMessages.NO_ACCESS);
            req.dataFromToken = data;
            next();
        } catch (err: unknown) {
            const error = err as Error;
            const status = errorCodesMathcher[error.message] || StatusCodes.UNAUTHORIZED;
            res.status(status).send(error.message);
        }
    };
};