export default interface IDoctorCardProps {
    doctor: {
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