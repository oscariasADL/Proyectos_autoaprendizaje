import { UntypedFormControl } from '@angular/forms';
import { Product } from '@app/commons/entities/product/product.interface';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Pocket } from '@modules/pockets/entities/pockets.interface';

export function pocketEditNameValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: string = control.value;
  const formGroup = this.form;
  const name: string = !isNullOrUndefined(value) ? value.trim() : value;
  if (
    !isNullOrUndefined(formGroup) &&
    !isNullOrUndefined(value) &&
    !isNullOrUndefined(name)
  ) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+(\s*[a-zA-Z0-9]*)*[a-zA-Z0-9]+$/);
    const product: Product = formGroup.get('product').value;
    const currentPocket: Pocket = formGroup.get('pocket').value;

    const pocketNames: string[] = this.pockets$
      .currentValue()
      .filter(
        (pocket: Pocket) =>
          pocket.productIdParent.toString() === product.id.toString() &&
          pocket.description.toString().toUpperCase() !==
            currentPocket.description.toString().toUpperCase()
      )
      .map((pocket: Pocket) => pocket.description.toUpperCase());

    if (name.toLowerCase().includes('ñ')) {
      return { pocketsCreateNameNotValidChar: true };
    }

    if (!regExp.test(name)) {
      return { pocketsCreateNameNotValid: true };
    }

    if (
      name.length < this.facade.boundsByKey(ParameterKey.pocketNameMinLength)
    ) {
      return {
        pocketsCreateNameMin: this.facade.boundsValue(
          ParameterKey.pocketNameMinLength
        )
      };
    }

    if (
      name.length >
      this.facade.boundsByKey(ParameterKey.pocketNameMaxHighLength)
    ) {
      return {
        pocketsCreateNameMax15: this.facade.boundsValue(
          ParameterKey.pocketNameMaxHighLength
        )
      };
    }
    if (pocketNames.includes(name.toUpperCase())) {
      return { pocketsCreateNameExists: true };
    }
  }
  return null;
}

export function pocketEditGoalValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const pocket: Pocket = formGroup.get('pocket').value;
    if (value < this.facade.boundsByKey(ParameterKey.pocketGoalMin)) {
      return {
        pocketsCreateGoalMin: this.facade.boundsValue(
          ParameterKey.pocketGoalMin
        )
      };
    }

    if (value > this.facade.boundsByKey(ParameterKey.pocketGoalMax)) {
      return { pocketsCreateGoalMax: true };
    }

    if (!isNullOrUndefined(pocket) && value <= pocket.amountSaved) {
      return { pocketsCreateGoalAmount: true };
    }
    formGroup.get('quota').updateValueAndValidity();
  }
  return null;
}

export function pocketEditQuotaValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const goal: number = formGroup.get('goal').currencyValue();

    if (value < this.facade.boundsByKey(ParameterKey.pocketQuotaMin)) {
      return {
        pocketsCreateQuotaMin: this.facade.boundsValue(
          ParameterKey.pocketQuotaMin
        )
      };
    }

    if (value > this.facade.boundsByKey(ParameterKey.pocketQuotaMax)) {
      return { pocketsCreateQuotaMax: true };
    }

    if (!isNullOrUndefined(goal) && value > goal) {
      return { pocketsCreateQuotaVsGoal: true };
    }
  }
  return null;
}
