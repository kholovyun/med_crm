export default interface IParentWithUserAndDoctorDto {
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
    }
    doctors: {
        userId: string
        photo: string
        speciality: string
        experience: number
        degree?: string
        users: {
            name: string
            surname: string
            patronim?: string
        }
    }
}