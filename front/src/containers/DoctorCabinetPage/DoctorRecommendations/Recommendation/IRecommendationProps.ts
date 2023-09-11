import IRecommendationGetDto from "../../../../interfaces/IRecommendation/IRecommendationGetDto";

export default interface IRecommendationProps {
    recommendation: IRecommendationGetDto
    deleteRecommendation: () => void
}