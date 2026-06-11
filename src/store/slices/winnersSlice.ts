import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
   fetchWinnersListPage,
   fetchNewWinner,
   fetchUpdateWinner,
   fetchDeleteWinner,
   fetchCarData,
   isApiError,
   SortOrder,
   WinnerSortField,
} from 'constants/api';
import type { RootState } from 'store/rootState';
import type { Car } from 'store/types/car';
import type { Winner } from 'store/types/winner';

interface ApiWinner {
   id: number;
   wins: number;
   time: number;
}

interface WinnersState {
   items: Winner[];
   activeWinner?: Partial<Winner>;
   isLoading: boolean;
   total: number;
   page: number;
   sortField: WinnerSortField;
   sortOrder: SortOrder;
}

const initialState: WinnersState = {
   items: [],
   activeWinner: undefined,
   isLoading: false,
   total: 0,
   page: 1,
   sortField: 'time',
   sortOrder: 'ASC',
};

const mapWinnerWithCar = (winner: ApiWinner, car?: Car): Winner => ({
   ...winner,
   name: car?.name ?? '',
   color: car?.color ?? '#ccc',
});

const mapWinnersWithCars = async (winners: ApiWinner[], cars: Car[]): Promise<Winner[]> =>
   Promise.all(
      winners.map(async (winner) => {
         const cachedCar = cars.find((item) => item.id === winner.id);
         if (cachedCar) return mapWinnerWithCar(winner, cachedCar);

         const [car] = await fetchCarData(winner.id);
         return mapWinnerWithCar(winner, car);
      })
   );

export const recordWinner = createAsyncThunk<Winner, Partial<Winner>, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winners/record',
   async (carData, { rejectWithValue }) => {
      if (carData.id === undefined || carData.time === undefined) {
         return rejectWithValue({ isFailed: true });
      }
      const response = await fetchNewWinner({ id: carData.id, time: carData.time });
      if (isApiError(response)) return rejectWithValue({ isFailed: true });

      return {
         ...response,
         name: carData.name || 'car',
         color: carData.color || '#ccc',
      };
   }
);

export const updateWinner = createAsyncThunk<Winner, Winner, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winners/update',
   async (winnerData, { rejectWithValue }) => {
      const response = await fetchUpdateWinner(winnerData);
      if (isApiError(response)) return rejectWithValue({ isFailed: true });

      return {
         ...response,
         name: winnerData.name,
         color: winnerData.color,
      };
   }
);

export const deleteWinner = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winners/delete',
   async (id, { rejectWithValue }) => {
      const response = await fetchDeleteWinner(id);
      if (isApiError(response)) return rejectWithValue({ isFailed: true });
      return id;
   }
);

export const fetchWinnersPage = createAsyncThunk<
   { data: Winner[]; headers: Record<string, string> },
   number,
   { state: RootState; rejectValue: { isFailed: boolean; errorMessage: string } }
>('winners/fetchPage', async (pageNo, { rejectWithValue, getState }) => {
   const { sortField, sortOrder } = getState().winners;
   const response = await fetchWinnersListPage({ pageNo, sortField, sortOrder });

   if (isApiError(response)) {
      return rejectWithValue({
         isFailed: true,
         errorMessage: response.errors.message || 'Failed to fetch winners',
      });
   }

   const { cars } = getState().garage;
   const data = await mapWinnersWithCars(response.data, cars);

   return {
      data,
      headers: response.headers,
   };
});

const winnersSlice = createSlice({
   name: 'winners',
   initialState,
   reducers: {
      setActiveWinner(state, { payload }: { payload: Partial<Winner> | undefined }) {
         state.activeWinner = payload;
      },
      setSort(state, { payload }: { payload: { sortField: WinnerSortField; sortOrder: SortOrder } }) {
         state.sortField = payload.sortField;
         state.sortOrder = payload.sortOrder;
      },
      setPage(state, { payload }: { payload: number }) {
         state.page = payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(recordWinner.pending, (state, { meta }) => {
            state.activeWinner = meta.arg;
         })
         .addCase(recordWinner.fulfilled, (state, { payload }) => {
            const index = state.items.findIndex((item) => item.id === payload.id);
            if (index === -1) {
               state.items.push(payload);
               state.total += 1;
            } else {
               state.items[index] = payload;
            }
            state.activeWinner = payload;
         })
         .addCase(updateWinner.fulfilled, (state, { payload }) => {
            state.items = state.items.map((item) => (item.id === payload.id ? payload : item));
            state.activeWinner = payload;
         })
         .addCase(deleteWinner.fulfilled, (state, { payload: id }) => {
            state.items = state.items.filter((item) => item.id !== id);
            state.total -= 1;
         })
         .addCase(fetchWinnersPage.pending, (state) => {
            if (state.items.length === 0) state.isLoading = true;
         })
         .addCase(fetchWinnersPage.fulfilled, (state, { payload, meta }) => {
            state.items = payload.data;
            state.total = Number(payload.headers['x-total-count']);
            state.page = meta.arg;
            state.isLoading = false;
         })
         .addCase(fetchWinnersPage.rejected, (state) => {
            state.isLoading = false;
         });
   },
});

export const { setActiveWinner, setSort, setPage } = winnersSlice.actions;
export default winnersSlice.reducer;
