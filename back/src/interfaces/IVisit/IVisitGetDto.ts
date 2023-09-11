import { EVisitReasons } from "../../enums/EVisitReasons";

export default interface IVisitGetDto {
    id: string
    childId: string
    date: Date
    reason: EVisitReasons
    clinicData: string
    conclusion: string
    appointment: string
    place: string
}