import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from 'components/Ui/EmptyState/EmptyState';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
   return (
      <main aria-labelledby="not-found-heading">
         <h2 id="not-found-heading" className={styles.title}>
            404 — page not found
         </h2>
         <EmptyState message="We could not find the page you were looking for." />
         <p className={styles.backLink}>
            <Link to="garage">Back to garage</Link>
         </p>
      </main>
   );
}

export default NotFoundPage;
