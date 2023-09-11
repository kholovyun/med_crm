import { StatusCodes } from "http-status-codes";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { User } from "../../models/User";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Child } from "../../models/Child";
import { ERoles } from "../../enums/ERoles";
import { Doctor } from "../../models/Doctor";
import { Parent } from "../../models/Parent";
import { SpecialistExam } from "../../models/SpecialistExam";
import ISpecialistExamsCreateDto from "../../interfaces/ISpecialistExams/ISpecialistExamsCreateDto";
import ISpecialistExamsGetDto from "../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";
import { IMessage } from "../../interfaces/IMessage";
import IError from "../../interfaces/IError";
import IResponse from "../../interfaces/IResponse";

export class SpecialistExams {
    public getSpecialistExamsByChildId = async (userId: string, childId: string) => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            const foundChild = await Child.findByPk(childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                const foundParent = await Parent.findOne({where: {id: foundChild.parentId}});
                if (!foundDoctor || !foundParent || foundDoctor.id !== foundParent.doctorId) throw new Error(EErrorMessages.NO_ACCESS);
            }
            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({where: {userId}});
                if (!foundParentByUser || foundChild.parentId !== foundParentByUser.id) throw new Error(EErrorMessages.NO_ACCESS);
            }
            const specialistExams = await SpecialistExam.findAll({
                where: {childId}
            });
            return {
                status: StatusCodes.OK,
                result: specialistExams
            };
        } catch(err: unknown) {
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

    public createSpecialistExam = async (userId: string, exams: ISpecialistExamsCreateDto) => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const foundChild = await Child.findByPk(exams.childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                const foundParent = await Parent.findOne({where: {id: foundChild.parentId}});
                if (!foundDoctor || !foundParent || foundDoctor.id !== foundParent.doctorId) throw new Error(EErrorMessages.NO_ACCESS);
            }
            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({where: {userId}});
                if (!foundParentByUser || foundChild.parentId !== foundParentByUser.id) throw new Error(EErrorMessages.NO_ACCESS);
            }
            const newExams: ISpecialistExamsGetDto = await SpecialistExam.create({...exams});
            return {
                status: StatusCodes.OK,
                result: newExams
            };
        } catch(err: unknown) {
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

    public deleteSpecialistExam = async (userId: string, examinationId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const foundExamination = await SpecialistExam.findByPk(examinationId);
            if (!foundExamination) throw new Error(EErrorMessages.SPECIALIST_EXAM_NOT_FOUND);
            const foundChild = await Child.findOne({where: {id: foundExamination.childId}});
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND); 
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                const foundParent = await Parent.findOne({where: {id: foundChild.parentId}});
                if (!foundDoctor || !foundParent || foundDoctor.id !== foundParent.doctorId) throw new Error(EErrorMessages.NO_ACCESS);
            }
            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({where: {userId}});
                if (!foundParentByUser || foundChild.parentId !== foundParentByUser.id) throw new Error(EErrorMessages.NO_ACCESS);
            }
            await SpecialistExam.destroy({where: {id: examinationId}});
            return {
                status: StatusCodes.OK,
                result: {message: "Запись об осмотре врача удалена!"}
            };
        } catch(err: unknown) {
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

export const specialistExamsDb = new SpecialistExams();