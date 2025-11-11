import { UntypedFormControl } from '@angular/forms';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD } from '@modules/transfiya-management/constants/transfiya-management.constants';

export function transfiyaManagementProductValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const productSelected: Product = control.value;
  const formGroup = this.form;

  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(productSelected)) {
    const isDispatch: boolean = formGroup.controls.isDispatch.value;
    const notification: TransfiyaAuthorizationItem =
      formGroup.controls.notification.value;

    if (
      !isNullOrUndefined(productSelected) &&
      !isNullOrUndefined(notification) &&
      isDispatch &&
      productSelected[TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD] <
        notification.amount
    ) {
      return { transferValueToSendNotFunds: true };
    }
  }
  return null;
}
