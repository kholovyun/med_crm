import IVaccinationGetDto from "../../../interfaces/IVaccination/IVaccinationGetDto";

export default interface IChildVaccinationsProps {
    vaccinations: IVaccinationGetDto[]
    childId: string
}