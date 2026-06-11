import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { SortOrder, WinnerSortField } from 'constants/api';
import { setSort } from 'store/slices/winnersSlice';
import ToggleButton from 'components/Ui/ToggleButton/ToggleButton';
import styles from './SortControls.module.css';

type SortBy = 'Wins' | 'Time';
type SortDirection = 'Ascending' | 'Descending';

const sortFieldMap: Record<SortBy, WinnerSortField> = { Wins: 'wins', Time: 'time' };
const sortOrderMap: Record<SortDirection, SortOrder> = { Ascending: 'ASC', Descending: 'DESC' };

interface SortFieldsetProps {
   sortBy: SortBy;
   direction: SortDirection;
   onSortByChange: (value: SortBy) => void;
   onDirectionChange: (value: SortDirection) => void;
}

function SortFieldset({ sortBy, direction, onSortByChange, onDirectionChange }: SortFieldsetProps) {
   return (
      <fieldset className={styles.fieldset}>
         <legend className={styles.label}>Sort by</legend>
         <ToggleButton isSeparated name="sortBy" valueOne="Wins" valueTwo="Time" selected={sortBy} onChange={(value) => onSortByChange(value as SortBy)} />
         <ToggleButton
            name="sortDirection"
            valueOne="Ascending"
            valueTwo="Descending"
            selected={direction}
            onChange={(value) => onDirectionChange(value as SortDirection)}
         />
      </fieldset>
   );
}

function SortControls() {
   const dispatch = useAppDispatch();
   const { sortField, sortOrder } = useAppSelector((state) => state.winners);
   const [sortBy, setSortBy] = useState<SortBy>(sortField === 'wins' ? 'Wins' : 'Time');
   const [direction, setDirection] = useState<SortDirection>(sortOrder === 'ASC' ? 'Ascending' : 'Descending');

   const applySort = (nextSortBy: SortBy, nextDirection: SortDirection) => {
      dispatch(setSort({ sortField: sortFieldMap[nextSortBy], sortOrder: sortOrderMap[nextDirection] }));
   };

   return (
      <section className={styles.winnerTableHead} aria-label="Sort winners">
         <SortFieldset
            sortBy={sortBy}
            direction={direction}
            onSortByChange={(next) => {
               setSortBy(next);
               applySort(next, direction);
            }}
            onDirectionChange={(next) => {
               setDirection(next);
               applySort(sortBy, next);
            }}
         />
      </section>
   );
}

export default SortControls;
