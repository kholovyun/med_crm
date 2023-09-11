import { MouseEvent } from "react";
import IDoctorWithUser from "../../../../../../interfaces/IDoctor/IDoctorWithUser";

export default interface IDoctorRowProps {
    doctor: IDoctorWithUser
    clickBlock: (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser, text: string) => void
    clickActivate: (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser, text: string) => void
    clickOpenPriceModal: (e: MouseEvent<HTMLDivElement>) => void
}