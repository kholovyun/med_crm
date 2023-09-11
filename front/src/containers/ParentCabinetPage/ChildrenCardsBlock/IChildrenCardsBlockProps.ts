import IChildGetDto from "../../../interfaces/IChild/IChildGetDto";

export default interface IChildrenCardsBlockProps {
    parentChildren: IChildGetDto[]
    doctorId: string
    parentId: string
}