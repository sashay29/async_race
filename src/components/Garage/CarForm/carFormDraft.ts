import { STORAGE_KEYS } from 'constants/storage';
import { DEFAULT_CAR_COLOR } from 'constants/ui';
import type { Car, CarInput } from 'store/types/car';

interface FormDraft {
   newCar: CarInput;
   editCar: Car;
}

const defaultDraft = (): FormDraft => ({
   newCar: { name: '', color: DEFAULT_CAR_COLOR },
   editCar: { name: '', color: DEFAULT_CAR_COLOR, id: 0 },
});

export const loadNewCarDraft = (): CarInput => {
   try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.GARAGE_FORM_DRAFT);
      return saved ? { ...defaultDraft().newCar, ...JSON.parse(saved).newCar } : defaultDraft().newCar;
   } catch {
      return defaultDraft().newCar;
   }
};

export const saveNewCarDraft = (newCar: CarInput): void => {
   sessionStorage.setItem(STORAGE_KEYS.GARAGE_FORM_DRAFT, JSON.stringify({ newCar }));
};

export const defaultEditCar = (): Car => defaultDraft().editCar;
