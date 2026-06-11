import React from 'react';
import styles from './FinishLine.module.css';

function FinishLine() {
   return (
      <div className={styles.finishLine} aria-hidden="true">
         {['a', 'b', 'c', 'd'].map((id) => (
            <div key={id} className={styles.background} />
         ))}
      </div>
   );
}

export default FinishLine;
