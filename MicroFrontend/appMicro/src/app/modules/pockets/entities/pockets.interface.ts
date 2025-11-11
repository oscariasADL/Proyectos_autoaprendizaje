import { TypeAccount } from '@commons/entities/product/type-account';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';

export interface PocketsComplete {
  pockets: Pocket[];
  totalActive: string;
  totalPaused: string;
  totalCompleted: string;
  totalBalance: string;
  profitabilityPockets: Pocket[];
  traditionalPockets: Pocket[];
}

export interface Pocket {
  amountSaved: number;
  description: string;
  elapsedDays: number;
  elapsedMonths: number;
  goal: number;
  instalmentAmount: number;
  nickname?: string;
  numberProduct: string;
  period: string;
  pocketCategory: number;
  pocketType: PocketTypeEnum;
  productIdParent: string;
  productNumberParent: string;
  productTypeParent: TypeAccount;
  productTypeParentDesc: string;
  progress: string;
  remainingInstalments: number;
  startDate: string;
  status: PocketStatus;
  statusClass?: string;
  statusName?: string;
  targetDate: string;
  timeElapsed: string;
  totalInstalments: string;
  type: string;
  typeName: string;
}

export interface PocketWithReturns extends Pocket {
  id: string;
  daysDue: boolean;
  renewAutomatically: boolean;
  statusClass: string;
  nickname: string;
  statusName: string;
  renewProfits: boolean;
  liquidationMethod: string;
  renewDate: string;
  endDate: string;
  dayId: string;
  accruedInterest: number;
  termOfPermanenceInDays: number;
}

export interface PocketCategoryData {
  icon: string;
  name: string;
}

export interface GroupedPockets {
  pocketType: PocketTypeEnum;
  pockets: Pocket[];
}

export interface PocketCreateVoucherProps {
  title: string;
  description: string;
  approvalId: string;
  voucherItems: VoucherItem[];
  noticeMessage: string;
}

export enum Periodicity {
  weekly = 1,
  biweekly = 2,
  monthly = 3
}

export const PERIODICITY = [
  {
    label: 'Semanal',
    value: Periodicity.weekly
  },
  {
    label: 'Quincenal',
    value: Periodicity.biweekly
  },
  {
    label: 'Mensual',
    value: Periodicity.monthly
  }
];

export const PERIODICITY_LABEL = {
  [Periodicity.weekly]: 'POCKETS.PERIOD.WEEKLY',
  [Periodicity.biweekly]: 'POCKETS.PERIOD.BIWEEKLY',
  [Periodicity.monthly]: 'POCKETS.PERIOD.MONTHLY'
};
export const PWR_PERIODICITY_LABEL = {
  [Periodicity.weekly]: 'POCKET_WITH_RETURNS.CONFIRMATION.PERIOD.WEEKLY',
  [Periodicity.biweekly]: 'POCKET_WITH_RETURNS.CONFIRMATION.PERIOD.BIWEEKLY',
  [Periodicity.monthly]: 'POCKET_WITH_RETURNS.CONFIRMATION.PERIOD.MONTHLY'
};

export const PERIODICITY_VALUE = {
  SEMANAL: Periodicity.weekly,
  QUINCENAL: Periodicity.biweekly,
  MENSUAL: Periodicity.monthly
};

export enum PocketTypeEnum {
  PocketWithReturns = 'R',
  TraditionalPocket = 'T'
}

export enum PocketCategory {
  SAVING = 1,
  HOLIDAYS_TRAVEL = 2,
  EDUCATION = 3,
  HOUSE_APARTMENT = 4,
  HEALTH = 5,
  GIFTS = 6,
  VEHICLES = 7,
  SPECIAL_DATES = 8,
  TAXES = 9,
  OTHER_EXPENSES = 10
}

export enum PocketStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  CANCELLED = 3,
  PAUSED = 4,
  COMPLETED = 5
}

