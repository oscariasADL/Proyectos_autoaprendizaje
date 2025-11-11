import { Adviser } from '../entities/adviser.interface';

export const carechannelsFeatureName = 'carechannelsState';

export interface CarechannelsState {
  adviser: Adviser;
  working: boolean;
  completed: boolean;
}

export const initialCarechannelsState: CarechannelsState = {
  adviser: null,
  working: false,
  completed: false
};
