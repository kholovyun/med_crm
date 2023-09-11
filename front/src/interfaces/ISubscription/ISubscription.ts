import { EPaymentType } from "../../enums/EPaymentType";

export default interface ISubscriptionUpdateDto {
    type: number;
    paymentType: EPaymentType
    payedBy: string;
    userId: string;
    endDate: Date;
}