import type { Car, CarInput } from 'store/types/car';

const DRAFT_KEY = 'garageFormDraft';

interface FormDraft {
   newCar: CarInput;
   editCar: Car;
}

const defaultDraft = (): FormDraft => ({
   newCar: { name: '', color: '#00e5ff' },
   editCar: { name: '', color: '#00e5ff', id: 0 },
});

export const loadNewCarDraft = (): CarInput => {
   try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      return saved ? { ...defaultDraft().newCar, ...JSON.parse(saved).newCar } : defaultDraft().newCar;
   } catch {
      return defaultDraft().newCar;
   }
};

export const saveNewCarDraft = (newCar: CarInput): void => {
   sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ newCar }));
};

export const defaultEditCar = (): Car => defaultDraft().editCar;
