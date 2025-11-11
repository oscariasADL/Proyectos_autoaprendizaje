import { FilterMove } from '@commons/entities/product/movement.interface';
import { MovementFilter } from '@modules/movement/entities/movements-detail-payload.entity';
import { TypeAccount } from '@commons/entities/product/type-account';

export const DEFAULT_MOVEMENTS_INIT_PAGE = 1;
export const DEFAULT_MOVEMENTS_PAGE_SIZE = 15;
export const DEFAULT_MOVEMENTS_FILTERS = {
  page: DEFAULT_MOVEMENTS_INIT_PAGE,
  pageSize: DEFAULT_MOVEMENTS_PAGE_SIZE,
  state: FilterMove.All,
  refreshMovements: true,
  currency: 'COP'
};
export const movementFilters = (accountType: TypeAccount): MovementFilter[] => [
  {
    label: 'MOVEMENTS.FILTERS.ALL',
    filter: FilterMove.All,
    id: 'all-movements'
  },
  {
    label:
      accountType === TypeAccount.CCA
        ? 'MOVEMENTS.FILTERS.CREDIT_CARD.PURCHASES'
        : 'MOVEMENTS.FILTERS.UP',
    filter: FilterMove.Up,
    id: 'outgoing-money-movements'
  },
  {
    label:
      accountType === TypeAccount.CCA
        ? 'MOVEMENTS.FILTERS.CREDIT_CARD.PAYMENTS'
        : 'MOVEMENTS.FILTERS.DOWN',
    filter: FilterMove.Down,
    id: 'incoming-money-movements'
  }
];
export const MONTH_LETTERS = {
  '01': 'JANUARY',
  '02': 'FEBRUARY',
  '03': 'MARCH',
  '04': 'APRIL',
  '05': 'MAY',
  '06': 'JUNE',
  '07': 'JULY',
  '08': 'AUGUST',
  '09': 'SEPTEMBER',
  '10': 'OCTOBER',
  '11': 'NOVEMBER',
  '12': 'DECEMBER'
};
