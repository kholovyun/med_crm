import hbs, {NodemailerExpressHandlebarsOptions} from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import {IMail} from "../interfaces/IMail";
import logger from "./logger";

dotenv.config();

const myEmail = process.env.EMAIL;

const sendMail = async (data: IMail) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        debug: true,
        secure: true,
        logger: true,
        auth: {
            user: myEmail,
            pass: process.env.CLIENT_SECRET
        },
    });

    const mailOptions = {
        from: `'Заботик' Мед.Сервис ${myEmail}`,
        to: data.recipient,
        subject: data.theme,
        template: "email",
        context: {
            msg: data.link,
        },
    };

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
        viewEngine: {
            partialsDir: path.resolve("./src/views/"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./src/views/"),
    };

    transporter.use("compile", hbs(handlebarOptions));

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            logger.info("Сообщение не отправлено: " + error.message);
        } else {
            logger.info("Сообщение отправлено: " + info.response);
        }
    });
};

export default sendMail;