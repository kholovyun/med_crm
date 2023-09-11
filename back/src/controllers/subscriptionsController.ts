import { subscriptionsDb, SubscriptionsDb } from "../repository/subDb/subscriptionsDb";
import express, { Request, Response, Router } from "express";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import IError from "../interfaces/IError";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class SubscriptionsController {
    private repository: SubscriptionsDb;
    private readonly router: Router;

    constructor() {
        this.repository = subscriptionsDb;
        this.router = express.Router();
        this.router.post("/", permission([ERoles.DOCTOR, ERoles.PARENT]), this.renewSubscription);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private renewSubscription = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.renewSubscription(user.id, req.body.sub);
        res.status(response.status).send(response.result);
    };
}