export default interface IChatMessage {
    id: string
    text: string
    url?: string | File | undefined
    questionId: string
    authorId: string 
}