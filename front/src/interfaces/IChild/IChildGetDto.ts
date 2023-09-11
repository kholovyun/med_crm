import { ESex } from "../../enums/ESex";

export default interface IChildGetDto {
    id: string
    parentId: string
    photo: string
    name: string
    surname: string
    dateOfBirth: Date
    sex: ESex
    height: number
    weight: number
    patronim?: string
    isActive: boolean 
}