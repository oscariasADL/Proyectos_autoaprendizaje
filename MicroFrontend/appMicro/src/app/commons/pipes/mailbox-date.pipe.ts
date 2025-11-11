import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { SOCIAL_SECURITY_MONTH_LIST } from '@modules/payments/payment-social-security/constants/social-security-date.constants';
import { getDate, getMonth, getYear, parseISO } from 'date-fns';

@Pipe({
  name: 'mailboxDate'
})
export class MailboxDatePipe implements PipeTransform {
  transform(date: string, full: boolean = false): string {
    if (isNullOrUndefinedOrEmpty(date)) {
      return date;
    }

    const formatDate = parseISO(date);
    const day = getDate(formatDate);
    const abbreviatedMonth = SOCIAL_SECURITY_MONTH_LIST[
      getMonth(formatDate)
    ].slice(0, 3);
    const year = full ? `/${getYear(formatDate)}` : '';

    return `${day}/${abbreviatedMonth}${year}`;
  }
}
