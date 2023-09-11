import { ESex } from "../../enums/ESex";

export default interface IChildCreateDto {
    parentId: string
    photo: string | File | undefined
    name: string
    surname: string
    dateOfBirth: Date
    sex: ESex
    height: number
    weight: number
    patronim?: string
}