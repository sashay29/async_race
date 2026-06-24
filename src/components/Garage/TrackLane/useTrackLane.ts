import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeCar, selectCar } from 'store/slices/garageSlice';
import { LANE_STATUS, LaneStatus, RACE_STATUS } from 'constants/race';
import type { Car } from 'store/types/car';
import { finishRace } from './finishRace';
import { buildAnimationStyle, startEngine, stopEngine } from './laneEngine';
import { useLaneRaceSync } from './useLaneRaceSync';

export function useTrackLane(car: Car) {
   const dispatch = useAppDispatch();
   const { selectedCar, race } = useAppSelector((state) => state.garage);
   const activeWinner = useAppSelector((state) => state.winners.activeWinner);
   const [time, setTime] = useState(0);
   const [status, setStatus] = useState<LaneStatus>(LANE_STATUS.STOPPED);

   const handleStart = useCallback(() => {
      if (selectedCar?.id === car.id) dispatch(selectCar(undefined));
      startEngine(car.id, setStatus, setTime);
   }, [car.id, selectedCar, dispatch]);

   const handleStop = useCallback(() => {
      stopEngine(car.id, setStatus);
   }, [car.id]);

   const handleFinish = useCallback(() => {
      if (race === RACE_STATUS.STARTED) finishRace(dispatch, car, time, Boolean(activeWinner));
      setStatus(LANE_STATUS.FINISHED);
   }, [race, activeWinner, time, car, dispatch]);

   useLaneRaceSync({ race, status, onStart: handleStart, onStop: handleStop });

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
