import { ERoles } from "../../enums/ERoles";

export default interface IUserCreateDto {
    role: ERoles
    email: string
    phone: string
    name: string
    surname: string
    patronim: string
    price?: number
}