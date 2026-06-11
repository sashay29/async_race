import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'store/hooks';
import CarIcon from 'assets/CarIcon/CarIcon';
import FinishLine from 'components/Garage/FinishLine/FinishLine';
import LaneControls from 'components/Garage/LaneControls/LaneControls';
import StartLights from 'components/Garage/StartLights/StartLights';
import type { Car } from 'store/types/car';
import { useTrackLane } from './useTrackLane';
import styles from './TrackLane.module.css';

interface TrackLaneProps {
   car: Car;
}

function TrackLane({ car }: TrackLaneProps) {
   const selectedCar = useAppSelector((state) => state.garage.selectedCar);
   const lane = useTrackLane(car);
   const isRacing = lane.status === 'started';
   const showAnimation = isRacing || lane.status === 'brokenEngine';

   return (
      <div className={styles.row} role="row">
         <div className={styles.meta} role="cell">
            <LaneControls
               status={lane.status}
               selectedCarId={selectedCar?.id}
               carId={car.id}
               carName={car.name}
               onStart={lane.handleStart}
               onStop={lane.handleStop}
               onSelect={lane.toggleSelect}
               onDelete={lane.handleDelete}
            />
            <StartLights isRacing={isRacing} />
         </div>
         <div className={styles.lane} role="cell" aria-label={`Track lane for ${car.name}`}>
            <FinishLine />
            <CarIcon
               handleAnimationEnd={lane.handleFinish}
               className={classNames(styles.car, { [styles.racingAnimation]: isRacing }, { [styles.inTheEnd]: lane.status === 'finished' })}
               style={showAnimation ? lane.animationStyle : undefined}
               width={88}
               height={36}
               fill={car.color}
            />
         </div>
         <span className={styles.carName} role="cell">
            {lane.status === 'brokenEngine' && <FontAwesomeIcon icon={faTriangleExclamation} className={styles.brokenIcon} aria-hidden />}
            {lane.status === 'brokenEngine' && <span className="visuallyHidden">Engine failure: </span>}
            {car.name}
         </span>
      </div>
   );
}

export default TrackLane;
