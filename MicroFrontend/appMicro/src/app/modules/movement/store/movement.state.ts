import { Movement } from '@commons/entities/product/movement.interface';
import {
  MovementsDetailPayload,
  MovementsDetailResponse
} from '@modules/movement/entities/movements-detail-payload.entity';

export const movementFeatureName = 'movementModuleState';

export type MovementsState = Readonly<{
  movements: Movement[];
  working: boolean;
  completed: boolean;
}>;

export type MovementsDetailState = Readonly<{
  payload: MovementsDetailPayload;
  response: MovementsDetailResponse;
  working: boolean;
  completed: boolean;
}>;

export type MovementsHistoryState = Readonly<{
  payload: MovementsDetailPayload;
  response: MovementsDetailResponse;
  working: boolean;
  completed: boolean;
  workingMore: boolean;
}>;

export type MovementState = Readonly<{
  movements: MovementsState;
  movementsDetail: MovementsDetailState;
  movementsHistory: MovementsHistoryState;
}>;

export const initialMovementState: MovementState = {
  movements: {
    movements: null,
    working: false,
    completed: false
  },
  movementsDetail: {
    payload: null,
    response: null,
    working: false,
    completed: false
  },
  movementsHistory: {
    payload: null,
    response: null,
    working: false,
    completed: false,
    workingMore: false
  }
};
