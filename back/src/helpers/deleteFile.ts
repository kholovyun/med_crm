import fs from "fs";
import path from "path";
import Logger from "../lib/logger";

export const deleteFile = (fileName: string | File, filePath: string) => {
    const imagePath = path.resolve("./") + `/public/uploads/${filePath}/`;
    fs.unlink(imagePath + fileName, (err) => {
        if (err) {
            throw err;
        }
        Logger.info(`Image ${fileName} deleted`);
    });
};