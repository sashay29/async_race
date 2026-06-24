import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { generateCars, setRace } from 'store/slices/garageSlice';
import { GENERATE_CARS_COUNT, RACE_STATUS } from 'constants/race';
import { useIsRaceLocked } from 'components/Garage/hooks/useIsRaceLocked';
import Button from 'components/Ui/Button/Button';
import styles from './GarageToolbar.module.css';

function GarageToolbar() {
   const dispatch = useAppDispatch();
   const { total, isLoading, race } = useAppSelector((state) => state.garage);
   const isRaceLocked = useIsRaceLocked();

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
            <Button
               variant="primary"
               disabled={isLoading || isRaceLocked || total === 0}
               onClick={() => dispatch(setRace(RACE_STATUS.STARTED))}
            >
               Race
            </Button>
            <Button disabled={isLoading || race === RACE_STATUS.STOPPED} onClick={() => dispatch(setRace(RACE_STATUS.STOPPED))}>
               Reset
            </Button>
            <Button variant="accent" disabled={isLoading || isRaceLocked} onClick={() => dispatch(generateCars(GENERATE_CARS_COUNT))}>
               Generate {GENERATE_CARS_COUNT}
            </Button>
         </div>
      </section>
   );
}

export default GarageToolbar;
