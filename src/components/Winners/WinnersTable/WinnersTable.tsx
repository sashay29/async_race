import React from 'react';
import { WINNERS_PAGE_SIZE } from 'constants/carData';
import type { Winner } from 'store/types/winner';
import SortControls from 'components/Winners/SortControls/SortControls';
import WinnersRow from 'components/Winners/WinnersRow/WinnersRow';
import Pagination from 'components/Ui/Pagination/Pagination';
import styles from './WinnersTable.module.css';

interface WinnersTableProps {
   items: Winner[];
   page: number;
   total: number;
   onPageChange: (page: number) => void;
}

function WinnersTable({ items, page, total, onPageChange }: WinnersTableProps) {
   return (
      <>
         <SortControls />
         <div className={styles.tableWrap}>
            <table className={styles.table}>
               <caption className="visuallyHidden">Race winners sorted by best time and win count</caption>
               <thead>
                  <tr>
                     <th scope="col">No</th>
                     <th scope="col">Car</th>
                     <th scope="col">Name</th>
                     <th scope="col">Wins</th>
                     <th scope="col">Best time</th>
                  </tr>
               </thead>
               <tbody>
                  {items.map((winner, index) => (
                     <WinnersRow key={winner.id} winner={winner} rowNumber={(page - 1) * WINNERS_PAGE_SIZE + index + 1} />
                  ))}
               </tbody>
            </table>
         </div>
         {total > WINNERS_PAGE_SIZE && (
            <Pagination total={total} page={page} pageSize={WINNERS_PAGE_SIZE} onPageChange={onPageChange} />
         )}
      </>
   );
}

export default WinnersTable;
