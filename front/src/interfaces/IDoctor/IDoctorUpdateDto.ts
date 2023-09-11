export default interface IDoctorUpdateDto {
    photo?: string | File | undefined
    speciality: string
    placeOfWork: string
    experience: number
    achievements?: string
    degree?: string
}