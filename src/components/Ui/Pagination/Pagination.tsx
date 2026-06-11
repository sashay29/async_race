import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'store/hooks';
import Button from 'components/Ui/Button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
   total: number;
   page: number;
   pageSize: number;
   onPageChange: (page: number) => void;
}

function Pagination({ total, page, pageSize, onPageChange }: PaginationProps) {
   const { pathname } = useLocation();
   const race = useAppSelector((state) => state.garage.race);
   const isGaragePage = pathname.includes('/garage');
   const isRaceRunning = isGaragePage && race === 'started';
   const lastPage = Math.ceil(total / pageSize);

   return (
      <nav className={styles.pagination} aria-label="Pagination">
         <Button
            disabled={page === 1 || isRaceRunning}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
         >
            <FontAwesomeIcon icon={faArrowLeft} aria-hidden />
         </Button>
         <span className={styles.pageInfo} aria-current="page">
            {`${page} / ${lastPage}`}
         </span>
         <Button
            disabled={page === lastPage || isRaceRunning}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
         >
            <FontAwesomeIcon icon={faArrowRight} aria-hidden />
         </Button>
      </nav>
   );
}

export default Pagination;
