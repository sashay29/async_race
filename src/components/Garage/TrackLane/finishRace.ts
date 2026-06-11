import type { AppDispatch } from 'store/rootState';
import { setRace, openWinnerModal } from 'store/slices/garageSlice';
import { setActiveWinner, recordWinner } from 'store/slices/winnersSlice';
import type { Car } from 'store/types/car';

export function finishRace(dispatch: AppDispatch, car: Car, time: number, hasActiveWinner: boolean): void {
   if (hasActiveWinner) return;

   const raceTime = Number(time.toFixed(3));
   const winnerData = { ...car, time: raceTime };

   dispatch(setActiveWinner(winnerData));
   dispatch(setRace('finished'));
   dispatch(openWinnerModal());
   dispatch(recordWinner(winnerData));
}
