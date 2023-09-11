import { StatusCodes } from "http-status-codes";
import { ERoles } from "../../enums/ERoles";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Child } from "../../models/Child";
import { Parent } from "../../models/Parent";
import IAllergy from "../../interfaces/IAllergy/IAllergy";
import { Allergy } from "../../models/Allergy";
import IAllergyCreateDto from "../../interfaces/IAllergy/IAllergyCreateDto";
import { IMessage } from "../../interfaces/IMessage";

export class AllergiesDb {
    public getAllergies = async (userId: string, childId: string): Promise<IResponse<IAllergy[] | IError>> => {
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
            const allergies = await Allergy.findAll({
                where: {childId}
            });            
            return {
                status: StatusCodes.OK,
                result: allergies
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

    public createAllergy = async (userId: string, allDto: IAllergyCreateDto): Promise<IResponse<IAllergy | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const foundChild = await Child.findByPk(allDto.childId);
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
            const newAllergy: IAllergy = await Allergy.create({...allDto});
            return {
                status: StatusCodes.CREATED,
                result: newAllergy
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

    public deleteAllergy = async (userId: string, allId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const allergy = await Allergy.findByPk(allId);
            if (!allergy) throw new Error(EErrorMessages.ALLERGY_NOT_FOUND);
            const foundChild = await Child.findOne({where: {id: allergy.childId}});
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
            await Allergy.destroy({where: {id: allId}});
            return {
                status: StatusCodes.OK,
                result: {message: "Запись об аллергии удалена!"}
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

export const allergiesDb = new AllergiesDb();