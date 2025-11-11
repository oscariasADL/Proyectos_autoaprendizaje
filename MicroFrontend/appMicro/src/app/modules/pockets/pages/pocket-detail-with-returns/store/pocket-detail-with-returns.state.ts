import { TypeAccount } from '@app/commons/entities/product/type-account';
import {
  Pocket,
  PocketCategory,
  PocketStatus,
  PocketTypeEnum,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';

export const pocketDetailWithReturnsFeatureName =
  'pocketDetailWithReturnsModuleState';

export type PocketDetailWithReturnsState = Readonly<{
  pocket: PocketWithReturns;
  working: boolean;
  completed: boolean;
  message: string;
  movements: PocketMovement[];
  workingMovements: boolean;
  completedMovements: boolean;
  messageMovements: string;
}>;

const initialPocketDetail: PocketWithReturns = {
  daysDue: false,
  id: '',
  pocketType: PocketTypeEnum.TraditionalPocket,
  type: '',
  typeName: '',
  numberProduct: '',
  description: '',
  pocketCategory: PocketCategory.EDUCATION,
  progress: '',
  startDate: '',
  goal: 0,
  timeElapsed: '',
  targetDate: '',
  amountSaved: 0,
  period: '',
  status: PocketStatus.ACTIVE,
  instalmentAmount: 0,
  totalInstalments: '',
  productTypeParent: TypeAccount.SDA,
  productTypeParentDesc: '',
  productNumberParent: '',
  productIdParent: '',
  elapsedDays: 0,
  elapsedMonths: 0,
  remainingInstalments: 0,
  dayId: '',
  renewAutomatically: false,
  statusClass: '',
  nickname: '',
  statusName: '',
  renewProfits: false,
  liquidationMethod: '',
  renewDate: '',
  endDate: '',
  accruedInterest: 0,
  termOfPermanenceInDays: 0
};
export const initialPocketDetailWithReturnsState: PocketDetailWithReturnsState =
  {
    pocket: initialPocketDetail,
    working: false,
    completed: false,
    message: '',
    movements: [],
    workingMovements: false,
    completedMovements: false,
    messageMovements: ''
  };
