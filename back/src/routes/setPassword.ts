import morganMiddleware from "../config/morganMiddleware";
import express, {Request, Response} from "express";
import sendMail from "../lib/mailer";
import jwt from "jsonwebtoken";
import {IEmailFromTokem} from "../interfaces/IEmailFromTokem";
import {User} from "../models/User";

const router = express.Router();

router.use(morganMiddleware);

router.post("/send-set-password-link", async (req: Request, res: Response) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email: IEmailFromTokem = { email: req.body.email };
        if (!emailRegex.test(email.email)) {
            throw new Error("Неправильный формат email-адреса");
        }
        const foundUser = await User.findOne({ where: { email: email.email } });

        if (!foundUser) throw new Error("Пользователь не найден!");
        const token = jwt.sign(email, `${process.env.MAIL_KEY}`, { expiresIn: "24h" });
        const url = `${process.env.REG_LINK}?token=${token}`;
        await sendMail({link: url, recipient: email.email, theme: "Восстановление пароля"});
        res.status(200).send(email);
    } catch (err: unknown) {
        const error = err as Error;
        const result = {
            status: "error",
            message: error.message
        };
        res.status(500).send(result);
    }
});

router.get("/send-set-password-link", (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
        jwt.verify(token, `${process.env.MAIL_KEY}`);
        res.status(200).send("Доступ разрешен");
    } catch (err: unknown) {
        res.status(500).send(err);
    }
});

export default router;