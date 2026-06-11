import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
   message: string;
}

function EmptyState({ message }: EmptyStateProps) {
   return (
      <p className={styles.message} role="status">
         {message}
      </p>
   );
}

export default EmptyState;
