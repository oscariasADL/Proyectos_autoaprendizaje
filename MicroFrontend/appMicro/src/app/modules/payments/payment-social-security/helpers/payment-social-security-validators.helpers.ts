import { UntypedFormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { PaymentSocialSecurityWorksheetType } from '@modules/payments/payment-social-security/entities/social-security.interface';

const SOCIAL_SECURITY_WORKSHEET_NUMBER_MAX_LENGTH = 18;

export function socialSecurityWorksheetActiveTypeValidators(
  control: UntypedFormControl
): { [key: string]: boolean } {
  const worksheetActiveType: PaymentSocialSecurityWorksheetType = control.value;
  const formGroup = this.form;
  if (
    !isNullOrUndefined(formGroup) &&
    !isNullOrUndefined(worksheetActiveType)
  ) {
    switch (worksheetActiveType) {
      case PaymentSocialSecurityWorksheetType.hasWorksheet:
        formGroup
          .get('worksheetNumber')
          .setValidators([
            Validators.required,
            Validators.maxLength(SOCIAL_SECURITY_WORKSHEET_NUMBER_MAX_LENGTH)
          ]);
        formGroup.get('worksheetDate').setValidators([]);
        break;

      case PaymentSocialSecurityWorksheetType.notWorksheet:
        formGroup.get('worksheetNumber').setValidators([]);
        formGroup.get('worksheetDate').setValidators([Validators.required]);
        break;

      default:
        formGroup.get('worksheetNumber').setValidators([]);
        formGroup.get('worksheetDate').setValidators([]);
    }

    formGroup.get('worksheetNumber').updateValueAndValidity();
    formGroup.get('worksheetDate').updateValueAndValidity();
  }
  return null;
}
