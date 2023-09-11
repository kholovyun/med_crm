import { MouseEvent } from "react";
import IVisitGetDto from "../../../../interfaces/IVisit/IVisitGetDto";

export default interface IVisitRowProps {
    visit: IVisitGetDto
    showModaldeleteVisit: (e: MouseEvent<HTMLButtonElement>, thisVisit: IVisitGetDto) => void
}