import {errorCodesMathcher} from "../../helpers/errorCodeMatcher";
import {StatusCodes} from "http-status-codes";
import IResponse from "../../interfaces/IResponse";
import IError from "../../interfaces/IError";
import { User } from "../../models/User";
import { EErrorMessages } from "../../enums/EErrorMessages";
import { Parent } from "../../models/Parent";
import { IMessage } from "../../interfaces/IMessage";
import { Subscription } from "../../models/Subscription";
import { Doctor } from "../../models/Doctor";
import ISubscriptionUpdateDto from "../../interfaces/ISubscription/ISubscriptionUpdateDto";
import { ERoles } from "../../enums/ERoles";
import { EPaymentType } from "../../enums/EPaymentType";
import { calcSumAndDate } from "../../helpers/calcSumAndDate";
import { postgresDB } from "../postgresDb";

export class SubscriptionsDb {
    public renewSubscription = async (userId: string, subscriptionDto: ISubscriptionUpdateDto): Promise<IResponse<IMessage | IError>> => {
        const transaction = await postgresDB.getSequelize().transaction();        

        try {
            const foundUser = await User.findByPk(userId);
            if (!foundUser || foundUser.isBlocked) throw new Error(EErrorMessages.NO_ACCESS);

            const foundParent = await Parent.findOne({ where: { userId: subscriptionDto.userId } });
            if (!foundParent) throw new Error(EErrorMessages.PARENT_NOT_FOUND);

            if (foundUser.role === ERoles.PARENT && foundUser.id !== subscriptionDto.userId )
                throw new Error(EErrorMessages.NO_ACCESS);
            
            const foundDoctor = await Doctor.findByPk(foundParent.doctorId);
            if (!foundDoctor) throw new Error(EErrorMessages.DOCTOR_NOT_FOUND);
            
            if (foundUser.role === ERoles.DOCTOR) {
                const foundDoctorByUser = await Doctor.findOne({ where: { userId: subscriptionDto.payedBy } });
                if (!foundDoctorByUser || foundParent.doctorId !== foundDoctorByUser.id) 
                    throw new Error(EErrorMessages.NO_ACCESS);
            }
            if(typeof subscriptionDto.type !== "string") throw new Error(EErrorMessages.WRONG_SUB_TYPE);

            const dataToAdd = calcSumAndDate(subscriptionDto.type,foundParent.subscriptionEndDate,foundDoctor.price);     
            await Subscription.create({
                userId: subscriptionDto.userId,
                payedBy: subscriptionDto.paymentType === EPaymentType.CASH ? foundDoctor.userId : subscriptionDto.userId,
                type: subscriptionDto.type,
                paymentType: subscriptionDto.paymentType,
                endDate: dataToAdd?.newSubDate,
                sum: dataToAdd?.sum
            },
            { transaction }
            );
            await Parent.update({subscriptionEndDate: dataToAdd?.newSubDate}, {where: {id: foundParent.id}, transaction});
            await transaction.commit();
            return {
                status: StatusCodes.OK, result: {message: "Subscription is renewed"}
            };
        } catch (err: unknown) {
            const error = err as Error;
            await transaction.rollback();
            const status = errorCodesMathcher[error.message] || StatusCodes.BAD_REQUEST;
            return {
                status, result: {
                    status: "error", message: error.message
                }
            };
        }
    };
}

export const subscriptionsDb = new SubscriptionsDb();