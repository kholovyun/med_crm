import { MouseEvent } from "react";
import IAllergyGetDto from "../../../../interfaces/IAllergy/IAllergyGetDto";

export default interface IAllergyRowProps {
    allergy: IAllergyGetDto
    showModalDeleteAllergy: (e: MouseEvent<HTMLButtonElement>, thisAllergy: IAllergyGetDto) => void
}