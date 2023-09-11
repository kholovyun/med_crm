import { StatusCodes } from "http-status-codes";
import { ERoles } from "../../enums/ERoles";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { EErrorMessages } from "../../enums/EErrorMessages";
import IVaccination from "../../interfaces/IVaccination/IVaccination";
import { Child } from "../../models/Child";
import { Parent } from "../../models/Parent";
import { Vaccination } from "../../models/Vaccination";
import IVaccinationCreateDto from "../../interfaces/IVaccination/IVaccinationCreateDto";
import { IMessage } from "../../interfaces/IMessage";

export class VaccinationsDb {
    public getVaccinations = async (userId: string, childId: string): Promise<IResponse<IVaccination[] | IError>> => {
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
            const vaccinations = await Vaccination.findAll({
                where: {childId}
            });            
            return {
                status: StatusCodes.OK,
                result: vaccinations
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

    public createVaccination = async (userId: string, vacDto: IVaccinationCreateDto): Promise<IResponse<IVaccination | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const foundChild = await Child.findByPk(vacDto.childId);
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
            const newVaccination: IVaccination = await Vaccination.create({...vacDto});
            return {
                status: StatusCodes.CREATED,
                result: newVaccination
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

    public deleteVaccination = async (userId: string, vacId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            const vaccination = await Vaccination.findByPk(vacId);
            if (!vaccination) throw new Error(EErrorMessages.VACCINATION_NOT_FOUND);
            const foundChild = await Child.findOne({where: {id: vaccination.childId}});
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
            await Vaccination.destroy({where: {id: vacId}});
            return {
                status: StatusCodes.OK,
                result: {message: "Запись о вакцинации удалена!"}
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

export const vaccinationsDb = new VaccinationsDb();