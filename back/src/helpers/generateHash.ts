import bcrypt from "bcrypt";

export const generateHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(parseInt(`${process.env.BCRYPT_SALT}`) || 10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};