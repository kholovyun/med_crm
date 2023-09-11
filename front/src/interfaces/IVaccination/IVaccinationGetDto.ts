export default interface IVaccinationGetDto {
    id: string
    childId: string
    infection: string
    vaccine?: string
    age?: string
    date?: Date
    dose?: string
    serial?: string
    manufacturer?: string
    reaction?: string
    conterindication?: string
    notes?: string
}