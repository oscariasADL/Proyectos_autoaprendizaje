import {
  FilterMove,
  MovementFilter
} from '@modules/movement/entities/movements-detail-payload.entity';

export const POCKET_MOVEMENTS_FILTERS: MovementFilter[] = [
  {
    label: 'MOVEMENTS.FILTERS.ALL',
    filter: FilterMove.All,
    id: 'all-pocket-movements'
  },
  {
    label: 'MOVEMENTS.FILTERS.UP',
    filter: FilterMove.Up,
    id: 'outgoing-money-pocket-movements'
  },
  {
    label: 'MOVEMENTS.FILTERS.DOWN',
    filter: FilterMove.Down,
    id: 'incoming-money-pocket-movements'
  }
];

export const POCKETS_MONTHS_BACKWARD = 3;
