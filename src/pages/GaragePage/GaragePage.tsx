import React from 'react';
import { useAppSelector } from 'store/hooks';
import ControlPanel from 'components/Garage/ControlPanel/ControlPanel';
import { useTrackPagination } from 'components/Garage/Track/useTrackPagination';
import WinnerModal from 'components/Garage/WinnerModal/WinnerModal';
import GaragePageContent from './GaragePageContent';

function GaragePage() {
   const { page, total, changePage } = useTrackPagination();
   const { cars, isLoading, error } = useAppSelector((state) => state.garage);
   const isInitialLoad = isLoading && cars.length === 0 && !error;

   return (
      <main aria-labelledby="garage-heading">
         <ControlPanel />
         <GaragePageContent
            cars={cars}
            page={page}
            total={total}
            isInitialLoad={isInitialLoad}
            error={error}
            onPageChange={changePage}
         />
         {!isInitialLoad && <WinnerModal />}
      </main>
   );
}

export default GaragePage;
