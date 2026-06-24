import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import CarIcon from 'assets/CarIcon/CarIcon';
import FinishLine from 'components/Garage/FinishLine/FinishLine';
import { CAR_ICON_HEIGHT, CAR_ICON_WIDTH } from 'constants/ui';
import { LANE_STATUS, LaneStatus } from 'constants/race';
import styles from './TrackLane.module.css';

interface LaneCarDisplayProps {
   carName: string;
   carColor: string;
   status: LaneStatus;
   animationStyle?: CSSProperties;
   onAnimationEnd: () => void;
}

function LaneCarDisplay({ carName, carColor, status, animationStyle, onAnimationEnd }: LaneCarDisplayProps) {
   const isRacing = status === LANE_STATUS.STARTED;
   const showAnimation = isRacing || status === LANE_STATUS.BROKEN_ENGINE;

   return (
      <div className={styles.lane} role="cell" aria-label={`Track lane for ${carName}`}>
         <FinishLine />
         <CarIcon
            handleAnimationEnd={onAnimationEnd}
            className={classNames(
               styles.car,
               { [styles.racingAnimation]: isRacing },
               { [styles.inTheEnd]: status === LANE_STATUS.FINISHED }
            )}
            style={showAnimation ? animationStyle : undefined}
            width={CAR_ICON_WIDTH}
            height={CAR_ICON_HEIGHT}
            fill={carColor}
         />
      </div>
   );
}

export default LaneCarDisplay;
