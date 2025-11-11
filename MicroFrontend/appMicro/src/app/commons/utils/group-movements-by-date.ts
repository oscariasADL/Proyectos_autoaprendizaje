import { GroupedMovements } from '@modules/product-detail/entities/groups-movement.entity';
import {
  Movement,
  PocketMovement
} from '@commons/entities/product/movement.interface';
import { parseISO } from 'date-fns';
import { formatMovementDate } from './date-formatter';

export function groupMovementsByDate(
  movements: Movement[] | PocketMovement[]
): GroupedMovements[] {
  const grouped: { [key: string]: Movement[] } = {};

  movements.forEach((movement) => {
    const date = movement.date.toString().slice(0, 10);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(movement);
  });

  return Object.keys(grouped).map((date) => ({
    date: formatMovementDate(parseISO(date)),
    movements: grouped[date]
  }));
}
