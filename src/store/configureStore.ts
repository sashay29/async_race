import { configureStore } from '@reduxjs/toolkit';
import garageReducer from 'store/slices/garageSlice';
import winnersReducer from 'store/slices/winnersSlice';
import raceMiddleware from 'store/middleware/raceMiddleware';

function configureAppStore() {
   return configureStore({
      reducer: {
         garage: garageReducer,
         winners: winnersReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(raceMiddleware),
   });
}

export type { RootState, AppDispatch } from 'store/rootState';
export default configureAppStore;
