import IVaccinationGetDto from "../../../../interfaces/IVaccination/IVaccinationGetDto";
import { MouseEvent } from "react";

export default interface IVaccinationRowProps {
    vaccination: IVaccinationGetDto
    showModaldeleteVaccination: (e: MouseEvent<HTMLButtonElement>, thisVac: IVaccinationGetDto) => void
}