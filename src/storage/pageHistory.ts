type PageKey = 'garage' | 'winners';

type PageHistory = Partial<Record<PageKey, number>>;

const STORAGE_KEY = 'asyncRacePageHistory';

const readHistory = (): PageHistory => {
   try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') as PageHistory;
   } catch {
      return {};
   }
};

const writeHistory = (data: PageHistory): void => {
   sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const initPageHistory = (): void => {
   if (!sessionStorage.getItem(STORAGE_KEY)) {
      writeHistory({ garage: 1, winners: 1 });
   }
};

export const getSavedPage = (key: PageKey): number => readHistory()[key] ?? 1;

export const savePage = (key: PageKey, page: number): void => {
   const data = readHistory();
   data[key] = page;
   writeHistory(data);
};
