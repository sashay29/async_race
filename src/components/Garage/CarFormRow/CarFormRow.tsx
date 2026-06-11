import React, { ChangeEvent } from 'react';
import Button from 'components/Ui/Button/Button';
import styles from './CarFormRow.module.css';

interface CarFormRowProps {
   formId: string;
   nameLabel: string;
   name: string;
   color: string;
   onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
   onColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
   submitLabel: string;
   disabled: boolean;
   maxLength?: number;
}

function CarFormRow({ formId, nameLabel, name, color, onNameChange, onColorChange, submitLabel, disabled, maxLength }: CarFormRowProps) {
   const nameId = `${formId}-name`;
   const colorId = `${formId}-color`;

   return (
      <div className={styles.row}>
         <label htmlFor={nameId} className="visuallyHidden">
            {nameLabel}
         </label>
         <input id={nameId} name="name" placeholder={nameLabel} value={name} onChange={onNameChange} className={styles.nameInput} maxLength={maxLength} autoComplete="off" />
         <input id={colorId} name="color" type="color" value={color} onChange={onColorChange} className={styles.colorBox} aria-label="Car color" />
         <Button type="submit" disabled={disabled}>
            {submitLabel}
         </Button>
      </div>
   );
}

export default CarFormRow;
