import React, { ChangeEvent, FormEvent } from 'react';
import { MAX_CAR_NAME_LENGTH } from 'constants/carData';
import CarFormRow from 'components/Garage/CarFormRow/CarFormRow';
import styles from './CarForm.module.css';

interface CarFormFieldsProps {
   formId: string;
   legend: string;
   nameLabel: string;
   name: string;
   color: string;
   submitLabel: string;
   disabled: boolean;
   fieldsetDisabled: boolean;
   onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
   onColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
   onSubmit: (event: FormEvent<HTMLFormElement>) => void;
   formAriaLabel: string;
}

function CarFormFields({
   formId,
   legend,
   nameLabel,
   name,
   color,
   submitLabel,
   disabled,
   fieldsetDisabled,
   onNameChange,
   onColorChange,
   onSubmit,
   formAriaLabel,
}: CarFormFieldsProps) {
   return (
      <form className={styles.form} onSubmit={onSubmit} aria-label={formAriaLabel}>
         <fieldset disabled={fieldsetDisabled} className={styles.fieldset}>
            <legend className={styles.legend}>{legend}</legend>
            <CarFormRow
               formId={formId}
               nameLabel={nameLabel}
               name={name}
               color={color}
               onNameChange={onNameChange}
               onColorChange={onColorChange}
               submitLabel={submitLabel}
               disabled={disabled}
               maxLength={MAX_CAR_NAME_LENGTH}
            />
         </fieldset>
      </form>
   );
}

export default CarFormFields;
