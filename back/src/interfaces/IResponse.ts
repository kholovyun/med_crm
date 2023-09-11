import { StatusCodes } from "http-status-codes";


export default interface IResponse<T> {
    status: StatusCodes
    result: T
}