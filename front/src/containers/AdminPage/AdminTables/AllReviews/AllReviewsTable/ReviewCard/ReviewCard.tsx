import { FunctionComponent, ReactElement, MouseEvent } from "react";
import IReviewCardProps from "./IReviewCardProps";
import styles from "./ReviewCard.module.css";
import AccessControl from "../../../../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../../../../enums/ERoles";
import { useNavigate } from "react-router-dom";

const ReviewCard: FunctionComponent<IReviewCardProps> = (props: IReviewCardProps): ReactElement => {
    const navigate = useNavigate();

    const navigateCabinetHandler = (e: MouseEvent<HTMLParagraphElement>, id: string) => {
        e.stopPropagation();
        navigate(`/parent-cabinet/${id}`);
    };

    return (
        <div className={styles.review_card}>
            <div className={styles.review_top}>
                <p className={styles.author_row} onClick={(e: MouseEvent<HTMLParagraphElement>) => navigateCabinetHandler(e, props.review.userId)}>
                    {new Date(props.review.createdAt).toLocaleDateString()}{" "}
                    <span className={styles.author}>{props.review.users.surname} {props.review.users.name}{" "}
                        {props.review.users.patronim ? props.review.users.patronim : ""}</span>
                    {" "}{"("}{props.review.users.email}{")"}:
                </p>
                <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                    <div className={styles.deleteBtn} onClick={(e: MouseEvent<HTMLDivElement>) => props.clickDelete(e, props.review)}></div>
                </AccessControl>
            </div>
            <div className={styles.review_bottom}>
                <p className={styles.body_text}>{props.review.text}</p>
            </div>
        </div>
    );
};

export default ReviewCard;