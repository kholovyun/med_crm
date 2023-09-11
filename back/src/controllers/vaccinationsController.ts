import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import { ERoles } from "../enums/ERoles";
import { permission } from "../middleware/permission";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IVaccination from "../interfaces/IVaccination/IVaccination";
import IError from "../interfaces/IError";
import IVaccinationCreateDto from "../interfaces/IVaccination/IVaccinationCreateDto";
import { VaccinationsDb, vaccinationsDb } from "../repository/subDb/vaccinationsDb";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class VaccinationsController {
    private repository: VaccinationsDb;
    private router: Router;

    constructor() {
        this.repository = vaccinationsDb;
        this.router = express.Router();
        this.router.get("/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.getVaccinations);
        this.router.post("/", permission([ERoles.DOCTOR, ERoles.SUPERADMIN, ERoles.PARENT]), this.createVaccination);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.SUPERADMIN, ERoles.PARENT]), this.deleteVaccination);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getVaccinations = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IVaccination[] | IError> = await this.repository.getVaccinations(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createVaccination = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IVaccinationCreateDto | IError> = await this.repository.createVaccination(user.id, req.body);
        res.status(response.status).send(response.result);
    };

    private deleteVaccination = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteVaccination(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}