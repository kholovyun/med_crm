import jwt from "jsonwebtoken";
import { ERoles } from "../enums/ERoles";

export const generateJWT = (payload: { [key: string]: string | number | boolean | ERoles }) => {
    return jwt.sign(payload, `${process.env.SECRET_KEY}`, { expiresIn: "30d" });
};