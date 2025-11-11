import {
  DateList,
  WeekStartsOn
} from '@commons/components/calendar/entities/calendar.entities';
import {
  cleanAndSetMinRange,
  createCalendar,
  reset,
  selectDay,
  setLimitsDate,
  setMaxRange,
  setMinRange,
  turnOffFieldRange,
  updateRange
} from '@commons/components/calendar/helpers/calendar.helpers';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

import { format, isAfter, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';

export class Calendar {
  private _calendar: DateList[];
  private _minRange: Date;
  private _maxRange: Date;
  private _justOneDate: boolean;
  private _locale: Locale = es;
  private _rangeFormat: string = 'eee, d MMM';

  constructor(
    date: Date = new Date(),
    monthsBackward: number = 0,
    monthsForward: number = 12,
    weekStartsOn: WeekStartsOn = 0
  ) {
    this._calendar = createCalendar(
      date,
      monthsBackward,
      monthsForward,
      weekStartsOn
    );
  }

  get print(): DateList[] {
    return this._calendar;
  }

  get minRange(): string {
    return !isNullOrUndefined(this._minRange)
      ? format(this._minRange, this._rangeFormat, { locale: this._locale })
      : null;
  }

  get maxRange(): string {
    return !isNullOrUndefined(this._maxRange)
      ? format(this._maxRange, this._rangeFormat, { locale: this._locale })
      : null;
  }

  get valid(): boolean {
    return (
      !isNullOrUndefined(this.minRange) && !isNullOrUndefined(this.maxRange)
    );
  }

  get selectedDates(): Date[] {
    return this._justOneDate
      ? [this._minRange, null]
      : [this._minRange, this._maxRange];
  }

  get anchor(): string {
    return !isNullOrUndefined(this._minRange)
      ? format(this._minRange, 'MMMM')
      : null;
  }

  public setLocale(locale: Locale): void {
    this._locale = locale;
  }

  public setRangeFormat(rangeFormat: string): void {
    this._rangeFormat = rangeFormat;
  }

  public setLimitsDate(minDate: Date = new Date(), maxDate?: Date): void {
    this._calendar = setLimitsDate(this._calendar, minDate, maxDate);
  }

  public selectDay(date: Date = new Date()): void {
    this._calendar = selectDay(this._calendar, date);
  }

  public reset(): void {
    this._calendar = reset(this._calendar);
    this._minRange = undefined;
    this._maxRange = undefined;
  }

  public setMinRange(date: Date): void {
    this._minRange = date;
    this.verifyMinRange(date);
    this._calendar = setMinRange(this._calendar, this._minRange);
    this.updateRange();
  }

  public setMaxRange(date: Date): void {
    this._maxRange = date;
    this.verifyMaxRange(date);
    this._calendar = setMaxRange(this._calendar, this._maxRange);
    this.updateRange();
  }

  public updateRange(): void {
    this._calendar = updateRange(
      this._calendar,
      this._minRange,
      this._maxRange
    );
  }

  public setJustOneDate(justOneDate: boolean): void {
    this._justOneDate = justOneDate;
    if (this._justOneDate && !isNullOrUndefined(this._minRange)) {
      this._calendar = cleanAndSetMinRange(this._calendar, this._minRange);
      this._maxRange = undefined;
    }
  }

  private verifyMinRange(date: Date): void {
    if (isAfter(date, this._maxRange)) {
      this._maxRange = undefined;
      this._calendar = turnOffFieldRange(this._calendar, 'maxRange');
    }
  }

  private verifyMaxRange(date: Date): void {
    if (isBefore(date, this._minRange)) {
      this._minRange = undefined;
      this._calendar = turnOffFieldRange(this._calendar, 'minRange');
    }
  }
}
