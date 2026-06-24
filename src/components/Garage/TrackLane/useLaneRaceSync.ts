import { useEffect } from 'react';
import { LANE_STATUS, LaneStatus, RACE_STATUS, RaceStatus } from 'constants/race';

interface LaneRaceSyncParams {
   race: RaceStatus;
   status: LaneStatus;
   onStart: () => void;
   onStop: () => void;
}

export function useLaneRaceSync({ race, status, onStart, onStop }: LaneRaceSyncParams): void {
   useEffect(() => {
      if (race === RACE_STATUS.STARTED && status === LANE_STATUS.STOPPED) {
         onStart();
      }
      if (race === RACE_STATUS.FINISHED && status === LANE_STATUS.STARTED) {
         onStop();
      }
      if (race === RACE_STATUS.STOPPED && status !== LANE_STATUS.STOPPED && status !== LANE_STATUS.BROKEN_ENGINE) {
         onStop();
      }
   }, [race, status, onStart, onStop]);
}