export const POCKET_STATUS = {
  [PocketStatus.ACTIVE]: 'ACTIVE',
  [PocketStatus.INACTIVE]: 'INACTIVE',
  [PocketStatus.CANCELLED]: 'CANCELLED',
  [PocketStatus.PAUSED]: 'PAUSED',
  [PocketStatus.COMPLETED]: 'COMPLETED'
};

export const POCKET_STATUS_CLASS = {
  [PocketStatus.ACTIVE]: 'avv-alert-status-info',
  [PocketStatus.INACTIVE]: 'avv-alert-status-error',
  [PocketStatus.CANCELLED]: 'avv-alert-status-error',
  [PocketStatus.PAUSED]: 'avv-alert-status-warning',
  [PocketStatus.COMPLETED]: 'avv-alert-status-success'
};

export const POCKET_CATEGORY_NAME = {
  [PocketCategory.SAVING]: 'SAVING',
  [PocketCategory.HOLIDAYS_TRAVEL]: 'HOLIDAYS_TRAVEL',
  [PocketCategory.EDUCATION]: 'EDUCATION',
  [PocketCategory.HOUSE_APARTMENT]: 'HOUSE_APARTMENT',
  [PocketCategory.HEALTH]: 'HEALTH',
  [PocketCategory.GIFTS]: 'GIFTS',
  [PocketCategory.VEHICLES]: 'VEHICLES',
  [PocketCategory.SPECIAL_DATES]: 'SPECIAL_DATES',
  [PocketCategory.TAXES]: 'TAXES',
  [PocketCategory.OTHER_EXPENSES]: 'OTHER_EXPENSES'
};

export const POCKET_CATEGORY_ICON = {
  [PocketCategory.SAVING]: 'icon-mis_bolsillos',
  [PocketCategory.HOLIDAYS_TRAVEL]: 'icon-vacaciones_viajes',
  [PocketCategory.EDUCATION]: 'icon-educacion',
  [PocketCategory.HOUSE_APARTMENT]: 'icon-casa_apto',
  [PocketCategory.HEALTH]: 'icon-salud',
  [PocketCategory.GIFTS]: 'icon-regalos',
  [PocketCategory.VEHICLES]: 'icon-vehiculos',
  [PocketCategory.SPECIAL_DATES]: 'icon-fechas_especiales',
  [PocketCategory.TAXES]: 'icon-Impuestos',
  [PocketCategory.OTHER_EXPENSES]: 'icon-otros_gastos'
};

export const POCKETS_ALLOWED = [
  PocketStatus.ACTIVE,
  PocketStatus.PAUSED,
  PocketStatus.COMPLETED
];

export enum PocketsCategories {
  all = 'all',
  active = 'Activos',
  paused = 'Pausados',
  completed = 'Completados'
}

export enum PocketTypeFilter {
  all = 'all',
  traditional = 'T',
  profitability = 'R'
}

export const POCKET_CATEGORY_FILTER_LABEL = {
  [PocketsCategories.all]: 'POCKETS.HOME.FILTER.POCKET_CATEGORY.ALL',
  [PocketsCategories.active]: 'POCKETS.HOME.FILTER.POCKET_CATEGORY.ACTIVE',
  [PocketsCategories.paused]: 'POCKETS.HOME.FILTER.POCKET_CATEGORY.PAUSED',
  [PocketsCategories.completed]: 'POCKETS.HOME.FILTER.POCKET_CATEGORY.COMPLETED'
};

export const POCKET_TYPE_FILTER_LABEL = {
  [PocketTypeFilter.all]: 'POCKETS.HOME.FILTER.POCKET_TYPE.ALL',
  [PocketTypeFilter.traditional]: 'POCKETS.HOME.FILTER.POCKET_TYPE.TO_ORGANIZE',
  [PocketTypeFilter.profitability]:
    'POCKETS.HOME.FILTER.POCKET_TYPE.WITH_RETURNS'
};

export const POCKET_TYPE_LABEL = {
  [PocketTypeEnum.TraditionalPocket]: 'POCKETS.HOME.POCKETS_TYPE.TRADITIONAL',
  [PocketTypeEnum.PocketWithReturns]: 'POCKETS.HOME.POCKETS_TYPE.PROFITABILITY'
};
