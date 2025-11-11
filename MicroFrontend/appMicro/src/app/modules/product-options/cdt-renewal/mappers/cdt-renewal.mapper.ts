import { isNullOrUndefined, sanitizeDate } from '@commons/helpers/text.helpers';
import { CdtRenewalResponse } from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import { isAfter, isSameDay, parseISO } from 'date-fns';

export function mapShowCdtRenewal(
  cdtInfo: CdtRenewalResponse,
  currentDate: string
): boolean {
  if (isNullOrUndefined(cdtInfo)) {
    return false;
  }

  const _expDate = new Date(sanitizeDate(cdtInfo?.expDate));
  const _currentDate = parseISO(currentDate);

  return isSameDay(_expDate, _currentDate) || isAfter(_expDate, _currentDate);
}

export function mapDisabledCdtRenewalSelector(
  cdtInfo: CdtRenewalResponse,
  currentDate: string
): boolean {
  if (isNullOrUndefined(cdtInfo)) {
    return false;
  }

  const _expDate = new Date(sanitizeDate(cdtInfo?.expDate));
  const _currentDate = parseISO(currentDate);

  return isSameDay(_expDate, _currentDate);
}
