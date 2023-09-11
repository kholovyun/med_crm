import { EVisitReasons } from "../../enums/EVisitReasons";

export default interface IVisitGetDto {
    id: string
    childId: string
    reason: EVisitReasons
    date: Date
    clinicData: string
    conclusion: string
    appointment: string
    place: string
}