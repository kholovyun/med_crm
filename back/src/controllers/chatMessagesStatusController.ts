import express, { Request, Response, Router } from "express";
import morganMiddleware from "../config/morganMiddleware";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import IChatMessagesStatusGetDto from "../interfaces/IChatMessagesStatus/IChatMessagesStatusGetDto";
import IError from "../interfaces/IError";
import { ChatMessagesStatusDb, chatMessagesStatusDb } from "../repository/subDb/chatMessagesStatusDb";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class ChatMessagesStatusController {
    private repository: ChatMessagesStatusDb;
    private readonly router: Router;

    constructor() {
        this.router = express.Router();
        this.router.use(morganMiddleware);
        this.router.get("/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.getMessagesStatusByMessage);
        this.router.post("/", permission([ERoles.DOCTOR, ERoles.PARENT]), this.createMessageStatus);
        this.repository = chatMessagesStatusDb;
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getMessagesStatusByMessage = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IChatMessagesStatusGetDto[] | IError> = await this.repository.getMessagesStatusByMessage(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createMessageStatus = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.createMessageStatus(user.id, req.body);
        res.status(response.status).send(response.result);
    };
}