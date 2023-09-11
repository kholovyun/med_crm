import { MouseEvent } from "react";
import IChatMessageWithUserGetDto from "../../../interfaces/IChatMessages/IChatMessageWithUserGetDto";

export default interface IChatMessageProps {
    message: IChatMessageWithUserGetDto
    clickDelete: (e: MouseEvent<HTMLDivElement>, message: IChatMessageWithUserGetDto) => void
}