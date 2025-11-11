export interface CalendarProperties {
  date: Date;
  minDate: Date;
  maxDate: Date;
  monthsBackward: number;
  monthsForward: number;
  setMinRange: Date;
  setMaxRange: Date;
  format: string;
  calendarType: CalendarTypes;
  description: string;
}

export enum DateType {
  previous = 'previous',
  current = 'current',
  next = 'next'
}

export enum CalendarTypes {
  from = 'from',
  to = 'to'
}

export interface DateList {
  year: number;
  month: string;
  labels: string[];
  calendar: Day[][];
  isNextYear?: boolean;
}

export interface Day {
  value: number;
  date: Date;
  week: number;
  type: DateType;
  isToday: boolean;
  isWeekend: boolean;
  identifier: string;
  formatted: string;
  disabled?: boolean;
  selected?: boolean;
  minRange?: boolean;
  maxRange?: boolean;
  inRange?: boolean;
  inRangeRight?: boolean;
  inRangeLeft?: boolean;
  price?: number;
}

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | number;
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;
