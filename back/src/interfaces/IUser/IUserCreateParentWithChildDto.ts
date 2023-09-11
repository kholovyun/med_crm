import { EPaymentType } from "../../enums/EPaymentType";
import { ERoles } from "../../enums/ERoles";
import { ESex } from "../../enums/ESex";

export default interface IUserCreateParentWithChildDto {
    role: ERoles
    email: string
    phone: string
    name: string
    surname: string
    patronim?: string
    doctorId: string
    subscrType: number
    paymentType: EPaymentType
    child: {
        name: string        
        surname: string
        patronim?: string
        dateOfBirth: Date
        sex: ESex
        height: number
        weight: number
    }
}