import { MouseEvent } from "react";
import ISpecialistExamsGetDto from "../../../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";

export default interface ISpecExamsRowProps {
    specExam: ISpecialistExamsGetDto
    showModalDeleteExam: (e: MouseEvent<HTMLButtonElement>, thisExam: ISpecialistExamsGetDto) => void
}