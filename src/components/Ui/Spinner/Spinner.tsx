import React from 'react';
import styles from './Spinner.module.css';

function Spinner() {
   return <div className={styles.loader} role="status" aria-live="polite" aria-label="Loading" />;
}

export default Spinner;
