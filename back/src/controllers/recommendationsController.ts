import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import { config } from "../index.config";
import multer from "multer";
import shortid from "shortid";
import IError from "../interfaces/IError";
import { RecommendationsDb, recommendationDb } from "../repository/subDb/recommendationsDb";
import IRecommendationCetDto from "../interfaces/IRecommendation/IRecommendationGetDto";
import IRecommendationCreateDto from "../interfaces/IRecommendation/IRecommendationCreateDto";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, config.docRecommends);
    },
    filename(req, file, callback) {
        callback(null, `${shortid()}${file.originalname}`);
    },
});

const upload = multer({ storage });

export class RecommendationsController {
    private repository: RecommendationsDb;
    private router: Router;

    constructor() {
        this.repository = recommendationDb;
        this.router = express.Router();
        this.router.get("/:id", permission(), this.getRecommendationsByDoctorId);
        this.router.post("/", [permission([ERoles.DOCTOR]), upload.single("url")], this.createRecommendation);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN]), this.deleteRecommendation);
        this.router.put("/:id", [permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN]), upload.single("url")], this.editRecommendation);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getRecommendationsByDoctorId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const response: IResponse<IRecommendationCetDto[] | IError> = await this.repository.getRecommendationsByDoctor(req.params.id);
        res.status(response.status).send(response.result);
    };

    private createRecommendation = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const recommendation = req.body;
        recommendation.url = req.file ? req.file.filename : "";
        const response: IResponse<IRecommendationCreateDto | IError> = await this.repository.createRecommendation(user.id, recommendation);
        res.status(response.status).send(response.result);
    };

    private deleteRecommendation = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteRecommendation(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private editRecommendation = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const upgradedRecommendation = req.body;
        if (req.file && req.file.filename) {
            upgradedRecommendation.url = req.file.filename;
        }
        const response: IResponse<IRecommendationCreateDto | IError> = await this.repository.editRecommendation(user.id, req.params.id , upgradedRecommendation);
        res.status(response.status).send(response.result);
    };
}