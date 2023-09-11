export default interface IRecommendationCreateDto {
    doctorId: string
    url?: string | File | undefined
    text: string
} 