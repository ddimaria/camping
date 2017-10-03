export interface Campsite {
  id: number;
  name: string;
}

export interface GapRule {
  gapSize: number;
}

export interface Reservation  {
  campsiteId: number;
  startDate: string;
  endDate: string;
}

export interface Search  {
  startDate: string;
  endDate: string;
}

export interface Data {
  search: Search;
  campsites: Campsite[];
  gapRules: GapRule[];
  reservations: Reservation[];
}
