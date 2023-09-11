import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../AllTables.module.css";
import Loader from "../../../../components/UI/Loader/Loader";
import { useGetReviewsQuery } from "../../../../app/services/reviews";
import AllReviewsTable from "./AllReviewsTable/IAllReviewsList";
import errorHandler from "../../../../helpers/errorHandler";

const AllReviews: FunctionComponent = (): ReactElement => {
    const limit = 5;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data: reviews,
        error: getReviewsError,
        isError: isReviewsGetError,
        isLoading
    } = useGetReviewsQuery({ offset, limit });

    useEffect(() => {
        if (reviews && reviews.rows) {
            reviews.count % limit !== 0
                ? setPages(Math.floor(reviews.count / limit) + 1)
                : setPages(reviews.count / limit);
        }
    }, []);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);

    errorHandler(isReviewsGetError, getReviewsError);

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Отзывы</h1>
            </div>
            {isLoading && <Loader />}
            {reviews === undefined || !reviews.rows.length ?
                <p>Нет данных</p>
                :
                <div className={styles.review_list_box}>
                    <AllReviewsTable reviews={reviews.rows} />
                    {pages > 1 ? (
                        <Pagination
                            currentPage={currentPage}
                            lastPage={pages}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                </div>
            }
        </div>
    );
};

export default AllReviews;