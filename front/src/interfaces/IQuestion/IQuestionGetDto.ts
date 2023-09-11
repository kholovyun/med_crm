export default interface IQuestionGetDto {
    id: string
    doctorId: string
    childId: string
    parentId: string
    createdAt: Date
    question: string
}