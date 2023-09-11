import IAllergyGetDto from "../../../interfaces/IAllergy/IAllergyGetDto";

export default interface IChildAllergiesProps {
    allergies: IAllergyGetDto[]
    childId: string
}