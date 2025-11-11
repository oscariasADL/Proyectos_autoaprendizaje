import {
  DAYS,
  MONTHS
} from '@commons/components/calendar/constants/calendar.constants';
import {
  DateList,
  DateType,
  Day,
  Month,
  WeekStartsOn
} from '@commons/components/calendar/entities/calendar.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getMonth,
  getWeek,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  isWeekend,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths
} from 'date-fns';
import { es } from 'date-fns/locale';

interface Options {
  year: number;
  month: Month;
  weekStartsOn: WeekStartsOn;
}

function mapDay(
  startDate: Date,
  index: number,
  dayStartOfMonth: Date,
  dayEndOfMonth: Date
): Day {
  const newDate = addDays(startDate, index);
  return {
    value: newDate.getDate(),
    date: newDate,
    week: getWeek(newDate),
    type: isBefore(newDate, dayStartOfMonth)
      ? DateType.previous
      : isAfter(newDate, dayEndOfMonth)
      ? DateType.next
      : DateType.current,
    isToday: isToday(newDate),
    isWeekend: isWeekend(newDate),
    identifier: format(newDate, 'yy-MM-dd'),
    formatted: format(newDate, 'ccc, dd LLL yyyy', { locale: es })
  };
}

function getMonthMatrix({ year, month, weekStartsOn = 0 }: Options): Day[][] {
  const startDate = startOfWeek(new Date(year, month, 1), { weekStartsOn });
  const dayStartOfMonth = startOfMonth(new Date(year, month));
  const dayEndOfMonth = endOfMonth(new Date(year, month));
  const rows = 6;
  const cols = 7;
  const length = rows * cols;

  return Array.from({ length })
    .map((_, index) => mapDay(startDate, index, dayStartOfMonth, dayEndOfMonth))
    .reduce(
      (matrix, current, index, days) =>
        !(index % cols !== 0)
          ? [...matrix, days.slice(index, index + cols)]
          : matrix,
      []
    );
}

function getLabelsMatrix(weekStartsOn: WeekStartsOn): string[] {
  const length = DAYS.length;

  return Array.from({ length }).map(
    (_, index) => DAYS[(index + weekStartsOn) % length]
  );
}

export function setLimitsDate(
  calendar: DateList[],
  minDate: Date = new Date(),
  maxDate: Date
): DateList[] {
  return calendar.map((item) => ({
    ...item,
    calendar: item.calendar.map((week) =>
      week.map((_day) => ({
        ..._day,
        disabled:
          (!isNullOrUndefined(minDate) &&
            isBefore(_day.date, subDays(minDate, 1))) ||
          (!isNullOrUndefined(maxDate) && isAfter(_day.date, maxDate))
      }))
    )
  }));
}

export function selectDay(calendar: DateList[], day: Date): DateList[] {
  return calendar.map((item) => ({
    ...item,
    calendar: item.calendar.map((week) =>
      week.map((_day) => ({
        ..._day,
        selected: isSameDay(_day.date, day)
      }))
    )
  }));
}

export function setMinRange(calendar: DateList[], day: Date): DateList[] {
  return calendar.map((item) => ({
    ...item,
    calendar: item.calendar.map((week) =>
      week.map((_day) => ({
        ..._day,
        selected: false,
        minRange: isSameDay(_day.date, day)
      }))
    )
  }));
}

export function setMaxRange(calendar: DateList[], day: Date): DateList[] {
  return calendar.map((item) => ({
    ...item,
    calendar: item.calendar.map((week) =>
      week.map((_day) => ({
        ..._day,
        selected: false,
        maxRange: isSameDay(_day.date, day)
      }))
    )
  }));
}

export function updateRange(
  calendar: DateList[],
  minRange: Date,
  maxRange: Date
): DateList[] {
  return !isNullOrUndefined(minRange) && !isNullOrUndefined(maxRange)
    ? calendar.map((item) => ({
        ...item,
        calendar: item.calendar.map((week) =>
          week.map((_day) => ({
            ..._day,
            selected: false,
            inRange:
              isAfter(_day.date, minRange) && isBefore(_day.date, maxRange),
            inRangeRight: isSameDay(_day.date, minRange),
            inRangeLeft: isSameDay(_day.date, maxRange)
          }))
        )
      }))
    : calendar;
}

export function cleanAndSetMinRange(
  calendar: DateList[],
  minRange: Date
): DateList[] {
  return !isNullOrUndefined(minRange)
    ? calendar.map((item) => ({
        ...item,
        calendar: item.calendar.map((week) =>
          week.map((_day) => ({
            ..._day,
            selected: false,
            inRange: false,
            inRangeRight: false,
            inRangeLeft: false,
            maxRange: false,
            minRange: isSameDay(_day.date, minRange)
          }))
        )
      }))
    : calendar;
}

export function reset(calendar: DateList[]): DateList[] {
  return calendar.map((item) => ({
    ...item,
    calendar: item.calendar.map((week) =>
      week.map((_day) => ({
        ..._day,
        selected: false,
        inRange: false,
        inRangeRight: false,
        inRangeLeft: false,
        maxRange: false,
        minRange: false
      }))
    )
  }));
}

export function turnOffFieldRange(
  calendar: DateList[],
  field: string
): DateList[] {
  return calendar.map((item) => ({
    ...item,
    calendar: item.calendar.map((week) =>
      week.map((_day) => ({
        ..._day,
        [field]: false,
        inRange: false,
        inRangeRight: false,
        inRangeLeft: false
      }))
    )
  }));
}

export function createCalendar(
  date: Date = new Date(),
  monthsBackward: number = 0,
  monthsForward: number = 12,
  weekStartsOn: WeekStartsOn = 0
): DateList[] {
  return Array.from({ length: monthsBackward + monthsForward + 1 }).map(
    (item, index) => {
      const nextDate: Date =
        index <= monthsBackward
          ? subMonths(date, Math.abs(index - monthsBackward))
          : addMonths(date, Math.abs(index - monthsBackward));
      const month = getMonth(nextDate);
      const year = getYear(nextDate);
      return {
        year,
        isNextYear: getYear(date) !== year,
        month: MONTHS[month],
        labels: getLabelsMatrix(weekStartsOn),
        calendar: getMonthMatrix({ month, year, weekStartsOn })
      };
    }
  );
}
