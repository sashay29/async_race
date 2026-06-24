import { useAppSelector } from 'store/hooks';
import { isRaceRunning } from 'constants/race';

export function useIsRaceRunning(): boolean {
   const race = useAppSelector((state) => state.garage.race);
   return isRaceRunning(race);
}
