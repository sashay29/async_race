import { useState, useEffect, CSSProperties, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCarEngineMode, fetchCarDrive } from 'constants/api';
import { removeCar, selectCar } from 'store/slices/garageSlice';
import type { Car } from 'store/types/car';
import { finishRace } from './finishRace';
import styles from './TrackLane.module.css';

type LaneStatus = 'stopped' | 'started' | 'finished' | 'brokenEngine';
const START_LIGHT_DELAY_MS = 4200;
const MS_PER_SECOND = 1000;

const buildAnimationStyle = (status: string, time: number): CSSProperties => ({
   animationName: styles.moveToEnd,
   animationDuration: `${time}s`,
   animationTimingFunction: 'linear',
   animationDelay: `${START_LIGHT_DELAY_MS / 1000}s`,
   animationFillMode: 'forwards',
   animationPlayState: status === 'brokenEngine' ? 'paused' : 'running',
});

async function startEngine(id: number, setStatus: (s: LaneStatus) => void, setTime: (v: number) => void) {
   setStatus('started');
   const response = await fetchCarEngineMode(id, 'started');
   if ('isFailed' in response || !('velocity' in response)) return setStatus('stopped');
   setTime(response.distance / response.velocity / MS_PER_SECOND);
   setTimeout(async () => {
      if ('isFailed' in (await fetchCarDrive(id))) setStatus('brokenEngine');
   }, START_LIGHT_DELAY_MS);
}

export function useTrackLane(car: Car) {
   const dispatch = useAppDispatch();
   const { selectedCar, race } = useAppSelector((state) => state.garage);
   const activeWinner = useAppSelector((state) => state.winners.activeWinner);
   const [time, setTime] = useState(0);
   const [status, setStatus] = useState<LaneStatus>('stopped');

   const handleStart = useCallback(() => {
      if (selectedCar?.id === car.id) dispatch(selectCar(undefined));
      startEngine(car.id, setStatus, setTime);
   }, [car.id, selectedCar, dispatch]);

   const handleStop = useCallback(async () => {
      await fetchCarEngineMode(car.id, 'stopped');
      setStatus('stopped');
   }, [car.id]);

   const handleFinish = useCallback(() => {
      if (race === 'started') finishRace(dispatch, car, time, Boolean(activeWinner));
      setStatus('finished');
   }, [race, activeWinner, time, car, dispatch]);

   useEffect(() => {
      if (race === 'started' && status === 'stopped') handleStart();
      if (race === 'finished' && status === 'started') handleStop();
      if (race === 'stopped' && !['stopped', 'brokenEngine'].includes(status)) handleStop();
   }, [race, status, handleStart, handleStop]);

   return {
      status,
      animationStyle: buildAnimationStyle(status, time),
      handleStart,
      handleStop,
      handleFinish,
      toggleSelect: () => dispatch(selectCar(selectedCar?.id === car.id ? undefined : car)),
      handleDelete: () => dispatch(removeCar(car.id)),
   };
}
