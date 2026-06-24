import { Middleware } from '@reduxjs/toolkit';
import { RACE_STATUS } from 'constants/race';
import { setRace } from 'store/slices/garageSlice';
import { setActiveWinner } from 'store/slices/winnersSlice';

const raceMiddleware: Middleware = () => (next) => (action) => {
   if (setRace.match(action) && action.payload !== RACE_STATUS.FINISHED) {
      next(setActiveWinner(undefined));
   }
   return next(action);
};

export default raceMiddleware;
