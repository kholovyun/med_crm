import { StatusCodes } from "http-status-codes";
import { Child } from "../../models/Child";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import IChildCreateDto from "../../interfaces/IChild/IChildCreateDto";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto";
import { User } from "../../models/User";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { ERoles } from "../../enums/ERoles";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { Parent } from "../../models/Parent";
import { Doctor } from "../../models/Doctor";
import { NewbornData } from "../../models/NewbornData";
import { deleteFile } from "../../helpers/deleteFile";
import { postgresDB } from "../postgresDb";

export class ChildrenDb {
    public getChildrenByParentId = async (parentId: string, userId: string): Promise<IResponse<IChildGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            if (foundUser.role !== ERoles.PARENT && foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            
            const foundParent = await Parent.findByPk(parentId);
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);            

            if (foundUser.role === ERoles.PARENT) {
                if (foundParent.userId !== userId) throw new Error(EErrorMessages.NO_ACCESS);
            }                
                
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                if (!foundDoctor || foundDoctor.id !== foundParent.doctorId) 
                    throw new Error(EErrorMessages.NO_ACCESS);
            }

            const children = await Child.findAll({
                where: { parentId },
                order: [
                    ["dateOfBirth", "DESC"]
                ]
            });
            return {
                status: StatusCodes.OK,
                result: children,
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

    public getChildrenForDoctor = async (doctorId: string, userId: string): Promise<IResponse<IChildGetDto[] | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            if (foundUser.role !== ERoles.DOCTOR && foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            
            const foundDoctor = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);            
            
            const foundChildren = await Child.findAll({
                include: {
                    model: Parent,
                    
                    where: { doctorId },
                    attributes: ["userId"]
                },
                order: [
                    ["surname", "ASC"],
                    ["name", "ASC"]
                ]
            });     
            return {
                status: StatusCodes.OK,
                result: foundChildren,
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

    public getChildrenByDoctorId = async (userId: string, offset: string, limit: string, doctorId: string): 
        Promise<IResponse<{rows: IChildGetDto[], count: number} | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked)
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundDoctor = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            
            const foundChildren = await Child.findAndCountAll({
                include: {
                    model: Parent,
                    as: "parents",
                    where: { doctorId },
                    attributes: ["userId"]
                },
                order: [
                    ["surname", "ASC"],
                    ["name", "ASC"]
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });            
            return {
                status: StatusCodes.OK,
                result: foundChildren,
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

    public getChildById = async (childId: string, userId: string): Promise<IResponse<IChildGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            if (foundUser.isBlocked && foundUser.role !== ERoles.PARENT) throw new Error(EErrorMessages.NO_ACCESS);

            const child = await Child.findByPk(childId);
            if (!child) throw new Error(EErrorMessages.CHILD_NOT_FOUND);

            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({where: {userId}});
                if (!foundParentByUser || foundParentByUser.id !== child.parentId) 
                    throw new Error(EErrorMessages.NO_ACCESS);
            }            
            const foundParent = await Parent.findOne({where: {id: child.parentId}});
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                if (!foundDoctor || foundDoctor.id !== foundParent.doctorId)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }

            return {
                status: StatusCodes.OK,
                result: child,
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
    
    public createChild = async (child: IChildCreateDto, userId: string): Promise<IResponse<IChildCreateDto | IError>> => {
        const transaction = await postgresDB.getSequelize().transaction();
    
        try {
            const foundUser = await User.findByPk(userId, { transaction });
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
    
            if (foundUser.isBlocked && foundUser.role !== ERoles.PARENT) 
                throw new Error(EErrorMessages.NO_ACCESS);
    
            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({ where: { userId }, transaction });
                if (!foundParentByUser || foundParentByUser.id !== child.parentId) {
                    throw new Error(EErrorMessages.NO_ACCESS);
                }
            }
    
            const foundParent = await Parent.findOne({ where: { id: child.parentId }, transaction });
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);
    
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({ where: { userId }, transaction });
                if (!foundDoctor || foundParent.doctorId !== foundDoctor.id) {
                    throw new Error(EErrorMessages.NO_ACCESS);
                }
            }
    
            if (child.photo === "") {
                child.photo = "default-child-photo.svg";
            }
    
            const newChild = await Child.create({ ...child }, { transaction });
    
            const newbornData = {
                childId: newChild.id
            };
            await NewbornData.create({ ...newbornData }, { transaction });
    
            await transaction.commit();
    
            return {
                status: StatusCodes.CREATED,
                result: newChild,
            };
        } catch (err: unknown) {
            await transaction.rollback();
    
            if (child.photo && child.photo !== "default-child-photo.svg") {
                deleteFile(child.photo, "childrenImgs");
            }
    
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

    public editChildById = async (
        childId: string,
        child: IChildGetDto,
        userId: string
    ): Promise<IResponse<IChildGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            if (foundUser.isBlocked && foundUser.role !== ERoles.PARENT)
                throw new Error(EErrorMessages.NO_ACCESS);
                     
            const foundChild = await Child.findByPk(childId);
            if (!foundChild) throw new Error(EErrorMessages.CHILD_NOT_FOUND);
            
            if (foundUser.role === ERoles.PARENT) {
                const foundParentByUser = await Parent.findOne({where: {userId}});
                if (!foundParentByUser || foundChild.parentId !== foundParentByUser.id)
                    throw new Error(EErrorMessages.NO_ACCESS);
            }
            
            const foundParent = await Parent.findOne({where: {id: foundChild.parentId}});  
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({where: {userId}});
                if (!foundDoctor || foundDoctor.id !== foundParent.doctorId) {
                    throw new Error(EErrorMessages.NO_ACCESS);
                }
            }
            
            const updatedChild = await Child.update(
                { ...child },
                { where: { id: foundChild.id }, returning: true }
            ).then((result) => {
                return result[1][0];
            });
            
            return {
                status: StatusCodes.OK,
                result: updatedChild,
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
}

export const childrenDb = new ChildrenDb();
