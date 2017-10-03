import { expect } from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';

import { data as mockData } from './mock-data';

import { Camping } from '../src/camping';
import { DateRange } from '../src/date-range';
import { Campsite, GapRule } from '../src/models';

describe('Camping', function () {
  
  const dates: DateRange = new DateRange('3/5/2017', '3/8/2017');
  const reservationBefore: DateRange = new DateRange('3/1/2017', '3/2/2017');
  const reservationAfter: DateRange = new DateRange('3/10/2017', '3/12/2017');
  const reservationDuring: DateRange = new DateRange('3/6/2017', '3/6/2017');
  
  it('successfully determines available campsites', () => {
    const available: string[] = Camping.available(mockData);

    expect(available).to.deep.eq([
      'Daniel Boone Bungalow',
      'Teddy Roosevelt Tent Site',
      'Bear Grylls Cozy Cave',
      'Wyatt Earp Corral'
    ]);
  });

  it('successfully determines conflicts', () => {
    const search: DateRange = new DateRange(mockData.search.startDate, mockData.search.endDate);
    const gaps: number[] = [2,3];
    const conflicts: number[] = Camping.getConflicts(search, mockData.reservations, gaps);
    
    expect(conflicts).to.deep.eq([1, 2, 3, 4, 7]);
  });
  
  it('has no conflicts', () => {
    const gaps: number[] = [1];
    const hasConflicts: boolean = Camping.hasConflicts(dates, reservationBefore, gaps);

    expect(hasConflicts).to.be.false;
  });

  it('has conflicts b/c date is within the a reservation', () => {
    const gaps: number[] = [2];
    const hasConflicts: boolean = Camping.hasConflicts(dates, reservationDuring, gaps);

    expect(hasConflicts).to.be.true;
  });

  it('validates gap rule before the date', () => {
    const gap: number = 2;
    const violatesGapRule: boolean = Camping.violatesGapRule(dates, reservationBefore, gap);

    expect(violatesGapRule).to.be.true;
  });

  it('validates gap rule after the date', () => {
    const gap: number = 1;
    const violatesGapRule: boolean = Camping.violatesGapRule(dates, reservationAfter, gap);

    expect(violatesGapRule).to.be.true;
  });

});
