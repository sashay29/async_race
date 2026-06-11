import React from 'react';
import { useAppSelector } from 'store/hooks';
import WinnersTable from 'components/Winners/WinnersTable/WinnersTable';
import { useWinnersPagination } from 'components/Winners/WinnersTable/useWinnersPagination';
import Spinner from 'components/Ui/Spinner/Spinner';
import EmptyState from 'components/Ui/EmptyState/EmptyState';
import styles from './WinnersPage.module.css';

function WinnersPage() {
   const { page, total, setPage } = useWinnersPagination();
   const { items, isLoading } = useAppSelector((state) => state.winners);
   const isInitialLoad = isLoading && items.length === 0;

   return (
      <main className={styles.page} aria-labelledby="winners-heading">
         <header className={styles.header}>
            <h2 id="winners-heading" className={styles.title}>
               Winners
            </h2>
            <p className={styles.subtitle}>Best times and win counts</p>
         </header>
         {isInitialLoad ? (
            <Spinner />
         ) : total !== 0 ? (
            <WinnersTable items={items} page={page} total={total} onPageChange={setPage} />
         ) : (
            <EmptyState message="No winners yet. Start a race on the garage page." />
         )}
      </main>
   );
}

export default WinnersPage;
