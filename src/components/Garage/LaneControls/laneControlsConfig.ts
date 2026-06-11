import { faPlay, faStop, faTrash, faRefresh, faSliders, IconDefinition } from '@fortawesome/free-solid-svg-icons';

type ControlTone = 'start' | 'stop' | 'neutral' | 'active' | 'danger';

export interface LaneControlItem {
   key: string;
   icon: IconDefinition;
   tone: ControlTone;
   label: string;
   disabled: boolean;
   onClick: () => void;
}

interface BuildControlsParams {
   status: string;
   selectedCarId?: number;
   carId: number;
   carName: string;
   onStart: () => void;
   onStop: () => void;
   onSelect: () => void;
   onDelete: () => void;
}

export function buildLaneControls({
   status,
   selectedCarId,
   carId,
   carName,
   onStart,
   onStop,
   onSelect,
   onDelete,
}: BuildControlsParams): LaneControlItem[] {
   return [
      { key: 'start', icon: faPlay, tone: 'start', label: `Start ${carName}`, disabled: status !== 'stopped', onClick: onStart },
      {
         key: 'stop',
         icon: (status === 'finished' || status === 'brokenEngine' ? faRefresh : faStop) as IconDefinition,
         tone: 'stop',
         label: status === 'finished' || status === 'brokenEngine' ? `Reset ${carName}` : `Stop ${carName}`,
         disabled: status === 'stopped',
         onClick: onStop,
      },
      {
         key: 'select',
         icon: faSliders,
         tone: selectedCarId === carId ? 'active' : 'neutral',
         label: selectedCarId === carId ? `Deselect ${carName}` : `Select ${carName}`,
         disabled: status === 'started',
         onClick: onSelect,
      },
      { key: 'delete', icon: faTrash, tone: 'danger', label: `Delete ${carName}`, disabled: status === 'started', onClick: onDelete },
   ];
}
