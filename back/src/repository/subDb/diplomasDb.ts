import {StatusCodes} from "http-status-codes";
import {Diploma} from "../../models/Diploma";
import {ERoles} from "../../enums/ERoles";
import {Doctor} from "../../models/Doctor";
import {User} from "../../models/User";
import IDiplomaGetDto from "../../interfaces/IDiploma/IDiplomaGetDto";
import IDiplomaCreateDto from "../../interfaces/IDiploma/IDiplomaCreateDto";
import {Parent} from "../../models/Parent";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import {errorCodesMathcher} from "../../helpers/errorCodeMatcher";
import {EErrorMessages} from "../../enums/EErrorMessages";
import {deleteFile} from "../../helpers/deleteFile";
import { IMessage } from "../../interfaces/IMessage";

export class DiplomasDb {
    public getDiplomasByDoctor = async (userId: string, doctorId: string): Promise<IResponse<IDiplomaGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundDoctor = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_DIPLOMA_NOT_FOUND);

            if (foundUser.role === ERoles.DOCTOR && foundUser.id !== foundDoctor.userId)
                throw new Error(EErrorMessages.NO_ACCESS);
            if (foundUser.role === ERoles.PARENT) {
                const foundParent = await Parent.findOne({
                    where: {userId: foundUser.id, doctorId: doctorId}
                });
                if (!foundParent) throw new Error(EErrorMessages.NO_ACCESS);
            }
            const diplomas = await Diploma.findAll({
                where: {doctorId: doctorId}
            });
            return {
                status: StatusCodes.OK,
                result: diplomas
            };
        } catch (err: unknown) {
            const error = err as Error;
            const status = errorCodesMathcher[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
            return {
                status,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        }
    };

    public createDiploma = async (userId: string, diploma: IDiplomaCreateDto): Promise<IResponse<IDiplomaGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({
                    where: {userId: foundUser.id}
                });
                if (!foundDoctor || diploma.doctorId !== foundDoctor.id)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }

            if (diploma.url === "") throw new Error(EErrorMessages.IMAGE_REQUIRED);

            const newDiploma: IDiplomaGetDto = await Diploma.create({...diploma});
            return {
                status: StatusCodes.CREATED,
                result: newDiploma
            };
        } catch (err: unknown) {
            if (diploma.url) {
                deleteFile(diploma.url, "doctorsDiplomas");
            }
            const error = err as Error;
            const status = errorCodesMathcher[error.message] || StatusCodes.BAD_REQUEST;
            return {
                status,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        }
    };

    public deleteDiploma = async (userId: string, diplomaId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            const diploma = await Diploma.findByPk(diplomaId);
            if (!diploma) throw new Error(EErrorMessages.DIPLOMA_NOT_FOUND);

            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({
                    where: {userId: foundUser.id}
                });
                if (!foundDoctor || diploma.doctorId !== foundDoctor.id)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }

            await Diploma.destroy({where: {id: diplomaId}});
            if (diploma.url) {
                deleteFile(diploma.url, "doctorsDiplomas");
            }
            return {
                status: StatusCodes.OK,
                result: {message: "Диплом удален!"}
            };
        } catch (err: unknown) {
            const error = err as Error;
            const status = errorCodesMathcher[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
            return {
                status,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        }
    };
}

export const diplomasDb = new DiplomasDb();