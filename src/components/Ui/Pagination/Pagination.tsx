import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Ui/Button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
   total: number;
   page: number;
   pageSize: number;
   onPageChange: (page: number) => void;
   isBlocked?: boolean;
}

function Pagination({ total, page, pageSize, onPageChange, isBlocked = false }: PaginationProps) {
   const lastPage = Math.ceil(total / pageSize);

   return (
      <nav className={styles.pagination} aria-label="Pagination">
         <Button disabled={page === 1 || isBlocked} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
            <FontAwesomeIcon icon={faArrowLeft} aria-hidden />
         </Button>
         <span className={styles.pageInfo} aria-current="page">
            {`${page} / ${lastPage}`}
         </span>
         <Button disabled={page === lastPage || isBlocked} onClick={() => onPageChange(page + 1)} aria-label="Next page">
            <FontAwesomeIcon icon={faArrowRight} aria-hidden />
         </Button>
      </nav>
   );
}

export default Pagination;
