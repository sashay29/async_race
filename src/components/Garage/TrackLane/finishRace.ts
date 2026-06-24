import type { AppDispatch } from 'store/rootState';
import { setRace, openWinnerModal } from 'store/slices/garageSlice';
import { setActiveWinner, recordWinner } from 'store/slices/winnersSlice';
import { RACE_STATUS, RACE_TIME_DECIMAL_PLACES } from 'constants/race';
import type { Car } from 'store/types/car';

export function finishRace(dispatch: AppDispatch, car: Car, time: number, hasActiveWinner: boolean): void {
   if (hasActiveWinner) return;

   const raceTime = Number(time.toFixed(RACE_TIME_DECIMAL_PLACES));
   const winnerData = { ...car, time: raceTime };

   dispatch(setActiveWinner(winnerData));
   dispatch(setRace(RACE_STATUS.FINISHED));
   dispatch(openWinnerModal());
   dispatch(recordWinner(winnerData));
}
