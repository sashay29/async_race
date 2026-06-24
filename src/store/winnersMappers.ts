import { fetchCarData } from 'constants/api';
import { FALLBACK_CAR_COLOR } from 'constants/ui';
import type { Car } from 'store/types/car';
import type { Winner } from 'store/types/winner';

interface ApiWinner {
   id: number;
   wins: number;
   time: number;
}

const mapWinnerWithCar = (winner: ApiWinner, car?: Car): Winner => ({
   ...winner,
   name: car?.name ?? '',
   color: car?.color ?? FALLBACK_CAR_COLOR,
});

export const mapWinnersWithCars = async (winners: ApiWinner[], cars: Car[]): Promise<Winner[]> =>
   Promise.all(
      winners.map(async (winner) => {
         const cachedCar = cars.find((item) => item.id === winner.id);
         if (cachedCar) return mapWinnerWithCar(winner, cachedCar);

         const [car] = await fetchCarData(winner.id);
         return mapWinnerWithCar(winner, car);
      })
   );

export type { ApiWinner };
