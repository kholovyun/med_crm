export default interface IReviewWithUserGetDto {
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