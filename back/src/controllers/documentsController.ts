import express, { Request, Response, Router } from "express";
import multer from "multer";
import { config } from "../index.config";
import shortid from "shortid";
import { DocumentsDb, documentsDb } from "../repository/subDb/documentsDb";
import { permission } from "../middleware/permission";
import { ERoles } from "../enums/ERoles";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IResponse from "../interfaces/IResponse";
import IDocumentGetDto from "../interfaces/IDocument/IDocumentGetDto";
import IError from "../interfaces/IError";
import { IMessage } from "../interfaces/IMessage";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, config.childrenDocuments);
    },
    filename(req, file, callback) {
        callback(null, `${shortid()}${file.originalname}`);
    },
});

const upload = multer({ storage });

export class DocumentsController {
    private repository: DocumentsDb;
    private readonly router: Router;

    constructor() {
        this.repository = documentsDb;
        this.router = express.Router();
        this.router.post("/", [permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.PARENT]), upload.single("url")], this.createDocument);
        this.router.delete("/:id", permission([ERoles.DOCTOR, ERoles.ADMIN, ERoles.PARENT, ERoles.SUPERADMIN]), this.deleteDocument);
        this.router.get("/:id", permission([ERoles.DOCTOR, ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.PARENT]), this.getDocumentsByChildId);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private createDocument = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const document = req.body;
        document.url = req.file ? req.file.filename : "";
        const response: IResponse<IDocumentGetDto | IError> = await this.repository.createDocument(user.id, document);
        res.status(response.status).send(response.result);
    };

    private deleteDocument = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IMessage | IError> = await this.repository.deleteDocument(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };

    private getDocumentsByChildId = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const response: IResponse<IDocumentGetDto[] | IError> = await this.repository.getDocumentsByChildId(user.id, req.params.id);
        res.status(response.status).send(response.result);
    };
}