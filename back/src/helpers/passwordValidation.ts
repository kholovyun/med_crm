import { EErrorMessages } from "../enums/EErrorMessages";

export const passwordValidation = async (password: string) => {
    if (!password) {
        throw new Error(EErrorMessages.NO_PASSWORD);
    }

    if (password.length < 6 || password.length > 9) {
        throw new Error(EErrorMessages.PASSWORD_LENGTH_FAILED);
    }

    if (!/[A-Z]/.test(password)) {
        throw new Error(EErrorMessages.PASSWORD_CAPITAL_LETTER_FAILED);
    }

    if (!/[a-z]/.test(password)) {
        throw new Error(EErrorMessages.PASSWORD_SMALL_LETTER_FAILED);
    }

    if (!/\d/.test(password)) {
        throw new Error(EErrorMessages.PASSWORD_NUMBER_FAILED);
    }
};