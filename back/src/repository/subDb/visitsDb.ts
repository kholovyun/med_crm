import { StatusCodes } from "http-status-codes";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { EErrorMessages } from "../../enums/EErrorMessages";
import IVisitCreateDto from "../../interfaces/IVisit/IVisitCreateDto";
import { Visit } from "../../models/Visit";
import IVisitGetDto from "../../interfaces/IVisit/IVisitGetDto";
import { Child } from "../../models/Child";
import { Parent } from "../../models/Parent";
import { ERoles } from "../../enums/ERoles";
import { IMessage } from "../../interfaces/IMessage";

export class VisitsDb {
    public getVisitsByChildId = async (userId: string, childId: string): Promise<IResponse<IVisitGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);

            const foundChild = await Child.findByPk(childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);

            const foundParent  = await Parent.findByPk(foundChild.parentId);

            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({ where: { userId: foundUser.id } });
                if (!foundDoctor) throw new Error(EErrorMessages.NO_ACCESS);
                if (!foundParent || foundDoctor.id !== foundParent.doctorId || foundUser.isBlocked) {
                    throw new Error(EErrorMessages.NO_ACCESS);
                }
            }

            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUserId = await Parent.findOne({ where: { userId: foundUser.id } });
                if (!foundParentByUserId || foundParentByUserId.id !== foundChild.parentId) {
                    throw new Error(EErrorMessages.NO_ACCESS);
                }
            }

            const visits: Visit[] = await Visit.findAll({
                where: { childId: childId },
                order: [["date", "ASC"]]
            });

            return {
                status: StatusCodes.OK,
                result: visits
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

    public createVisit = async (userId: string, visit: IVisitCreateDto): Promise<IResponse<IVisitGetDto | IError>> => {
        try {
            const foundUser  = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            const foundDoctor  = await Doctor.findOne({where: {userId: foundUser.id}});
            if (!foundDoctor) throw new Error(EErrorMessages.NO_ACCESS);

            const foundChild  = await Child.findByPk(visit.childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);

            const foundParent = await Parent.findByPk(foundChild.parentId);
            if (!foundParent) throw new Error(EErrorMessages.NO_ACCESS);

            if (foundParent.doctorId !== foundDoctor.id) throw new Error(EErrorMessages.NO_ACCESS);

            const newVisit: IVisitGetDto = await Visit.create({...visit});
            return {
                status: StatusCodes.OK,
                result: newVisit
            };
        } catch (err: unknown) {
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

    public deleteVisit = async (userId: string, visitId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            const foundDoctor = await Doctor.findOne({where: {userId: foundUser.id}});
            if (!foundDoctor) throw new Error(EErrorMessages.NO_ACCESS);

            const visit = await Visit.findByPk(visitId, {include: {
                model: Child,
                as: "children",
                attributes: ["parentId"]
            }});
            if (!visit) throw new Error(EErrorMessages.VISIT_NOT_FOUND);

            const foundParent = await Parent.findByPk(visit.children.parentId);
            if (!foundParent || foundParent.doctorId !== foundDoctor.id) throw new Error(EErrorMessages.NO_ACCESS);

            await Visit.destroy({where: {id: visitId}});

            return {
                status: StatusCodes.OK,
                result: {message: "Посещение удалено!"}
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

export const visitDb = new VisitsDb();