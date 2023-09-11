import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import IParentGetDto from "../interfaces/IParent/IParentGetDto";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import morganMiddleware from "../config/morganMiddleware";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import { ParentsDb, parentsDb } from "../repository/subDb/parentsDb";
import IError from "../interfaces/IError";
import IParentWithUserAndDoctorDto from "../interfaces/IParent/IParentWithUserAndDoctorDto";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class ParentsController {
    private repository: ParentsDb;
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.router.use(morganMiddleware);
        this.router.get("/doctor/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR]), this.getParentsByDoctorId);
        this.router.get("/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.getParentByUserId);
        this.router.patch("/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.PARENT]), this.activateParent);
        this.repository = parentsDb;
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getParentsByDoctorId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<{rows: IParentGetDto[], count: number} | IError> = await this.repository.getParentsByDoctorId(
            user.id, String(req.query.offset), String(req.query.limit), req.params.id
        );
        res.status(response.status).send(response.result);
    };

    private getParentByUserId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IParentWithUserAndDoctorDto | IError> = await this.repository.getParentByUserId(
            user.id,
            req.params.id
        );
        res.status(response.status).send(response.result);
    };

    private activateParent = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IParentGetDto | IError> = await this.repository.activateParent(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}