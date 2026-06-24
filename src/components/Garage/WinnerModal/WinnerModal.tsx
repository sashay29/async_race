import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { WINNER_MODAL_AUTO_CLOSE_MS } from 'constants/race';
import { closeWinnerModal } from 'store/slices/garageSlice';
import styles from './WinnerModal.module.css';

function WinnerModal() {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.garage.isWinnerModalOpen);
   const winner = useAppSelector((state) => state.winners.activeWinner);

   useEffect(() => {
      if (!isOpen) return undefined;
      const timer = window.setTimeout(() => dispatch(closeWinnerModal()), WINNER_MODAL_AUTO_CLOSE_MS);
      return () => clearTimeout(timer);
   }, [isOpen, dispatch]);

   if (!isOpen) return null;

   return (
      <dialog open className={styles.dialog} aria-labelledby="winner-title" aria-describedby="winner-hint">
         <div className={styles.card}>
            <FontAwesomeIcon className={styles.icon} icon={faTrophy} aria-hidden />
            <p className={styles.label}>Winner</p>
            <h2 id="winner-title" className={styles.title}>
               {winner?.name}
            </h2>
            <p id="winner-hint" className={styles.hint}>
               Closes automatically in a few seconds
            </p>
            <button type="button" className={styles.closeButton} onClick={() => dispatch(closeWinnerModal())}>
               Close
            </button>
         </div>
      </dialog>
   );
}

export default WinnerModal;
