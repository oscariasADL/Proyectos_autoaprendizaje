import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function otpValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  if (!isNullOrUndefined(value)) {
    const otp = value.toString().replace(/null/g, '');
    if (otp.length !== this.facade.boundsByKey(ParameterKey.otpDefaultLength)) {
      return { text: true };
    }
  }
  return null;
}

export function authTermsValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  if (!isNullOrUndefined(value)) {
    if (!value) {
      return { notValid: true };
    }
  }
  return null;
}

export function authCurrentPasswordValidators(control: UntypedFormControl): {
  [key: string]: string;
} {
  const currentPassword: string = control.value;

  if (!isNullOrUndefined(currentPassword)) {
    const _currentPassword = currentPassword.toString().replace(/null/g, '');

    if (
      _currentPassword.length !==
      this.facade.boundsByKey(ParameterKey.passwordLength)
    ) {
      return { text: 'AUTH.VALIDATORS.PASSWORD_WRONG' };
    }
  }

  return null;
}

export function authNewPasswordValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const newPassword: string = control.value;
  if (
    !isNullOrUndefined(newPassword) &&
    !isNullOrUndefined(this.form) &&
    !isNullOrUndefined(this.confirmPassword)
  ) {
    this.confirmPassword.updateValueAndValidity();
  }
  return null;
}

export function authConfirmPasswordValidators(control: UntypedFormControl): {
  [key: string]: string;
} {
  const confirmPassword: string = control.value;

  if (!isNullOrUndefined(confirmPassword)) {
    const newPassword = this.newPassword.value;

    if (!isNullOrUndefined(newPassword)) {
      const _confirmPassword = confirmPassword.toString().replace(/null/g, '');
      const _newPassword = newPassword.toString().replace(/null/g, '');

      if (
        _confirmPassword.length ===
          this.facade.boundsByKey(ParameterKey.passwordLength) &&
        _newPassword.length ===
          this.facade.boundsByKey(ParameterKey.passwordLength)
      ) {
        const array = _confirmPassword.toString().split('');

        const repeat = array.reduce((count, item) => {
          count[item] = (count[item] || 0) + 1;
          return count;
        }, {});

        const hasRepeat = Object.keys(repeat).reduce(
          (beforeValue, _item) =>
            beforeValue ||
            repeat[_item] >
              this.facade.boundsByKey(ParameterKey.passwordMaxDigitRepeat),
          false
        );

        const hasConsecutive = array
          .map((item) => parseInt(item, 10))
          .reduce((beforeValue, _item) => {
            const lastSubArray = beforeValue[beforeValue.length - 1];
            if (
              !lastSubArray ||
              lastSubArray[lastSubArray.length - 1] !== _item - 1
            ) {
              beforeValue.push([]);
            }
            beforeValue[beforeValue.length - 1].push(_item);
            return beforeValue;
          }, [])
          .reduce(
            (beforeValue, _item) =>
              beforeValue ||
              _item.length >
                this.facade.boundsByKey(
                  ParameterKey.passwordMaxConsecutiveLength
                ),
            false
          );

        if (_confirmPassword !== _newPassword) {
          return { doNotMatch: 'AUTH.VALIDATORS.PASSWORD_NOT_MATCH' };
        }

        if (hasRepeat) {
          return { notRepeated: 'AUTH.VALIDATORS.PASSWORD_NOT_REPEAT' };
        }

        if (hasConsecutive) {
          return { notConsecutive: 'AUTH.VALIDATORS.PASSWORD_MAX' };
        }
      } else {
        return { doNotMatch: '' };
      }
    }
  }
  return null;
}
