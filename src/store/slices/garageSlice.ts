import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGenerateCars, fetchGarageListPage, fetchNewCar, fetchDeleteCar, fetchUpdateCar, isApiError, TOTAL_COUNT_HEADER } from 'constants/api';
import { GARAGE_PAGE_SIZE } from 'constants/carData';
import { RACE_STATUS } from 'constants/race';
import type { RootState } from 'store/rootState';
import type { Car, CarInput, RaceStatus } from 'store/types/car';

interface GarageState {
   cars: Car[];
   selectedCar?: Car;
   isLoading: boolean;
   race: RaceStatus;
   isWinnerModalOpen: boolean;
   total: number;
   page: number;
   error: string | null;
}

const initialState: GarageState = {
   cars: [],
   selectedCar: undefined,
   isLoading: true,
   race: RACE_STATUS.STOPPED,
   isWinnerModalOpen: false,
   total: 0,
   page: 1,
   error: null,
};

export const generateCars = createAsyncThunk<
   number,
   number,
   { state: RootState; rejectValue: { isFailed: boolean; errorMessage: string } }
>('garage/generateCars', async (count, { dispatch, getState, rejectWithValue }) => {
   const response = await fetchGenerateCars(count);
   if (isApiError(response)) return rejectWithValue({ isFailed: true, errorMessage: response.errors.message });
   const { page } = getState().garage;
   await dispatch(fetchGaragePage(page));
   return response.total;
});

export const createCar = createAsyncThunk<Car, CarInput, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garage/createCar',
   async (carData, { rejectWithValue }) => {
      const response = await fetchNewCar(carData);
      if (isApiError(response)) return rejectWithValue({ isFailed: true });
      return response;
   }
);

export const updateCar = createAsyncThunk<Car, Car, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garage/updateCar',
   async (carData, { rejectWithValue }) => {
      const response = await fetchUpdateCar(carData);
      if (isApiError(response)) return rejectWithValue({ isFailed: true });
      return response;
   }
);

export const removeCar = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garage/removeCar',
   async (id, { rejectWithValue }) => {
      const response = await fetchDeleteCar(id);
      if (isApiError(response)) return rejectWithValue({ isFailed: true });
      return id;
   }
);

export const fetchGaragePage = createAsyncThunk<
   { data: Car[]; headers: Record<string, string> },
   number,
   { state: RootState; rejectValue: { isFailed: boolean; errorMessage: string } }
>('garage/fetchPage', async (pageNo, { rejectWithValue }) => {
   const response = await fetchGarageListPage(pageNo);
   if (isApiError(response)) {
      return rejectWithValue({ isFailed: true, errorMessage: response.errors.message });
   }
   return response;
});

const garageSlice = createSlice({
   name: 'garage',
   initialState,
   reducers: {
      selectCar(state, { payload }: { payload: Car | undefined }) {
         state.selectedCar = payload;
      },
      setRace(state, { payload }: { payload: RaceStatus }) {
         state.race = payload;
      },
      closeWinnerModal(state) {
         state.isWinnerModalOpen = false;
      },
      openWinnerModal(state) {
         state.isWinnerModalOpen = true;
      },
      setPage(state, { payload }: { payload: number }) {
         state.page = payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createCar.fulfilled, (state, { payload }) => {
            state.total += 1;
            if (state.cars.length < GARAGE_PAGE_SIZE) {
               state.cars.push(payload);
            }
         })
         .addCase(updateCar.fulfilled, (state, { payload }) => {
            state.cars = state.cars.map((car) => (car.id === payload.id ? payload : car));
            if (state.selectedCar?.id === payload.id) {
               state.selectedCar = payload;
            }
         })
         .addCase(removeCar.fulfilled, (state, { payload: id }) => {
            state.cars = state.cars.filter((car) => car.id !== id);
            if (state.selectedCar?.id === id) {
               state.selectedCar = undefined;
            }
            state.total -= 1;
         })
         .addCase(fetchGaragePage.pending, (state) => {
            if (state.cars.length === 0) state.isLoading = true;
         })
         .addCase(fetchGaragePage.fulfilled, (state, { payload, meta }) => {
            state.cars = payload.data;
            state.total = Number(payload.headers[TOTAL_COUNT_HEADER]);
            state.page = meta.arg;
            state.isLoading = false;
            state.error = null;
         })
         .addCase(fetchGaragePage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.errorMessage ?? 'Failed to load garage';
         })
         .addCase(generateCars.rejected, (state, action) => {
            state.error = action.payload?.errorMessage ?? 'Failed to generate cars';
         });
   },
});

export const { selectCar, closeWinnerModal, setRace, openWinnerModal, setPage } = garageSlice.actions;
export default garageSlice.reducer;
