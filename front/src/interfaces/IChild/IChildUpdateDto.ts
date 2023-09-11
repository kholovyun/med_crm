import { ESex } from "../../enums/ESex";

export default interface IChildUpdateDto {
    name: string
    surname: string
    dateOfBirth: Date
    sex: ESex
    height: number
    weight: number
    patronim?: string
}