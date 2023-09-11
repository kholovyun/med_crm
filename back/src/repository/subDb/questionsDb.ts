import { StatusCodes } from "http-status-codes";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import IQuestionCreateDto from "../../interfaces/IQuestion/IQuestionCreateDto";
import { User } from "../../models/User";
import { EErrorMessages } from "../../enums/EErrorMessages";
import IQuestionGetDto from "../../interfaces/IQuestion/IQuestionGetDto";
import { Question } from "../../models/Question";
import { Parent } from "../../models/Parent";
import { Child } from "../../models/Child";
import { Doctor } from "../../models/Doctor";
import { Subscription } from "../../models/Subscription";
import { ERoles } from "../../enums/ERoles";

export class QuestionsDb {
    public getQuestionsByChildId = async (userId: string, childId: string) => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            const foundChild = await Child.findByPk(childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({ where: { userId } });
                const foundParent = await Parent.findOne({ where: { id: foundChild.parentId } });
                if (!foundDoctor || !foundParent || foundDoctor.id !== foundParent.doctorId) throw new Error(EErrorMessages.NO_ACCESS);
            }
            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({ where: { userId } });
                if (!foundParentByUser || foundChild.parentId !== foundParentByUser.id) throw new Error(EErrorMessages.NO_ACCESS);
            }
            const questions: IQuestionGetDto[] = await Question.findAll({
                where: {childId},
                order: [
                    ["createdAt", "DESC"]
                ]
            });
            return {
                status: StatusCodes.OK,
                result: questions
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

    public getQuestionsByDoctorId = async (userId: string, doctorId: string) => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const foundDoctor = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                if (foundDoctor.userId !== foundUser.id) throw new Error(EErrorMessages.NO_ACCESS);
            }
            const questions: IQuestionGetDto[] = await Question.findAll({
                where: {doctorId},
                order: [
                    ["createdAt", "DESC"]
                ]
            });
            return {
                status: StatusCodes.OK,
                result: questions
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

    public createQuestion = async (userId: string, question: IQuestionCreateDto) => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            
            const newDate = new Date();
            const foundSubscription = await Subscription.findOne({ where: { userId: foundUser.id } });
            if (!foundSubscription || foundSubscription.endDate.getTime() < newDate.getTime()) {
                throw new Error(EErrorMessages.NO_ACCESS);
            }
            const foundParent = await Parent.findOne({
                where: {userId}
            });
            const foundChild = await Child.findByPk(question.childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);

            const foundDoctor = await Doctor.findByPk(question.doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);

            if (!foundParent || foundDoctor.id !== foundParent.doctorId || foundChild.parentId !== foundParent.id)
                throw new Error(EErrorMessages.NO_ACCESS);
            
            const newQuestion = await Question.create({ ...question });
            return {
                status: StatusCodes.CREATED,
                result: newQuestion
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
}

export const questionsDb = new QuestionsDb();