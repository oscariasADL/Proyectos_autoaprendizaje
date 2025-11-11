import { PocketTypeEnum } from '@app/modules/pockets/entities/pockets.interface';

export interface PocketDetailPayload {
  pocketId: string;
  pocketType: string;
  parentId: string;
  parentIdType: string;
}

export interface UpdatePocketWithReturnsPayload {
  id: string;
  name: string;
  goal: number;
  quota: number;
  pocketCategory: number;
  period: string;
  productIdParent: string;
  productTypeParent: string;
  renewAutomatically: boolean;
  renewProfits: boolean;
  pocketType: PocketTypeEnum;
  status: number;
  type: string;
}

export interface DeadLineTooltip {
  id: string;
  title: string;
  text: string;
}
