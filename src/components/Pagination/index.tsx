// @ts-nocheck
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type paginationProps = {
    onChangePage: (page: number) => void;
}
const Pagination: React.FC<paginationProps> = ({onChangePage}) => {
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
            />    
        </div>
    )
}

export default Pagination;