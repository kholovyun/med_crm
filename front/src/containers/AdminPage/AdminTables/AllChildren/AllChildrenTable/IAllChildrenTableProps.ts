import IChildWithParentIdDto from "../../../../../interfaces/IChild/IChildWithParentIdDto";

export default interface IAllChildrenTableProps {
    allChildren: IChildWithParentIdDto[],
    doctorId: string
}