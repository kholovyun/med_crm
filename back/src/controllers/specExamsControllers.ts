import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import { ERoles } from "../enums/ERoles";
import { permission } from "../middleware/permission";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IError from "../interfaces/IError";
import { SpecialistExams, specialistExamsDb } from "../repository/subDb/specialistExamsDb";
import ISpecialistExamsGetDto from "../interfaces/ISpecialistExams/ISpecialistExamsGetDto";
import ISpecialistExamsCreateDto from "../interfaces/ISpecialistExams/ISpecialistExamsCreateDto";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class SpecExamsController {
    private repository: SpecialistExams;
    private router: Router;

    constructor() {
        this.repository = specialistExamsDb;
        this.router = express.Router();
        this.router.get("/:id", permission([ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT]), this.getSpecialistExamsByChildId);
        this.router.post("/", permission([ERoles.DOCTOR, ERoles.PARENT]), this.createSpecialistExam);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.PARENT]), this.deleteSpecialistExam);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getSpecialistExamsByChildId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<ISpecialistExamsGetDto[] | IError> = await this.repository.getSpecialistExamsByChildId(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createSpecialistExam = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<ISpecialistExamsCreateDto | IError> = await this.repository.createSpecialistExam(user.id, req.body);
        res.status(response.status).send(response.result);
    };

    private deleteSpecialistExam = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteSpecialistExam(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

}