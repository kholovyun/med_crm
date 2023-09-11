import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";

export default interface IBtnProps {
    title: string
    onclick?: () => void
    disabled?: boolean
    size?: EBtnSize
    types?: EBtnTypes
    btnClass?: string
    style?: {[key: string]: string}
}