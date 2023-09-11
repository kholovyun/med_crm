import { StatusCodes } from "http-status-codes";
import { errorCodesMathcher } from "../../helpers/errorCodeMatcher";
import { User } from "../../models/User";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Review } from "../../models/Review";
import { ERoles } from "../../enums/ERoles";
import IReviewCreateDto from "../../interfaces/IReview/IReviewCreateDto";
import IReviewGetDto from "../../interfaces/IReview/IReviewGetDto";
import IError from "../../interfaces/IError";
import IResponse from "../../interfaces/IResponse";
import { IMessage } from "../../interfaces/IMessage";

export class ReviewsDb {
    public getReviews = async (userId: string, offset: string, limit: string):
        Promise<IResponse<{rows: IReviewGetDto[], count:number} | IError>> => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked)
                throw new Error(EErrorMessages.NO_ACCESS);
            const foundReviews = await Review.findAndCountAll({
                include: {
                    model: User,
                    as: "users",
                    attributes: ["name", "patronim", "surname", "email", "phone"]
                },
                order: [
                    [ "createdAt", "DESC"]
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });
            return {
                status: StatusCodes.OK,
                result: foundReviews
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

    public createReview = async (userId: string, review: IReviewCreateDto) => {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser) throw new Error(EErrorMessages.NO_ACCESS);
            
            const newReview: IReviewCreateDto= await Review.create({...review});
            return {
                status: StatusCodes.CREATED,
                result: newReview
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

    public deleteReview = async (userId: string, reviewId: string): Promise<IResponse<IMessage | IError>>=> {
        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            const review = await Review.findByPk(reviewId);
            if (!review) throw new Error(EErrorMessages.NO_REVIEW_FOUND);
            if (foundUser.role === ERoles.SUPERADMIN) {
                await Review.destroy(
                    {
                        where: {id: reviewId}
                    }
                );
                return {
                    status: StatusCodes.OK,
                    result: {message: "Отзыв удален!"}
                };
            } else {
                throw new Error(EErrorMessages.NO_ACCESS);
            }
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

export const reviewsDb = new ReviewsDb();