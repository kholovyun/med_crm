import { ChangeEvent, RefObject } from "react";

export default interface IInputFileForMessageProps {
    inputName: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    fileReference: RefObject<HTMLInputElement>
    iconClass: string
    tooltipLabel: string
}