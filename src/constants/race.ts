export const RACE_STATUS = {
   STOPPED: 'stopped',
   STARTED: 'started',
   FINISHED: 'finished',
} as const;

export type RaceStatus = (typeof RACE_STATUS)[keyof typeof RACE_STATUS];

export const LANE_STATUS = {
   ...RACE_STATUS,
   BROKEN_ENGINE: 'brokenEngine',
} as const;

export type LaneStatus = (typeof LANE_STATUS)[keyof typeof LANE_STATUS];

export const START_LIGHT_DELAY_MS = 4200;
export const START_LIGHT_STEP_MS = 1000;
export const START_LIGHT_COUNT = 3;
export const WINNER_MODAL_AUTO_CLOSE_MS = 5000;
export const GENERATE_CARS_COUNT = 100;
export const MS_PER_SECOND = 1000;
export const RACE_TIME_DECIMAL_PLACES = 3;

export const isRaceLocked = (race: RaceStatus): boolean =>
   race === RACE_STATUS.STARTED || race === RACE_STATUS.FINISHED;

export const isRaceRunning = (race: RaceStatus): boolean => race === RACE_STATUS.STARTED;

export const isLaneStopped = (status: LaneStatus): boolean => status === LANE_STATUS.STOPPED;

export const isLaneResettable = (status: LaneStatus): boolean =>
   status === LANE_STATUS.FINISHED || status === LANE_STATUS.BROKEN_ENGINE;
