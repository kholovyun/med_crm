import { MouseEvent } from "react";
import IReviewWithUserGetDto from "../../../../../../interfaces/IReview/IReviewWithUserGetDto";

export default interface IReviewCardProps {
    review: IReviewWithUserGetDto
    clickDelete: (e: MouseEvent<HTMLDivElement>, review: IReviewWithUserGetDto) => void
};