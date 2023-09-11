export default interface IParentWithUserDto {
    id: string
    userId: string
    doctorId: string
    registerDate: Date
    subscriptionEndDate: Date
    isActive: boolean
    users: {
        name: string
        surname: string
        patronim?: string
        email: string
        phone: string
        isBlocked: boolean
    }
}