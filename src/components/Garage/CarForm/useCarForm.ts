import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { validateCarName } from 'constants/carData';
import { createCar, updateCar, selectCar } from 'store/slices/garageSlice';
import type { Car, CarInput } from 'store/types/car';
import { defaultEditCar, loadNewCarDraft, saveNewCarDraft } from './carFormDraft';

const emptyCarInput = (): CarInput => ({ name: '', color: '#00e5ff' });

export function useCarForm() {
   const dispatch = useAppDispatch();
   const selectedCar = useAppSelector((state) => state.garage.selectedCar);
   const [newCar, setNewCar] = useState<CarInput>(loadNewCarDraft);
   const [editCar, setEditCar] = useState<Car>(defaultEditCar);

   useEffect(() => saveNewCarDraft(newCar), [newCar]);
   useEffect(() => setEditCar(selectedCar ? { ...selectedCar } : defaultEditCar()), [selectedCar]);

   const canUpdate = Boolean(selectedCar) && (editCar.name !== selectedCar?.name || editCar.color !== selectedCar?.color);
   const canCreate = Boolean(newCar.name.trim()) && !validateCarName(newCar.name);

   return {
      newCar,
      editCar,
      canCreate,
      canUpdate,
      updateNewCar: (data: Partial<CarInput>) => setNewCar({ ...newCar, ...data }),
      updateEditCar: (data: Partial<Car>) => setEditCar({ ...editCar, ...data }),
      submitNew: () => {
         if (validateCarName(newCar.name)) return;
         dispatch(createCar(newCar));
         sessionStorage.removeItem('garageFormDraft');
         setNewCar(emptyCarInput());
      },
      submitEdit: () => {
         if (!selectedCar || validateCarName(editCar.name)) return;
         dispatch(updateCar({ ...selectedCar, ...editCar }));
         dispatch(selectCar(undefined));
      },
   };
}
