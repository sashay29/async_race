import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { WINNERS_PAGE_SIZE } from 'constants/carData';
import { PAGE_KEYS } from 'constants/routes';
import { getSavedPage, savePage } from 'storage/pageHistory';
import { fetchWinnersPage, setPage } from 'store/slices/winnersSlice';

export function useWinnersPagination() {
   const dispatch = useAppDispatch();
   const { total, sortField, sortOrder } = useAppSelector((state) => state.winners);
   const [page, setPageState] = useState(Math.max(1, getSavedPage(PAGE_KEYS.WINNERS)));
   const lastPage = Math.max(1, Math.ceil(total / WINNERS_PAGE_SIZE));

   useEffect(() => {
      if (page > lastPage) setPageState(lastPage);
   }, [total, lastPage, page]);

   useEffect(() => {
      savePage(PAGE_KEYS.WINNERS, page);
      dispatch(setPage(page));
      dispatch(fetchWinnersPage(page));
   }, [dispatch, page, sortField, sortOrder]);

   return { page, total, setPage: setPageState };
}
