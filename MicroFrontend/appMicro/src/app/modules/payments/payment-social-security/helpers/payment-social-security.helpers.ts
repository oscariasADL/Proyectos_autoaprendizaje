import { SearchBillReferencePayload } from '@modules/payments/payment-services/entities/register-service.interface';
import {
  Contributor,
  SocialSecurityPinPayload
} from '@modules/payments/payment-social-security/entities/social-security.interface';
import { getMonth, getYear, parseISO } from 'date-fns';

const REFERENCE_TYPE = 'PERIODO';

export function mapSocialSecurityPinPayload(
  formValue: any
): SocialSecurityPinPayload {
  const contributor: Contributor = formValue.contributor;
  const worksheetOperator: string = formValue.worksheet.value;
  const worksheetDate: Date = parseISO(formValue.worksheetDate);

  return {
    identificationData: {
      idType: contributor.documentType,
      id: contributor.documentId
    },
    agreementId: worksheetOperator,
    referenceId: `${getYear(worksheetDate)}${(getMonth(worksheetDate) + 1)
      .toString()
      .pad('0', 2)}`,
    referenceType: REFERENCE_TYPE
  };
}

export function mapSocialSecurityReferencePayload(
  formValue: any
): SearchBillReferencePayload {
  const worksheetNumber: string = formValue.worksheetNumber;
  const worksheetOperator: string = formValue.worksheet.value;

  return {
    nie: worksheetNumber,
    orgIdNum: worksheetOperator
  };
}
