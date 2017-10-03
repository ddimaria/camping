import { uniq } from 'lodash';
import { parse, differenceInDays, areRangesOverlapping, addDays } from 'date-fns';
import { Campsite, GapRule, Data, Reservation } from './models';
import { DateRange } from './date-range';

export class Camping {

  /**
   * Determine available campsites for a given search within JSON data
   * 
   * @param {Data}        [data=importedData] 
   * @returns {string[]} 
   */
  public static available(data: Data): string[] {

    const dates: DateRange = new DateRange(data.search.startDate, data.search.endDate);
    const gapRules: number[] = data.gapRules.map( (gapRule: GapRule) => gapRule.gapSize );
    const conflicts: number[] = Camping.getConflicts(dates, data.reservations, gapRules);
    const available: Campsite[] = data.campsites.filter( (campsite: Campsite) => !conflicts.includes(campsite.id) );

    return available.map( (campsite: Campsite) => campsite.name);
  }

  /**
   * Generate a listing of campsiteIds that conflict with rules
   * 
   * @param {DateRange}       dates 
   * @param {Reservation[]}   reservations 
   * @param {number[]}        gapRules 
   * @returns {number[]} 
   */
  public static getConflicts(dates: DateRange, reservations: Reservation[], gapRules: number[]): number[] {

    const conflicts: number[] = reservations
      .filter( (reservation: Reservation) =>
        Camping.hasConflicts(dates, new DateRange(reservation.startDate, reservation.endDate), gapRules),
      )
      .map( (reservation: Reservation) => reservation.campsiteId )
    ;

    return uniq(conflicts);
  }

  /**
   * Determines if dates violate rules for a given reservation
   * 
   * @param {DateRange}       dates 
   * @param {Reservation[]}   reservations 
   * @param {number[]}        gapRules 
   * @returns {number[]} 
   */
  public static hasConflicts(dates: DateRange, reservation: DateRange, gapRules: number[]): boolean {

    return gapRules.reduce( (prev, value) => {
      return prev || (
        areRangesOverlapping(dates.startDate, dates.endDate, reservation.startDate, reservation.endDate)
          || Camping.violatesGapRule(dates, reservation, value)
      );
    }, false);
  }

  /**
   * Determines if dates violate a single gap rule for a given reservation
   * 
   * @param {DateRange}       dates 
   * @param {Reservation[]}   reservations 
   * @param {number}          gapRule 
   * @returns {boolean} 
   */
  public static violatesGapRule(dates: DateRange, reservation: DateRange, gapRule: number): boolean {

    return differenceInDays(dates.startDate, addDays(reservation.endDate, 1)) === gapRule
      || differenceInDays(reservation.startDate,  addDays(dates.endDate, 1)) === gapRule;
  }
}
