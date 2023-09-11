import { ERoles } from "../../enums/ERoles";

export default interface IChatMessageWithUserGetDto {
    id: string
    createdAt: Date
    text: string
    url: string
    questionId: string
    authorId: string
    users: {
        role: ERoles
        name: string
        surname: string
        patronim?: string
    }
}