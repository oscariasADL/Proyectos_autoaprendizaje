import { InjectionToken } from '@angular/core';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';
import { ActionReducerMap } from '@ngrx/store';

export const genericStepperFeatureName = 'genericStepperState';

export const GENERIC_STEPPER_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<GenericStepperState>
>('Generic stepper State');

export type GenericStepperState = Readonly<{
  working: boolean;
  completed: boolean;
  gmf: GMFData;
}>;

export const initialGenericStepperState: GenericStepperState = {
  working: false,
  completed: false,
  gmf: null
};
