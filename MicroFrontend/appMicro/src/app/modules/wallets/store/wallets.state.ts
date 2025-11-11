import {
  CardDetail,
  DigitalCardStructureExt
} from '@modules/wallets/entities/wallets.interface';

export const walletsFeatureName = 'walletsModuleState';

export type WalletsState = Readonly<{
  cardList: CardDetail[];
  walletCardList: DigitalCardStructureExt[];
  walletId: string;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialWalletsState: WalletsState = {
  cardList: [],
  walletCardList: [],
  walletId: null,
  working: false,
  completed: false,
  message: ''
};
