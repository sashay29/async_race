import React from 'react';
import { useAppSelector } from 'store/hooks';
import LaneControls from 'components/Garage/LaneControls/LaneControls';
import StartLights from 'components/Garage/StartLights/StartLights';
import type { Car } from 'store/types/car';
import { LANE_STATUS } from 'constants/race';
import LaneCarDisplay from './LaneCarDisplay';
import LaneCarName from './LaneCarName';
import { useTrackLane } from './useTrackLane';
import styles from './TrackLane.module.css';

interface TrackLaneProps {
   car: Car;
}

function TrackLane({ car }: TrackLaneProps) {
   const selectedCar = useAppSelector((state) => state.garage.selectedCar);
   const lane = useTrackLane(car);
   const isRacing = lane.status === LANE_STATUS.STARTED;

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
         <LaneCarDisplay
            carName={car.name}
            carColor={car.color}
            status={lane.status}
            animationStyle={lane.animationStyle}
            onAnimationEnd={lane.handleFinish}
         />
         <LaneCarName name={car.name} status={lane.status} />
      </div>
   );
}

export default TrackLane;
