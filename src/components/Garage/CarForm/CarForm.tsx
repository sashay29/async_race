import React, { ChangeEvent, FormEvent } from 'react';
import { useAppSelector } from 'store/hooks';
import { useCarForm } from './useCarForm';
import CarFormFields from './CarFormFields';
import styles from './CarForm.module.css';

type CarFormState = ReturnType<typeof useCarForm>;

interface CreateCarFormSectionProps {
   form: CarFormState;
   isRaceLocked: boolean;
}

function CreateCarFormSection({ form, isRaceLocked }: CreateCarFormSectionProps) {
   return (
      <CarFormFields
         formId="create-car"
         legend="Create car"
         nameLabel="New car name"
         name={form.newCar.name}
         color={form.newCar.color}
         submitLabel="Create"
         disabled={!form.canCreate || isRaceLocked}
         fieldsetDisabled={isRaceLocked}
         onNameChange={(event: ChangeEvent<HTMLInputElement>) => form.updateNewCar({ name: event.target.value })}
         onColorChange={(event: ChangeEvent<HTMLInputElement>) => form.updateNewCar({ color: event.target.value })}
         onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            form.submitNew();
         }}
         formAriaLabel="Create car"
      />
   );
}

interface UpdateCarFormSectionProps {
   form: CarFormState;
   isRaceLocked: boolean;
   hasSelectedCar: boolean;
}

function UpdateCarFormSection({ form, isRaceLocked, hasSelectedCar }: UpdateCarFormSectionProps) {
   return (
      <CarFormFields
         formId="update-car"
         legend="Update selected car"
         nameLabel="Selected car name"
         name={form.editCar.name}
         color={form.editCar.color}
         submitLabel="Update"
         disabled={!form.canUpdate || isRaceLocked}
         fieldsetDisabled={!hasSelectedCar || isRaceLocked}
         onNameChange={(event: ChangeEvent<HTMLInputElement>) => form.updateEditCar({ name: event.target.value })}
         onColorChange={(event: ChangeEvent<HTMLInputElement>) => form.updateEditCar({ color: event.target.value })}
         onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            form.submitEdit();
         }}
         formAriaLabel="Update selected car"
      />
   );
}

function CarForm() {
   const isRaceLocked = useAppSelector((state) => state.garage.race === 'started' || state.garage.race === 'finished');
   const hasSelectedCar = useAppSelector((state) => Boolean(state.garage.selectedCar));
   const form = useCarForm();

   return (
      <div className={styles.forms}>
         <CreateCarFormSection form={form} isRaceLocked={isRaceLocked} />
         <UpdateCarFormSection form={form} isRaceLocked={isRaceLocked} hasSelectedCar={hasSelectedCar} />
      </div>
   );
}

export default CarForm;
