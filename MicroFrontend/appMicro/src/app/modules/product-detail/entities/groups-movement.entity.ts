import { Movement } from '@commons/entities/product/movement.interface';

export interface GroupedMovements {
  date: string;
  movements: Movement[];
}
