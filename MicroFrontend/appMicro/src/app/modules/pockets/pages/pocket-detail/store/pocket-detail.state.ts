import { Pocket } from '@modules/pockets/entities/pockets.interface';

export const pocketDetailFeatureName = 'pocketDetailModuleState';

export type PocketDetailState = Readonly<{
  pocket: Pocket;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialPocketDetailState: PocketDetailState = {
  pocket: null,
  working: false,
  completed: false,
  message: ''
};
