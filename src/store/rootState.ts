import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import type garageReducer from 'store/slices/garageSlice';
import type winnersReducer from 'store/slices/winnersSlice';

export type RootState = {
   garage: ReturnType<typeof garageReducer>;
   winners: ReturnType<typeof winnersReducer>;
};

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
