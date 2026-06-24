export const ROUTE_SEGMENTS = {
   GARAGE: 'garage',
   WINNERS: 'winners',
} as const;

export const ROUTES = {
   GARAGE: `/${ROUTE_SEGMENTS.GARAGE}`,
   WINNERS: `/${ROUTE_SEGMENTS.WINNERS}`,
} as const;

export const PAGE_KEYS = {
   GARAGE: ROUTE_SEGMENTS.GARAGE,
   WINNERS: ROUTE_SEGMENTS.WINNERS,
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];
