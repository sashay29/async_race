import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { LANE_STATUS, LaneStatus } from 'constants/race';
import styles from './TrackLane.module.css';

interface LaneCarNameProps {
   name: string;
   status: LaneStatus;
}

function LaneCarName({ name, status }: LaneCarNameProps) {
   const hasEngineFailure = status === LANE_STATUS.BROKEN_ENGINE;

   return (
      <span className={styles.carName} role="cell">
         {hasEngineFailure && <FontAwesomeIcon icon={faTriangleExclamation} className={styles.brokenIcon} aria-hidden />}
         {hasEngineFailure && <span className="visuallyHidden">Engine failure: </span>}
         {name}
      </span>
   );
}

export default LaneCarName;
