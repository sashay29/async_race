import { GARAGE_PAGE_SIZE, WINNERS_PAGE_SIZE, getRandomCarName, getRandomColor, normalizeCarName, validateCarName } from 'constants/carData';
import { API_BASE_URL } from 'constants/apiConfig';
import type { Car, CarInput } from 'store/types/car';

export const ENGINE_MODE = {
   STARTED: 'started',
   STOPPED: 'stopped',
   DRIVE: 'drive',
} as const;

export type EngineMode = (typeof ENGINE_MODE)[keyof typeof ENGINE_MODE];

export const TOTAL_COUNT_HEADER = 'x-total-count';
export const ENGINE_FAILURE_HTTP_STATUS = 500;

export type WinnerSortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';

interface ApiWinner {
   id: number;
   wins: number;
   time: number;
}

interface EngineResponse {
   velocity: number;
   distance: number;
}

interface ApiError {
   isFailed: true;
   status?: number;
   errors: {
      message: string;
      list: null;
   };
}

export type { ApiError };

export const isApiError = (value: unknown): value is ApiError =>
   typeof value === 'object' && value !== null && 'isFailed' in value && (value as ApiError).isFailed === true;

const createError = (message: string, status?: number): ApiError => ({
   isFailed: true,
   status,
   errors: { message, list: null },
});

const parseTotalCount = (response: Response): number => Number(response.headers.get('X-Total-Count') ?? 0);

const toListResponse = <T>(data: T[], total: number) => ({
   data,
   headers: { [TOTAL_COUNT_HEADER]: String(total) },
});

type FetchOptions = {
   method?: string;
   headers?: Record<string, string>;
   body?: string;
};

const request = async <T>(path: string, options?: FetchOptions): Promise<T | ApiError> => {
   try {
      const response = await fetch(`${API_BASE_URL}${path}`, options);
      if (!response.ok) {
         const message = await response.text();
         return createError(message || response.statusText, response.status);
      }
      const text = await response.text();
      if (!text) return {} as T;
      return JSON.parse(text) as T;
   } catch {
      return createError('Network error. Is the API server running on port 3000?');
   }
};

/** GET /garage?_page=&_limit= */
export const fetchGarageListPage = async (pageNo: number) => {
   const response = await fetch(`${API_BASE_URL}/garage?_page=${pageNo}&_limit=${GARAGE_PAGE_SIZE}`);
   if (!response.ok) return createError('Failed to load garage', response.status);
   const data = (await response.json()) as Car[];
   return toListResponse(data, parseTotalCount(response));
};

/** GET /winners?_page=&_limit=&_sort=&_order= */
export const fetchWinnersListPage = async ({
   pageNo,
   sortField,
   sortOrder,
}: {
   pageNo: number;
   sortField: WinnerSortField;
   sortOrder: SortOrder;
}) => {
   const response = await fetch(
      `${API_BASE_URL}/winners?_page=${pageNo}&_limit=${WINNERS_PAGE_SIZE}&_sort=${sortField}&_order=${sortOrder}`
   );
   if (!response.ok) return createError('Failed to load winners', response.status);
   const data = (await response.json()) as ApiWinner[];
   return toListResponse(data, parseTotalCount(response));
};

/** GET /garage/:id */
export const fetchCarData = async (id: number): Promise<Car[]> => {
   const car = await request<Car>(`/garage/${id}`);
   if (isApiError(car)) return [];
   return [car];
};

/** POST /garage */
export const fetchNewCar = async (carData: CarInput) => {
   const validationError = validateCarName(carData.name);
   if (validationError) return createError(validationError);

   return request<Car>('/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: normalizeCarName(carData.name), color: carData.color }),
   });
};

/** PUT /garage/:id */
export const fetchUpdateCar = async (carData: Car) => {
   const validationError = validateCarName(carData.name);
   if (validationError) return createError(validationError);

   return request<Car>(`/garage/${carData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: normalizeCarName(carData.name), color: carData.color }),
   });
};

/** DELETE /garage/:id + DELETE /winners/:id */
export const fetchDeleteCar = async (id: number) => {
   const garageResult = await request<Record<string, never>>(`/garage/${id}`, { method: 'DELETE' });
   if (isApiError(garageResult)) return garageResult;
   try {
      await fetch(`${API_BASE_URL}/winners/${id}`, { method: 'DELETE' });
   } catch {
      // Winner may not exist — garage delete already succeeded.
   }
   return { success: true };
};

/** POST /garage × count */
export const fetchGenerateCars = async (count: number) => {
   const requests = Array.from({ length: count }, () =>
      request<Car>('/garage', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: getRandomCarName(), color: getRandomColor() }),
      })
   );
   const results = await Promise.all(requests);
   const failed = results.find(isApiError);
   if (failed) return failed;

   const listResponse = await fetch(`${API_BASE_URL}/garage?_page=1&_limit=1`);
   const total = parseTotalCount(listResponse);
   return { added: count, total };
};

/** GET /winners/:id → PUT or POST /winners */
export const fetchNewWinner = async (winner: { id: number; time: number }) => {
   const existing = await request<ApiWinner>(`/winners/${winner.id}`);
   if (!isApiError(existing)) {
      return request<ApiWinner>(`/winners/${winner.id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            wins: existing.wins + 1,
            time: Math.min(existing.time, winner.time),
         }),
      });
   }

   return request<ApiWinner>('/winners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: winner.id, wins: 1, time: winner.time }),
   });
};

/** PUT /winners/:id */
export const fetchUpdateWinner = async (winner: ApiWinner) =>
   request<ApiWinner>(`/winners/${winner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins: winner.wins, time: winner.time }),
   });

/** DELETE /winners/:id */
export const fetchDeleteWinner = async (id: number) => request<Record<string, never>>(`/winners/${id}`, { method: 'DELETE' });

/** PATCH /engine?id=&status=started|stopped */
export const fetchCarEngineMode = async (id: number, mode: typeof ENGINE_MODE.STARTED | typeof ENGINE_MODE.STOPPED) => {
   const result = await request<EngineResponse>(`/engine?id=${id}&status=${mode}`, { method: 'PATCH' });
   if (isApiError(result)) return result;
   return result;
};

/** PATCH /engine?id=&status=drive */
export const fetchCarDrive = async (id: number) => {
   const result = await request<{ success: boolean }>(`/engine?id=${id}&status=${ENGINE_MODE.DRIVE}`, { method: 'PATCH' });
   if (isApiError(result)) {
      return { isFailed: true as const, status: result.status, errors: { message: 'Engine failure', list: null } };
   }
   return { success: true };
};
