import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export default interface IRequestWithTokenData extends Request {
    dataFromToken: string | JwtPayload
}