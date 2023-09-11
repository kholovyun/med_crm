export default interface IDoctorUpdateDto {
    userId: string
    photo: string | File | undefined
    speciality: string
    placeOfWork: string
    experience: number
    achievements?: string
    degree?: string
}