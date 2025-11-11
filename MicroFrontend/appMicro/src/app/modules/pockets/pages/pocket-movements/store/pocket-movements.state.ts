import { PocketMovement } from '@app/commons/entities/product/movement.interface';

export const pocketMovementsFeatureName = 'pocketMovementsModuleState';

export type PocketMovementsState = Readonly<{
  movements: PocketMovement[];
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialPocketMovementsState: PocketMovementsState = {
  movements: [],
  working: false,
  completed: false,
  message: null
};
