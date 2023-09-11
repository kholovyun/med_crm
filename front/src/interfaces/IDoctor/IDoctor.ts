export default interface IDoctor {
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
}