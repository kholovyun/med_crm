import bcrypt from "bcrypt";
import { User } from "../models/User";

export const checkPassword = async (password: string, instance: User) => {
    return await bcrypt.compare(password, instance.password);
};