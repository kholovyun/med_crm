import express, { Request, Response, Router } from "express";
import IResponse from "../interfaces/IResponse";
import IDiplomaGetDto from "../interfaces/IDiploma/IDiplomaGetDto";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import { config } from "../index.config";
import multer from "multer";
import shortid from "shortid";
import { DiplomasDb, diplomasDb } from "../repository/subDb/diplomasDb";
import IError from "../interfaces/IError";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, config.doctorsDiplomas);
    },
    filename(req, file, callback) {
        callback(null, `${shortid()}${file.originalname}`);
    },
});

const upload = multer({ storage });

export class DiplomasController {
    private repository: DiplomasDb;
    private readonly router: Router;

    constructor() {
        this.repository = diplomasDb;
        this.router = express.Router();
        this.router.get("/:id", permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.PARENT, ERoles.SUPERADMIN]), this.getDiplomasByDoctor);
        this.router.post("/", [permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN]), upload.single("url")], this.createDiploma);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN]), this.deleteDiploma);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getDiplomasByDoctor = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IDiplomaGetDto[] | IError> = await this.repository.getDiplomasByDoctor(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private createDiploma = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const diploma = req.body;
        diploma.url = req.file ? req.file.filename : "";
        const response: IResponse<IDiplomaGetDto | IError> = await this.repository.createDiploma(user.id, diploma);
        res.status(response.status).send(response.result);
    };

    private deleteDiploma = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteDiploma(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}