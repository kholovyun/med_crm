import { StatusCodes } from "http-status-codes";
import IParentGetDto from "../../interfaces/IParent/IParentGetDto";
import IResponse from "../../interfaces/IResponse";
import { Parent } from "../../models/Parent";
import { User } from "../../models/User";
import IError from "../../interfaces/IError";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { Doctor } from "../../models/Doctor";
import { ERoles } from "../../enums/ERoles";
import IParentWithUserAndDoctorDto from "../../interfaces/IParent/IParentWithUserAndDoctorDto";

export class ParentsDb {
    public getParentsByDoctorId = async (userId: string, offset: string, limit: string, doctorId: string): 
        Promise<IResponse<{rows: IParentGetDto[], count: number} | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked)
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundDoctor = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            const foundParents = await Parent.findAndCountAll({
                where: { doctorId },
                include: {
                    model: User,
                    as: "users",
                    attributes: ["name", "patronim", "surname", "email", "phone", "isBlocked"]
                },
                order: [
                    [{ model: User, as: "users" }, "surname", "ASC"],
                    [{ model: User, as: "users" }, "name", "ASC"]
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });
            return {
                status: StatusCodes.OK,
                result: foundParents
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

    public activateParent = async (userId: string, parentId: string): Promise<IResponse<IParentGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) 
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundParent: IParentGetDto | null = await Parent.findByPk(parentId);
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);
            if (foundUser.role === ERoles.PARENT && foundParent.userId !== foundUser.id)
                throw new Error(EErrorMessages.NO_ACCESS);
            const updatedParent: IParentGetDto = await Parent.update(
                { isActive: foundParent.isActive ? false : true},
                { 
                    where: {id: foundParent.id },
                    returning: true 
                }).then((result) => { 
                return result[1][0];
            });
            return {
                status: StatusCodes.OK,
                result: updatedParent
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

    public getParentByUserId = async (userId: string, parentUserId: string): Promise<IResponse<IParentWithUserAndDoctorDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.role !== ERoles.PARENT && foundUser.isBlocked) 
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundParent: IParentWithUserAndDoctorDto | null = await Parent.findOne({
                where: {userId: parentUserId},
                include: [
                    {
                        model: User,
                        as: "users",
                        attributes: ["name", "patronim", "surname", "email", "phone" ]
                    },
                    {
                        model: Doctor,
                        as: "doctors",
                        attributes: ["userId", "photo", "speciality", "experience", "degree" ],
                        include: [
                            { 
                                model: User,
                                as: "users",
                                attributes: ["name", "patronim", "surname" ]
                            },
                        ],
                    }
                ]            
            });
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);            
            return {
                status: StatusCodes.OK,
                result: foundParent
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

export const parentsDb = new ParentsDb();