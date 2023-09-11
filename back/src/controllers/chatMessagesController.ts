import express, { Request, Response, Router } from "express";
import multer from "multer";
import { config } from "../index.config";
import shortid from "shortid";
import { ChatMessagesDb, chatMessagesDb } from "../repository/subDb/chatMessagesDb";
import morganMiddleware from "../config/morganMiddleware";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import IError from "../interfaces/IError";
import { IMessage } from "../interfaces/IMessage";
import IChatMessageWithUserGetDto from "../interfaces/IChatMessage/IChatMessageWithUserGetDto";
import IChatMessage from "../interfaces/IChatMessage/IChatMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, config.messagesFiles);
    },
    filename(req, file, callback) {
        callback(null, `${shortid()}${file.originalname}`);
    },
});

const upload = multer({ storage });

export class ChatMessagesController {
    private repository: ChatMessagesDb;
    private readonly router: Router;

    constructor() {
        this.router = express.Router();
        this.router.use(morganMiddleware);
        this.router.get("/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.getMessagesByQuestion);
        this.router.post("/", [permission([ERoles.DOCTOR, ERoles.PARENT]), upload.single("url")], this.createMessage);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.PARENT]), this.deleteMessage);
        this.repository = chatMessagesDb;
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getMessagesByQuestion = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IChatMessageWithUserGetDto[] | IError> = await this.repository.getMessagesByQuestion(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createMessage = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const message = req.body;
        message.url = req.file ? req.file.filename : "";
        const response: IResponse<IChatMessage | IError> = await this.repository.createMessage(user.id, message);
        res.status(response.status).send(response.result);
    };

    private deleteMessage = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteMessage(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}