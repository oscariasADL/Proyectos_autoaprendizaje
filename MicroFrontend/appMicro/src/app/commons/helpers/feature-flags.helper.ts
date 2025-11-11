import { addDays } from 'date-fns';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';

/**
 * @param dateRanges - A string of semicolon-separated date ranges. Example: 2023-03-04/2023-03-06;2023-03-07/2023-03-14z
 * @returns - Returns `true` if the given string is a valid date range, `false` otherwise.
 */
export function validateDateRange(
  dateRanges: string,
  date: Date = new Date()
): boolean {
  if (isNullOrUndefinedOrEmpty(dateRanges)) {
    return false;
  }
  const dateRangesArray = dateRanges.split(';');

  const inRange = dateRangesArray.some((range) => {
    const dateRange = range.split('/');

    if (dateRange.length !== 2) {
      return false;
    }

    const [startDate, endDate] = dateRange.map((dateValue) =>
      Date.parse(dateValue)
    );

    return (
      date.valueOf() >= startDate &&
      date.valueOf() <= addDays(endDate, 1).valueOf()
    );
  });

  return inRange;
}
