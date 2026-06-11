import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ToggleButton.module.css';

interface ToggleButtonProps {
   name: string;
   valueOne: string;
   valueTwo: string;
   selected: string;
   onChange: (value: string) => void;
   isSeparated?: boolean;
}

function ToggleButton({ name, valueOne, valueTwo, selected, onChange, isSeparated = false }: ToggleButtonProps) {
   const [active, setActive] = useState(selected);

   useEffect(() => {
      setActive(selected);
   }, [selected]);

   const select = (value: string) => {
      setActive(value);
      onChange(value);
   };

   return (
      <div className={classNames(styles.toggle, { [styles.toggleSeparated]: isSeparated })}>
         <input name={name} type="radio" id={`${name}-${valueOne}`} className={styles.toggleInput} checked={active === valueOne} readOnly onClick={() => select(valueOne)} />
         <label htmlFor={`${name}-${valueOne}`} className={classNames(styles.toggleBtn, styles.leftBtn)}>
            {valueOne}
         </label>
         <input name={name} type="radio" id={`${name}-${valueTwo}`} className={styles.toggleInput} checked={active === valueTwo} readOnly onClick={() => select(valueTwo)} />
         <label htmlFor={`${name}-${valueTwo}`} className={classNames(styles.toggleBtn, styles.rightBtn)}>
            {valueTwo}
         </label>
      </div>
   );
}

export default ToggleButton;
