import React from 'react';
import CarIcon from 'assets/CarIcon/CarIcon';
import type { Winner } from 'store/types/winner';
import styles from './WinnersRow.module.css';

interface WinnersRowProps {
   winner: Winner;
   rowNumber: number;
}

function WinnersRow({ winner, rowNumber }: WinnersRowProps) {
   return (
      <tr className={styles.row}>
         <td>{rowNumber}</td>
         <td>
            <CarIcon width={64} height={26} fill={winner.color} aria-label={`${winner.name} car`} />
         </td>
         <td>{winner.name}</td>
         <td>{winner.wins}</td>
         <td>{winner.time}</td>
      </tr>
   );
}

export default WinnersRow;
