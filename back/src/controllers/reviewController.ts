import express, { Request, Response, Router } from "express";
import { ReviewsDb, reviewsDb } from "../repository/subDb/reviewsDb";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import IReviewGetDto from "../interfaces/IReview/IReviewGetDto";
import IError from "../interfaces/IError";
import IReviewCreateDto from "../interfaces/IReview/IReviewCreateDto";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

export class ReviewController {
    private repository: ReviewsDb;
    private router: Router;

    constructor() {
        this.repository = reviewsDb;
        this.router = express.Router();
        this.router.get("/", permission([ERoles.ADMIN, ERoles.SUPERADMIN]), this.getReviews);
        this.router.post("/", permission([ERoles.PARENT]), this.createReview);
        this.router.delete("/:id", permission([ERoles.SUPERADMIN]), this.deleteReview);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getReviews = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<{rows: IReviewGetDto[], count: number} | IError> = await this.repository.getReviews(
            user.id, String(req.query.offset), String(req.query.limit)
        );
        res.status(response.status).send(response.result);
    };

    private createReview = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IReviewCreateDto | IError> = await this.repository.createReview(user.id, req.body);
        res.status(response.status).send(response.result);
    };

    private deleteReview = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteReview(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}