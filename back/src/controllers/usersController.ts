import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";
import morganMiddleware from "../config/morganMiddleware";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import { IMessage } from "../interfaces/IMessage";
import { UsersDb, usersDb } from "../repository/subDb/usersDb";
import IError from "../interfaces/IError";

export class UsersController {
    private repository: UsersDb;
    private router: Router;
    constructor() {
        this.router = express.Router();
        this.router.use(morganMiddleware);
        this.router.post("/", permission([ERoles.ADMIN, ERoles.SUPERADMIN]), this.register);
        this.router.post("/parent", permission([ERoles.ADMIN, ERoles.DOCTOR, ERoles.SUPERADMIN]), this.registerParent);
        this.router.post("/login", this.login);
        this.router.get("/", permission([ERoles.ADMIN, ERoles.SUPERADMIN]), this.getUsers);
        this.router.patch("/:id", permission([ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.editUser);
        this.router.post("/set-password", this.setPassword);
        this.router.patch("/block/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN]), this.blockUser);
        this.router.get("/token", permission([ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.checkToken);
        this.repository = usersDb;
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getUsers = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<{rows: IUserGetDto[], count: number} | IError> = await this.repository.getUsers(
            user.id, String(req.query.offset), String(req.query.limit), String(req.query.filter));
        res.status(response.status).send(response.result);
    };

    public register = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IUserGetDto | IError> = await this.repository.register(user.id, req.body);
        res.status(response.status).send(response.result);
    };

    private registerParent = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IUserGetDto | IError> = await this.repository.registerParent(req.body, user.id);
        res.status(response.status).send(response.result);
    };

    private login = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDtoWithToken | IError> = await this.repository.login(req.body);
        res.status(response.status).send(response.result);
    };

    private editUser = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IUserGetDtoWithToken | IError> = await this.repository.editUser(user.id, req.params.id, req.body);
        res.status(response.status).send(response.result);
    };

    private setPassword = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IMessage> = await this.repository.setPassword(req.body);
        res.status(response.status).send(response.result);
    };

    private blockUser = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IUserGetDto | IError> = await this.repository.blockUser(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private checkToken = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IUserGetDtoWithToken | IError> = await this.repository.checkToken(user.id);
        res.status(response.status).send(response.result);
    };
}