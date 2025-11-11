import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

export function paymentServicesCreateSchedulingValidators(
  control: FormControl
): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  if (
    value <
    this.facade.boundsByKey(ParameterKey.paymentServiceScheduleAmountMin)
  ) {
    return {
      paymentServicesScheduleAmountMin: this.facade.boundsValue(
        ParameterKey.paymentServiceScheduleAmountMin
      )
    };
  }

  if (
    value %
      this.facade.boundsByKey(
        ParameterKey.paymentServiceScheduleAmountMultiple
      ) !==
    0
  ) {
    return {
      paymentServicesScheduleAmountMultiple: this.facade.boundsValue(
        ParameterKey.paymentServiceScheduleAmountMultiple
      )
    };
  }
  return null;
}
