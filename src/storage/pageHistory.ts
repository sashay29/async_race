import { STORAGE_KEYS } from 'constants/storage';
import { PAGE_KEYS } from 'constants/routes';
import type { PageKey } from 'constants/routes';

type PageHistory = Partial<Record<PageKey, number>>;

const readHistory = (): PageHistory => {
   try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.PAGE_HISTORY) || '{}') as PageHistory;
   } catch {
      return {};
   }
};

const writeHistory = (data: PageHistory): void => {
   sessionStorage.setItem(STORAGE_KEYS.PAGE_HISTORY, JSON.stringify(data));
};

export const initPageHistory = (): void => {
   if (!sessionStorage.getItem(STORAGE_KEYS.PAGE_HISTORY)) {
      writeHistory({ [PAGE_KEYS.GARAGE]: 1, [PAGE_KEYS.WINNERS]: 1 });
   }
};

export const getSavedPage = (key: PageKey): number => readHistory()[key] ?? 1;

export const savePage = (key: PageKey, page: number): void => {
   const data = readHistory();
   data[key] = page;
   writeHistory(data);
};
