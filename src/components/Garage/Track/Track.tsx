import React from 'react';
import { GARAGE_PAGE_SIZE } from 'constants/carData';
import type { Car } from 'store/types/car';
import TrackLane from 'components/Garage/TrackLane/TrackLane';
import Pagination from 'components/Ui/Pagination/Pagination';
import styles from './Track.module.css';

interface TrackProps {
   cars: Car[];
   page: number;
   total: number;
   onPageChange: (page: number) => void;
}

function Track({ cars, page, total, onPageChange }: TrackProps) {
   return (
      <section className={styles.garageTable} aria-label="Garage track">
         <div className={styles.trackHeader} role="row">
            <span className={styles.headerMeta} role="columnheader">
               Controls
            </span>
            <span className={styles.headerLane} role="columnheader">
               Track
            </span>
            <span className={styles.headerName} role="columnheader">
               Car
            </span>
         </div>
         <div className={styles.track} role="table" aria-label="Cars on track">
            <div role="rowgroup">
               {cars.map((car) => (
                  <TrackLane key={car.id} car={car} />
               ))}
            </div>
         </div>
         {total > GARAGE_PAGE_SIZE && (
            <Pagination total={total} page={page} pageSize={GARAGE_PAGE_SIZE} onPageChange={onPageChange} />
         )}
      </section>
   );
}

export default Track;
