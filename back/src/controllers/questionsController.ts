import express, { Request, Response, Router } from "express";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import IError from "../interfaces/IError";
import { QuestionsDb, questionsDb } from "../repository/subDb/questionsDb";
import IQuestionCreateDto from "../interfaces/IQuestion/IQuestionCreateDto";
import IQuestionGetDto from "../interfaces/IQuestion/IQuestionGetDto";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class QuestionsController {
    private repository: QuestionsDb;
    private router: Router;

    constructor() {
        this.repository = questionsDb;
        this.router = express.Router();
        this.router.get("/child/:id", permission([ERoles.PARENT, ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN]), this.getQuestionsByChildId);
        this.router.get("/doctor/:id", permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN]), this.getQuestionsByDoctorId);
        this.router.post("/", permission([ERoles.PARENT]), this.createQuestion);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getQuestionsByChildId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IQuestionGetDto[] | IError> = await this.repository.getQuestionsByChildId(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private getQuestionsByDoctorId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IQuestionGetDto[] | IError> = await this.repository.getQuestionsByDoctorId(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createQuestion = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IQuestionCreateDto | IError> = await this.repository.createQuestion(user.id, req.body);
        res.status(response.status).send(response.result);
    };
}