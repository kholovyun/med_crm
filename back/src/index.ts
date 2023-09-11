import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Logger from "./lib/logger";
import router from "./routes/setPassword";
import { postgresDB } from "./repository/postgresDb";
import { UsersController } from "./controllers/usersController";
import { DoctorsController } from "./controllers/doctorsController";
import { ParentsController } from "./controllers/parentsController";
import { DiplomasController } from "./controllers/diplomasController";
import { RecommendationsController } from "./controllers/recommendationsController";
import { childrenController } from "./controllers/childrenController";
import { ReviewController } from "./controllers/reviewController";
import { DocumentsController } from "./controllers/documentsController";
import { AllergiesController } from "./controllers/allergiesController";
import { VaccinationsController } from "./controllers/vaccinationsController";
import { VisitsController } from "./controllers/visitsController";
import { QuestionsController } from "./controllers/questionsController";
import { SpecExamsController } from "./controllers/specExamsControllers";
import job from "./sheduleSubscripttion/sheduleSubscription";
import { ChatMessagesController } from "./controllers/chatMessagesController";
import { ChatMessagesStatusController } from "./controllers/chatMessagesStatusController";
import {SubscriptionsController} from "./controllers/subscriptionsController";
import { NewbornDatasController } from "./controllers/newbornDatasController";

dotenv.config();

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static("public"));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(router);
    }

    public init = async (): Promise<void> => {
        try {
            this.app.listen(process.env.APP_PORT, () => {
                Logger.info(`Server is running on port ${process.env.APP_PORT}`);
            });
            postgresDB.init();
            this.app.use("/users", new UsersController().getRouter());
            this.app.use("/doctors", new DoctorsController().getRouter());
            this.app.use("/parents", new ParentsController().getRouter());
            this.app.use("/diplomas", new DiplomasController().getRouter());
            this.app.use("/recommendations", new RecommendationsController().getRouter());
            this.app.use("/children", new childrenController().getRouter());
            this.app.use("/reviews", new ReviewController().getRouter());
            this.app.use("/documents", new DocumentsController().getRouter());
            this.app.use("/allergies", new AllergiesController().getRouter());
            this.app.use("/vaccinations", new VaccinationsController().getRouter());
            this.app.use("/visits", new VisitsController().getRouter());
            this.app.use("/questions", new QuestionsController().getRouter());
            this.app.use("/examinations", new SpecExamsController().getRouter());
            this.app.use("/messages", new ChatMessagesController().getRouter());
            this.app.use("/messages-status", new ChatMessagesStatusController().getRouter());
            this.app.use("/renew", new SubscriptionsController().getRouter());
            this.app.use("/newborn-data", new NewbornDatasController().getRouter());
            job;
        } catch (err: unknown) {
            const error = err as Error;
            Logger.error(`Server error: ${error.message}`);
        }
    };
}

export const app = new App();

app.init()
    .then(() => {
        Logger.info("Server is OK");
    })
    .catch(() => {
        Logger.error("Server is NOT OK");
    });
