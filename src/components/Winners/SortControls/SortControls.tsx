import React from 'react';
import ToggleButton from 'components/Ui/ToggleButton/ToggleButton';
import { useSortControls, SortBy, SortDirection } from './useSortControls';
import styles from './SortControls.module.css';

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
   const { sortBy, direction, handleSortByChange, handleDirectionChange } = useSortControls();

   return (
      <section className={styles.winnerTableHead} aria-label="Sort winners">
         <SortFieldset
            sortBy={sortBy}
            direction={direction}
            onSortByChange={handleSortByChange}
            onDirectionChange={handleDirectionChange}
         />
      </section>
   );
}

export default SortControls;
