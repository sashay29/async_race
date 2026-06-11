import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonVariant = 'default' | 'primary' | 'accent' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   onClick?: MouseEventHandler<HTMLButtonElement>;
   isActive?: boolean;
   variant?: ButtonVariant;
}

function Button({
   children,
   onClick,
   disabled = false,
   className,
   isActive = false,
   variant = 'default',
   type = 'button',
   'aria-label': ariaLabel,
}: ButtonProps) {
   return (
      <button
         type={type}
         disabled={disabled || isActive}
         onClick={onClick}
         aria-label={ariaLabel}
         className={classNames(styles.button, styles[variant], { [styles.isActive]: isActive }, className)}
      >
         {children}
      </button>
   );
}

export default Button;
