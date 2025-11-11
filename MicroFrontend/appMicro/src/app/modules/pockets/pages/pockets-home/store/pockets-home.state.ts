import { PocketsComplete } from '@modules/pockets/entities/pockets.interface';

export const pocketsHomeFeatureName = 'pocketsModuleState';

export type PocketsHomeState = Readonly<{
  pockets: PocketsComplete;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialPocketsHomeState: PocketsHomeState = {
  pockets: null,
  working: false,
  completed: false,
  message: ''
};
