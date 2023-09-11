export default interface IDoctorGetDto {
    id: string
    userId: string
    photo: string
    speciality: string
    placeOfWork: string
    experience: number
    isActive: boolean
    achievments?: string
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