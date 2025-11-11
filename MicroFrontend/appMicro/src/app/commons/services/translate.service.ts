import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  isNullOrUndefined,
  valueToNumberFormat
} from '@commons/helpers/text.helpers';
import { ParameterType } from '@store/state/parameter.state';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private boundsCache: { [key: string]: string };

  constructor(private facade: AppFacade) {}

  get bounds(): { [key: string]: string } {
    if (isNullOrUndefined(this.boundsCache)) {
      const bounds =
        this.facade.parameterByKey(ParameterType.bounds).currentValue() || [];

      if (!isNullOrUndefined(bounds) && bounds.length > 0) {
        this.boundsCache = bounds.reduce(
          (beforeValue, currentValue) => ({
            ...beforeValue,
            [currentValue.label]: currentValue.label.includes('$')
              ? valueToNumberFormat(currentValue.value)
              : currentValue.value
          }),
          {}
        );
      }
    }

    return this.boundsCache || {};
  }
}
