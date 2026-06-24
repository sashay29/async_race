import { CSSProperties } from 'react';
import { fetchCarDrive, fetchCarEngineMode } from 'constants/api';
import { LANE_STATUS, LaneStatus, MS_PER_SECOND, START_LIGHT_DELAY_MS } from 'constants/race';
import styles from './TrackLane.module.css';

export const buildAnimationStyle = (status: LaneStatus, time: number): CSSProperties => ({
   animationName: styles.moveToEnd,
   animationDuration: `${time}s`,
   animationTimingFunction: 'linear',
   animationDelay: `${START_LIGHT_DELAY_MS / MS_PER_SECOND}s`,
   animationFillMode: 'forwards',
   animationPlayState: status === LANE_STATUS.BROKEN_ENGINE ? 'paused' : 'running',
});

export async function startEngine(
   id: number,
   setStatus: (status: LaneStatus) => void,
   setTime: (seconds: number) => void
): Promise<void> {
   setStatus(LANE_STATUS.STARTED);
   const response = await fetchCarEngineMode(id, LANE_STATUS.STARTED);
   if ('isFailed' in response || !('velocity' in response)) {
      setStatus(LANE_STATUS.STOPPED);
      return;
   }
   setTime(response.distance / response.velocity / MS_PER_SECOND);
   setTimeout(async () => {
      if ('isFailed' in (await fetchCarDrive(id))) {
         setStatus(LANE_STATUS.BROKEN_ENGINE);
      }
   }, START_LIGHT_DELAY_MS);
}

export async function stopEngine(id: number, setStatus: (status: LaneStatus) => void): Promise<void> {
   await fetchCarEngineMode(id, LANE_STATUS.STOPPED);
   setStatus(LANE_STATUS.STOPPED);
}
