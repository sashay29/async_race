import { Middleware } from '@reduxjs/toolkit';
import { setRace } from 'store/slices/garageSlice';
import { setActiveWinner } from 'store/slices/winnersSlice';

const raceMiddleware: Middleware = () => (next) => (action) => {
   if (setRace.match(action) && action.payload !== 'finished') {
      next(setActiveWinner(undefined));
   }
   return next(action);
};

export default raceMiddleware;
