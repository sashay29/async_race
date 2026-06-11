import React from 'react';
import styles from './Logo.module.css';

function Logo() {
   return (
      <div className={styles.logo}>
         <h1 className={styles.title}>Async Race</h1>
      </div>
   );
}

export default Logo;
