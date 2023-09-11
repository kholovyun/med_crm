import { EPaymentType } from "../../enums/EPaymentType";

export default interface ISubscriptionUpdateDto {
    type: string;
    paymentType: EPaymentType
    payedBy: string;
    userId: string;
    endDate: Date;
}