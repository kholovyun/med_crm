import { MouseEvent } from "react";
import IUserGetDto from "../../../../../../interfaces/IUser/IUserGetDto";

export default interface IAdminRowProps {
    admin: IUserGetDto
    clickBlock: (e: MouseEvent<HTMLDivElement>, thisUser: IUserGetDto, text: string) => void
}