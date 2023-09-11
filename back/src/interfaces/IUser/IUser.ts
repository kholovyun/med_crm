import { ERoles } from "../../enums/ERoles";

export default interface IUser {
    id: string
    role: ERoles
    email: string
    phone: string
    name: string
    surname: string
    password?: string
    patronim: string
    isBlocked: boolean
}