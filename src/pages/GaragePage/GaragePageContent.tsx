import React from 'react';
import type { Car } from 'store/types/car';
import Track from 'components/Garage/Track/Track';
import Spinner from 'components/Ui/Spinner/Spinner';
import EmptyState from 'components/Ui/EmptyState/EmptyState';

const EMPTY_GARAGE_MESSAGE = 'No cars yet. Add one to get started.';

interface GaragePageContentProps {
   cars: Car[];
   page: number;
   total: number;
   isInitialLoad: boolean;
   error: string | null;
   onPageChange: (page: number) => void;
}

function GaragePageContent({ cars, page, total, isInitialLoad, error, onPageChange }: GaragePageContentProps) {
   if (isInitialLoad) return <Spinner />;
   if (error) return <EmptyState message={error} />;
   if (total === 0) return <EmptyState message={EMPTY_GARAGE_MESSAGE} />;

   return <Track cars={cars} page={page} total={total} onPageChange={onPageChange} />;
}

export default GaragePageContent;
