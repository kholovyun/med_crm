import express, { Request, Response, Router } from "express";
import { NewbornDatasDb, newbornDatasDb } from "../repository/subDb/newbornDatasDb";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import INewBornDataGetDto from "../interfaces/IChild/INewBornData/INewBornDataGetDto";
import IError from "../interfaces/IError";

export class NewbornDatasController {
    private repository: NewbornDatasDb;
    private readonly router: Router;

    constructor() {
        this.repository = newbornDatasDb;
        this.router = express.Router();
        this.router.get("/:id", permission([ERoles.DOCTOR, ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.PARENT]), this.getNewbornDataByChildId);
        this.router.put("/:id", permission([ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR]) ,this.updateNewbornDataByChildId);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    public getNewbornDataByChildId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as { id: string, email: string, role: string };
        const response: IResponse<INewBornDataGetDto[] | IError> = await this.repository.getNewbornDataByChildId(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    public updateNewbornDataByChildId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as { id: string, email: string, role: string };
        const response: IResponse<INewBornDataGetDto | IError> = await this.repository.updateNewbornDataByChildId(user.id, req.params.id, req.body);
        res.status(response.status).send(response);
    };
}