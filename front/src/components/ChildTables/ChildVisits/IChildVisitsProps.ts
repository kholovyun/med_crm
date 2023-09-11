import IVisitGetDto from "../../../interfaces/IVisit/IVisitGetDto";

export default interface IChildVisitsProps {
    visits: IVisitGetDto[]
    childId: string
}