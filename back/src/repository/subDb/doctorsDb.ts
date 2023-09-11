import { StatusCodes } from "http-status-codes";
import IDoctorGetDto from "../../interfaces/IDoctor/IDoctorGetDto";
import IResponse from "../../interfaces/IResponse";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import { ERoles } from "../../enums/ERoles";
import IDoctorUpdateDto from "../../interfaces/IDoctor/IDoctorUpdateDto";
import IError from "../../interfaces/IError";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Parent } from "../../models/Parent";
import { EDoctorLevel } from "../../enums/EDoctorLevel";

export class DoctorsDb {
    public getDoctors = async (userId: string, offset?: string, limit?: string): 
        Promise<IResponse<{rows: IDoctorGetDto[], count:number} | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked)
                throw new Error(EErrorMessages.NO_ACCESS);
            let foundDoctors: {rows: IDoctorGetDto[], count:number} = {rows: [], count: 0};
            if (offset && limit) {
                foundDoctors = await Doctor.findAndCountAll({
                    where: foundUser.role === ERoles.DOCTOR ? {userId: foundUser.id} : {},
                    include: {
                        model: User,
                        as: "users",
                        attributes: ["id", "name", "patronim", "surname", "email", "phone", "isBlocked"]
                    },
                    order: [
                        [{ model: User, as: "users" }, "surname", "ASC"],
                        [{ model: User, as: "users"}, "name", "ASC"]
                    ],
                    limit: parseInt(limit),
                    offset: parseInt(offset)
                });
            } else {
                foundDoctors = await Doctor.findAndCountAll({
                    where: foundUser.role === ERoles.DOCTOR ? {userId: foundUser.id} : {},
                    include: {
                        model: User,
                        as: "users",
                        attributes: ["id", "name", "patronim", "surname", "email", "phone", "isBlocked"]
                    },
                    order: [
                        [{ model: User, as: "users" }, "surname", "ASC"],
                        [{ model: User, as: "users"}, "name", "ASC"]
                    ]
                });
            }            
            return {
                status: StatusCodes.OK,
                result: foundDoctors
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

    public getDoctorByUserId = async (userId: string, doctorUserId: string): Promise<IResponse<IDoctorGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NOT_AUTHORIZED);

            const doctor: IDoctorGetDto | null = await Doctor.findOne(
                {   
                    where: {userId: doctorUserId},
                    include: {
                        model: User,
                        as: "users",
                        attributes: foundUser.role === ERoles.PARENT 
                            ? ["id", "name", "patronim", "surname"] 
                            : ["id", "name", "patronim", "surname", "email", "phone"]
                    }
                });
            if (!doctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);

            if (foundUser.role === ERoles.PARENT) {
                const parent = await Parent.findOne({where: {doctorId: doctor.id}});
                if (!parent) new Error(EErrorMessages.NO_ACCESS);
            }

            if (foundUser.role === ERoles.DOCTOR && foundUser.id !== doctor.userId) throw new Error(EErrorMessages.NO_ACCESS);
            
            return {
                status: StatusCodes.OK,
                result: doctor
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

    public getDoctorById = async (userId: string, doctorId: string): Promise<IResponse<IDoctorGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NOT_AUTHORIZED);

            const doctor: IDoctorGetDto | null = await Doctor.findOne(
                {   
                    where: {id: doctorId},
                    include: {
                        model: User,
                        as: "users",
                        attributes: ["name", "patronim", "surname"]
                    }
                });
            if (!doctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            
            return {
                status: StatusCodes.OK,
                result: doctor
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

    public editDoctor = async (userId: string, searchId: string, doctor: IDoctorUpdateDto): Promise<IResponse<IDoctorGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked)
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundDoctor: IDoctorGetDto | null = await Doctor.findByPk(searchId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            if (foundUser.role === ERoles.DOCTOR && String(foundUser.id) !== String(foundDoctor.userId)) {
                throw new Error(EErrorMessages.NO_ACCESS);
            }
            if (doctor.photo === "") {
                doctor.photo = "default-photo.svg";
            }
            const updatedDoctor = await Doctor.update(
                { ...doctor },
                {
                    where: { id: foundDoctor.id },
                    returning: true
                }).then((result) => { 
                return result[1][0];
            });
            return {
                status: StatusCodes.OK,
                result: updatedDoctor
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

    public activateDoctor = async (userId: string, doctorId: string): Promise<IResponse<IDoctorGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) 
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundDoctor: IDoctorGetDto | null = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            const updatedDoctor = await Doctor.update(
                { isActive: foundDoctor.isActive ? false : true},
                { 
                    where: {id: foundDoctor.id },
                    returning: true 
                }).then((result) => { return result[1][0]; });
            return {
                status: StatusCodes.OK,
                result: updatedDoctor
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

    public changeDoctorPrice = async (userId: string, doctorId: string, obj: { price: string }): Promise<IResponse<IDoctorGetDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) 
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundDoctor: IDoctorGetDto | null = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            const newPrice = parseInt(obj.price);
            if (!Number.isInteger(newPrice) || !Object.values(EDoctorLevel).includes(newPrice)) 
                throw new Error(EErrorMessages.WRONG_PRICE);
            const updatedDoctor = await Doctor.update(
                { price: newPrice},
                { 
                    where: {id: foundDoctor.id },
                    returning: true 
                }).then((result) => { return result[1][0]; });
            return {
                status: StatusCodes.OK,
                result: updatedDoctor
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

export const doctorsDb = new DoctorsDb();