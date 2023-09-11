import { FunctionComponent, ReactElement } from "react";
import { getPaginationItems } from "../../../helpers/getPaginationItems";
import IPaginationProps from "./IPaginationProps";
import PageLink from "./PageLink/PageLink";
import styles from "./Pagination.module.css";

const Pagination: FunctionComponent<IPaginationProps> = ({...props}: IPaginationProps): ReactElement => {
    const pageNums = getPaginationItems(props.currentPage, props.lastPage, props.maxLength);

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            <PageLink
                onClick={() => props.setCurrentPage(props.currentPage - 1)}
                disabled={props.currentPage === 1}                
            >
                {"<"}
            </PageLink>
            {pageNums.map((pageNum, idx) => (
                <PageLink
                    key={idx}
                    onClick={() => props.setCurrentPage(pageNum)}
                    active={props.currentPage === pageNum}
                    disabled={isNaN(pageNum)}                    
                >
                    {!isNaN(pageNum) ? pageNum : "..."}
                </PageLink>
            ))}
            <PageLink
                onClick={() => props.setCurrentPage(props.currentPage + 1)}
                disabled={props.currentPage === props.lastPage}
            >
                {">"}
            </PageLink>
        </nav>
    );
};

export default Pagination;