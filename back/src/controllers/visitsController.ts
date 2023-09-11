import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IError from "../interfaces/IError";
import { VisitsDb, visitDb } from "../repository/subDb/visitsDb";
import IVisitGetDto from "../interfaces/IVisit/IVisitGetDto";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class VisitsController {
    private repository: VisitsDb;
    private router: Router;

    constructor() {
        this.repository = visitDb;
        this.router = express.Router();
        this.router.get("/:id", permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.PARENT]), this.getVisitsByChildId);
        this.router.post("/", permission([ERoles.DOCTOR]), this.createVisit);
        this.router.delete("/:id", permission([ERoles.DOCTOR]), this.deleteVisit);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getVisitsByChildId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IVisitGetDto[] | IError> = await this.repository.getVisitsByChildId(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createVisit = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const visit = req.body;
        const response: IResponse<IVisitGetDto | IError> = await this.repository.createVisit(user.id, visit);
        res.status(response.status).send(response.result);
    };

    private deleteVisit = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteVisit(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}