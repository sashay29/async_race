import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { SortOrder, WinnerSortField } from 'constants/api';
import { setSort } from 'store/slices/winnersSlice';

type SortBy = 'Wins' | 'Time';
type SortDirection = 'Ascending' | 'Descending';

const sortFieldMap: Record<SortBy, WinnerSortField> = { Wins: 'wins', Time: 'time' };
const sortOrderMap: Record<SortDirection, SortOrder> = { Ascending: 'ASC', Descending: 'DESC' };

export function useSortControls() {
   const dispatch = useAppDispatch();
   const { sortField, sortOrder } = useAppSelector((state) => state.winners);
   const [sortBy, setSortBy] = useState<SortBy>(sortField === 'wins' ? 'Wins' : 'Time');
   const [direction, setDirection] = useState<SortDirection>(sortOrder === 'ASC' ? 'Ascending' : 'Descending');

   const applySort = (nextSortBy: SortBy, nextDirection: SortDirection) => {
      dispatch(setSort({ sortField: sortFieldMap[nextSortBy], sortOrder: sortOrderMap[nextDirection] }));
   };

   const handleSortByChange = (next: SortBy) => {
      setSortBy(next);
      applySort(next, direction);
   };

   const handleDirectionChange = (next: SortDirection) => {
      setDirection(next);
      applySort(sortBy, next);
   };

   return { sortBy, direction, handleSortByChange, handleDirectionChange };
}

export type { SortBy, SortDirection };
