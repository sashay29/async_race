export interface Car {
   id: number;
   name: string;
   color: string;
}

export interface CarInput {
   name: string;
   color: string;
}

export type RaceStatus = 'stopped' | 'started' | 'finished';
