import IChildGetDto from "../../../interfaces/IChild/IChildGetDto";

export default interface IEditFormProps {
    childData: IChildGetDto
    closeModal: () => void
}