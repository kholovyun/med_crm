export default interface IDoctorWithUser {
    id: string
    userId: string
    photo: string
    speciality: string
    placeOfWork: string
    experience: number
    isActive: boolean
    price: number
    achievements?: string
    degree?: string
    users: {
        id: string
        name: string
        surname: string
        patronim?: string
        email: string
        phone: string
        isBlocked: boolean
    }
}