import { faPlay, faStop, faTrash, faRefresh, faSliders, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { isLaneResettable, LANE_STATUS, LaneStatus } from 'constants/race';

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
   status: LaneStatus;
   selectedCarId?: number;
   carId: number;
   carName: string;
   onStart: () => void;
   onStop: () => void;
   onSelect: () => void;
   onDelete: () => void;
}

const buildStartControl = (carName: string, status: LaneStatus, onStart: () => void): LaneControlItem => ({
   key: 'start',
   icon: faPlay,
   tone: 'start',
   label: `Start ${carName}`,
   disabled: status !== LANE_STATUS.STOPPED,
   onClick: onStart,
});

const buildStopControl = (carName: string, status: LaneStatus, onStop: () => void): LaneControlItem => {
   const isResettable = isLaneResettable(status);

   return {
      key: 'stop',
      icon: (isResettable ? faRefresh : faStop) as IconDefinition,
      tone: 'stop',
      label: isResettable ? `Reset ${carName}` : `Stop ${carName}`,
      disabled: status === LANE_STATUS.STOPPED,
      onClick: onStop,
   };
};

const buildSelectControl = (
   carName: string,
   status: LaneStatus,
   selectedCarId: number | undefined,
   carId: number,
   onSelect: () => void
): LaneControlItem => ({
   key: 'select',
   icon: faSliders,
   tone: selectedCarId === carId ? 'active' : 'neutral',
   label: selectedCarId === carId ? `Deselect ${carName}` : `Select ${carName}`,
   disabled: status === LANE_STATUS.STARTED,
   onClick: onSelect,
});

const buildDeleteControl = (carName: string, status: LaneStatus, onDelete: () => void): LaneControlItem => ({
   key: 'delete',
   icon: faTrash,
   tone: 'danger',
   label: `Delete ${carName}`,
   disabled: status === LANE_STATUS.STARTED,
   onClick: onDelete,
});

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
      buildStartControl(carName, status, onStart),
      buildStopControl(carName, status, onStop),
      buildSelectControl(carName, status, selectedCarId, carId, onSelect),
      buildDeleteControl(carName, status, onDelete),
   ];
}
