import { useAppSelector } from 'store/hooks';
import { isRaceLocked } from 'constants/race';

export function useIsRaceLocked(): boolean {
   const race = useAppSelector((state) => state.garage.race);
   return isRaceLocked(race);
}
