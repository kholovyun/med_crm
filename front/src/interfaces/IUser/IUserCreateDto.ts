import { ERoles } from "../../enums/ERoles";

export default interface IUserCreateDto {
    role: ERoles | string,
    email: string,
    phone: string,
    name: string,
    surname: string,
    patronim: string,
    price?: number | null
}