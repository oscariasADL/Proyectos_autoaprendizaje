import { PocketMovement } from '@app/commons/entities/product/movement.interface';

export enum MovementType {
  INCOME = 'D',
  EXPENSE = 'C'
}

export interface PocketMovementPayload {
  parentIdRelative: string;
  pocketId: string;
  startDate: string;
  endDate: string;
}

export interface PocketMovementResponse {
  movementList: PocketMovement[];
}
