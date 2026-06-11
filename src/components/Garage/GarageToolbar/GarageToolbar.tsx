import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { generateCars, setRace } from 'store/slices/garageSlice';
import Button from 'components/Ui/Button/Button';
import styles from './GarageToolbar.module.css';

function GarageToolbar() {
   const dispatch = useAppDispatch();
   const { total, isLoading, race } = useAppSelector((state) => state.garage);
   const isRaceLocked = race === 'started' || race === 'finished';

   return (
      <section className={styles.aside} aria-labelledby="garage-heading">
         <div className={styles.header}>
            <h2 id="garage-heading" className={styles.title}>
               Garage
            </h2>
            <span className={styles.count} aria-label={`${total} cars`}>
               {total} cars
            </span>
         </div>
         <div className={styles.actions} role="group" aria-label="Race actions">
            <Button variant="primary" disabled={isLoading || isRaceLocked || total === 0} onClick={() => dispatch(setRace('started'))}>
               Race
            </Button>
            <Button disabled={isLoading || race === 'stopped'} onClick={() => dispatch(setRace('stopped'))}>
               Reset
            </Button>
            <Button variant="accent" disabled={isLoading || isRaceLocked} onClick={() => dispatch(generateCars(100))}>
               Generate 100
            </Button>
         </div>
      </section>
   );
}

export default GarageToolbar;
