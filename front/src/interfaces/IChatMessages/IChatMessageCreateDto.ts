export default interface IChatMessageCreateDto {
    text: string
    url?: string | File | undefined
    questionId: string
    authorId: string 
}