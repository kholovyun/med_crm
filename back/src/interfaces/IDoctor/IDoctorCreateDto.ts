export default interface IDoctorCreateDto {
    userId: string
    photo: string | File | undefined
    speciality: string
    placeOfWork: string
    experience: number
    price: number
    achievements?: string
    degree?: string
}