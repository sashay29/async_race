import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { GARAGE_PAGE_SIZE } from 'constants/carData';
import { getSavedPage, savePage } from 'storage/pageHistory';
import { fetchGaragePage, setPage, setRace } from 'store/slices/garageSlice';

export function useTrackPagination() {
   const dispatch = useAppDispatch();
   const { total, race, page, cars } = useAppSelector((state) => state.garage);
   const [currentPage, setCurrentPage] = useState(Math.max(1, getSavedPage('garage')));
   const lastPage = Math.max(1, Math.ceil(total / GARAGE_PAGE_SIZE));

   useEffect(() => {
      if (currentPage > lastPage) setCurrentPage(lastPage);
   }, [total, lastPage, currentPage]);

   useEffect(() => {
      savePage('garage', currentPage);
      dispatch(setPage(currentPage));
      if (page === currentPage && cars.length > 0) return;
      dispatch(fetchGaragePage(currentPage));
   }, [dispatch, currentPage, page, cars.length]);

   const changePage = (nextPage: number) => {
      if (race === 'started') dispatch(setRace('stopped'));
      setCurrentPage(nextPage);
   };

   return { page: currentPage, total, changePage };
}
