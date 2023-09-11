import ISpecialistExamsGetDto from "../../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";

export default interface IChildSpecExamsProps {
    specExams: ISpecialistExamsGetDto[]
    childId: string
}