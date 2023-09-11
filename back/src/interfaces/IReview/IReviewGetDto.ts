export default interface IReviewGetDto {
    id: string
    userId: string
    text: string
    createdAt: Date
    users: {
        name: string
        surname: string
        patronim?: string
        email: string
        phone: string
    }
}