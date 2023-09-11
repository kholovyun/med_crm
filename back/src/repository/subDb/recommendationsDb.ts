import { StatusCodes } from "http-status-codes";
import { ERoles } from "../../enums/ERoles";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Recommendation } from "../../models/Recommendation";
import IRecommendationCreateDto from "../../interfaces/IRecommendation/IRecommendationCreateDto";
import IRecommendationGetDto from "../../interfaces/IRecommendation/IRecommendationGetDto";
import {deleteFile} from "../../helpers/deleteFile";
import { IMessage } from "../../interfaces/IMessage";

export class RecommendationsDb {
    public getRecommendationsByDoctor = async (doctorId: string): Promise<IResponse<IRecommendationGetDto[] | IError>> => {
        try {
            const foundDoctor = await Doctor.findByPk(doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            const recommendations = await Recommendation.findAll({
                where: {doctorId: doctorId},
                order: [
                    ["createdAt", "DESC"]
                ]
            });
            return {
                status: StatusCodes.OK,
                result: recommendations
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

    public createRecommendation = async (userId: string, recommendation: IRecommendationCreateDto): Promise<IResponse<IRecommendationCreateDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({
                    where: {userId: foundUser.id}
                });
                if (!foundDoctor || recommendation.doctorId !== foundDoctor.id ) 
                    throw new Error(EErrorMessages.NO_ACCESS);
            }

            const newRecommendation: IRecommendationCreateDto = await Recommendation.create({...recommendation});
            return {
                status: StatusCodes.CREATED,
                result: newRecommendation
            };
        } catch (err: unknown) {
            if (recommendation.url) {
                deleteFile(recommendation.url, "docRecommends");
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

    public editRecommendation = async (userId: string, recommendationId : string, upgradedRecommendation: IRecommendationCreateDto): Promise<IResponse<IRecommendationCreateDto | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({
                    where: {userId: foundUser.id}
                });
                if (!foundDoctor || upgradedRecommendation.doctorId !== foundDoctor.id ) 
                    throw new Error(EErrorMessages.NO_ACCESS);
            }
            
            const editedRecommendation: IRecommendationCreateDto = await Recommendation.update({...upgradedRecommendation},
                {
                    where: { id: recommendationId },
                    returning: true
                }).then((result) => { 
                return result[1][0];
            });
            return {
                status: StatusCodes.OK,
                result: editedRecommendation
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

    public deleteRecommendation = async (userId: string, recommendationId: string): Promise<IResponse<IMessage | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);
            
            const recommendation = await Recommendation.findByPk(recommendationId);
            if (!recommendation) throw new Error(EErrorMessages.NO_RECOMMENDATION_FOUND);
            if(foundUser.role === ERoles.ADMIN || ERoles.SUPERADMIN) {
                await Recommendation.destroy(
                    {
                        where: {id: recommendationId}
                    });
                return {
                    status: StatusCodes.OK,
                    result: {message: "Публикация удалена!"}
                };
            } else if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctor = await Doctor.findOne({
                    where: {userId: foundUser.id}
                });
                if (!foundDoctor || recommendation.doctorId !== foundDoctor.id ) 
                    throw new Error(EErrorMessages.NO_ACCESS);
                
                await Recommendation.destroy(
                    {
                        where: {id: recommendationId}
                    });
                if (recommendation.url) {
                    deleteFile(recommendation.url, "docRecommends");
                }
                return {
                    status: StatusCodes.OK,
                    result: {message: "Публикация удалена!"}
                };
            } else {
                throw new Error(EErrorMessages.NO_ACCESS);
            }
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

export const recommendationDb = new RecommendationsDb();