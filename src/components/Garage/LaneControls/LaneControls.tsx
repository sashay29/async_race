import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { LaneStatus } from 'constants/race';
import Button from 'components/Ui/Button/Button';
import { buildLaneControls } from './laneControlsConfig';
import styles from './LaneControls.module.css';

interface LaneControlsProps {
   status: LaneStatus;
   selectedCarId?: number;
   carId: number;
   carName: string;
   onStart: () => void;
   onStop: () => void;
   onSelect: () => void;
   onDelete: () => void;
}

function LaneControls({ status, selectedCarId, carId, carName, onStart, onStop, onSelect, onDelete }: LaneControlsProps) {
   const controls = buildLaneControls({ status, selectedCarId, carId, carName, onStart, onStop, onSelect, onDelete });

   return (
      <div className={styles.controlBlock} role="group" aria-label={`Controls for ${carName}`}>
         {controls.map((btn) => (
            <Button
               key={btn.key}
               disabled={btn.disabled}
               className={classNames(styles.controlBlockBtn, styles[btn.tone])}
               onClick={btn.onClick}
               aria-label={btn.label}
            >
               <FontAwesomeIcon icon={btn.icon} aria-hidden />
            </Button>
         ))}
      </div>
   );
}

export default LaneControls;
