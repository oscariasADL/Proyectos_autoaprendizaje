import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Pocket } from '@modules/pockets/entities/pockets.interface';

export function pocketTransferAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const pocket: Pocket = formGroup.get('pocket').value;

    if (!isNullOrUndefined(pocket) && pocket.amountSaved < 1) {
      return { pocketsTransferValueToTransferInsufficientFunds: true };
    }

    if (value < this.facade.boundsByKey(ParameterKey.pocketTransferMin)) {
      return {
        pocketsTransferValueToTransferMin: this.facade.boundsValue(
          ParameterKey.pocketTransferMin
        )
      };
    }

    if (!isNullOrUndefined(pocket) && value > pocket.amountSaved) {
      return { pocketsTransferValueToTransferMax: true };
    }
  }
  return null;
}
