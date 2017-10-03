import { parse } from 'date-fns';

export class DateRange {

  public startDate: Date;
  public endDate: Date;

  constructor(startDate: string, endDate: string) {
    this.startDate = parse(startDate);
    this.endDate = parse(endDate);
  }
}
