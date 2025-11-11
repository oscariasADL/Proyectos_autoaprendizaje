import { Movement } from '@commons/entities/product/movement.interface';

export interface MovementsDetailPayloadParams {
  page?: number;
  pageSize?: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
  refreshMovements?: boolean;
  state?: FilterMove;
}

export interface MovementsDetailResponse {
  results: Movement[];
  totalResults?: number;
}

export interface MovementsDetailPayload {
  id: string;
  params: MovementsDetailPayloadParams;
}

export interface MovementFilter {
  label: string;
  filter: FilterMove;
  id: string;
}

export interface MovementsByDate {
  date: Date;
  movements: Movement[];
}

export enum FilterMove {
  All = '-1',
  Down = '0', // Positive money
  Up = '1' // Negative money
}
