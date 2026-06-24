import React from 'react';
import CarIcon from 'assets/CarIcon/CarIcon';
import { WINNERS_CAR_ICON_HEIGHT, WINNERS_CAR_ICON_WIDTH } from 'constants/ui';
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
            <CarIcon
               width={WINNERS_CAR_ICON_WIDTH}
               height={WINNERS_CAR_ICON_HEIGHT}
               fill={winner.color}
               aria-label={`${winner.name} car`}
            />
         </td>
         <td>{winner.name}</td>
         <td>{winner.wins}</td>
         <td>{winner.time}</td>
      </tr>
   );
}

export default WinnersRow;
