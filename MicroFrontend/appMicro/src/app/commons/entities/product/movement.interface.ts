import { MovementType } from '@app/modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

export interface Movement {
  category: string;
  date: Date;
  description: string;
  icon: string;
  instalmentsPaid: string;
  numberProduct: string;
  rate: string;
  state: FilterMove;
  totalInstalments: string;
  typeAccount: TypeAccount;
  typeName: string;
  valueMove: string;
  invoiceNumber: string;
  note: string;
  hasAddenda?: boolean;
  rightIcon?: boolean;
  currency?: string;
}

export enum FilterMove {
  All = '-1',
  Down = '0' /*Entro dinero*/,
  Up = '1' /*Salio dinero*/
}

export interface PocketMovement {
  amount: string;
  date: string;
  description: string;
  type: MovementType;
}
