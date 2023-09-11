import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import { ERoles } from "../enums/ERoles";
import { permission } from "../middleware/permission";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IAllergy from "../interfaces/IAllergy/IAllergy";
import IError from "../interfaces/IError";
import IAllergyCreateDto from "../interfaces/IAllergy/IAllergyCreateDto";
import { AllergiesDb, allergiesDb } from "../repository/subDb/allergiesDb";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class AllergiesController {
    private repository: AllergiesDb;
    private readonly router: Router;

    constructor() {
        this.repository = allergiesDb;
        this.router = express.Router();
        this.router.get("/:id", permission([ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.getAllergies);
        this.router.post("/", permission([ERoles.DOCTOR, ERoles.SUPERADMIN, ERoles.PARENT]), this.createAllergy);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.SUPERADMIN, ERoles.PARENT]), this.deleteAllergy);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getAllergies = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IAllergy[] | IError> = await this.repository.getAllergies(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createAllergy = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IAllergyCreateDto | IError> = await this.repository.createAllergy(user.id, req.body);
        res.status(response.status).send(response.result);
    };

    private deleteAllergy = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteAllergy(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}