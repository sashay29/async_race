import React from 'react';
import { useAppSelector } from 'store/hooks';
import ControlPanel from 'components/Garage/ControlPanel/ControlPanel';
import Track from 'components/Garage/Track/Track';
import { useTrackPagination } from 'components/Garage/Track/useTrackPagination';
import Spinner from 'components/Ui/Spinner/Spinner';
import EmptyState from 'components/Ui/EmptyState/EmptyState';
import WinnerModal from 'components/Garage/WinnerModal/WinnerModal';

function GaragePage() {
   const { page, total, changePage } = useTrackPagination();
   const { cars, isLoading } = useAppSelector((state) => state.garage);
   const isInitialLoad = isLoading && cars.length === 0;

   return (
      <main aria-labelledby="garage-heading">
         <ControlPanel />
         {isInitialLoad ? (
            <Spinner />
         ) : total !== 0 ? (
            <Track cars={cars} page={page} total={total} onPageChange={changePage} />
         ) : (
            <EmptyState message="No cars yet. Add one to get started." />
         )}
         {!isInitialLoad && <WinnerModal />}
      </main>
   );
}

export default GaragePage;
