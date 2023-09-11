import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import { useDeleteReviewMutation } from "../../../../../app/services/reviews";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import IReviewWithUserGetDto from "../../../../../interfaces/IReview/IReviewWithUserGetDto";
import Modal from "../../../../../components/UI/Modal/Modal";
import styles from "../../AllTables.module.css";
import Btn from "../../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../../enums/EBtnClass";
import AccessControl from "../../../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../../../enums/ERoles";
import IAllReviewsListProps from "./IAllReviewsListProps";
import ReviewCard from "./ReviewCard/ReviewCard";

const IAllReviewsList: FunctionComponent<IAllReviewsListProps> = (props: IAllReviewsListProps): ReactElement => {
    const [deleteIt, { error: deleteReviewError, isError: isDeleteReviewError }] = useDeleteReviewMutation();
    const [stateReview, setReview] = useState<IReviewWithUserGetDto | null>(null);
    const [showModal, setShowModal] = useState(false);


    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    const clickDelete = (e: MouseEvent<HTMLDivElement>, review: IReviewWithUserGetDto) => {
        e.stopPropagation();
        setShowModal(true);
        setReview(review);
    };

    const deleteReview = async () => {
        stateReview && await deleteIt(stateReview);
        setShowModal(false);
        setReview(null);
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        setReview(null);
    };

    isDeleteReviewError && errorHandler(deleteReviewError);

    return (
        <>
            <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                <Modal
                    show={showModal}
                    close={modalCancelHandler}>
                    <div className={styles.modal_flex_column}>
                        <div className={styles.title_box}>
                            <p className={styles.modal_title}>
                                Вы уверены, что хотите <span className={styles.violet}>удалить</span> отзыв от
                                <span className={styles.violet}>{stateReview && ` ${stateReview.users.surname} ${stateReview.users.name}`}</span>?
                            </p>
                        </div>
                        <div className={styles.modal_btn_group}>
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Отмена"}
                                btnClass={EBtnClass.white_active}
                                onclick={modalCancelHandler}
                            />
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => deleteReview()}
                            />
                        </div>
                    </div>
                </Modal>
            </AccessControl>
            {props.reviews.map(({ ...review }) => {
                return (
                    <ReviewCard key={review.id}
                        review={review}
                        clickDelete={(e: MouseEvent<HTMLDivElement>) => clickDelete(e, review)}
                    />
                );
            })}
        </>
    );
};

export default IAllReviewsList;