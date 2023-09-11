import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import Logger from "../lib/logger";

dotenv.config();

export class PostgresDB {

    private sequelize: Sequelize;
    constructor() {
        this.sequelize = new Sequelize({
            database: process.env.PG_DB,
            dialect: "postgres",
            host: process.env.PG_HOST,
            username: process.env.PG_USER,
            password: process.env.PG_PASS,
            storage: ":memory",
            models: [path.join(__dirname, "../models")]
        });
    }

    public getSequelize = (): Sequelize => {
        return this.sequelize;
    };

    public close = async (): Promise<void> => {
        await this.sequelize.close();
    };

    public init = async (): Promise<void> => {
        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync({
                alter: true
            });
            Logger.info("DB postgres is connected");
        } catch (err: unknown) {
            const error = err as Error;
            Logger.error(error.message);
        }
    };
}

export const postgresDB = new PostgresDB();