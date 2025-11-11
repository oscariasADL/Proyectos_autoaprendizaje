export const pocketWithReturnsFeatureName = 'pocketWithReturnsState';

export type PocketWithReturnsState = Readonly<{
  openAmount: number;
  goal: number;
  quota: number;
  name: string;
  productIdParent: string;
  productNumberParent: string;
  productTypeParent: string;
  pocketCategory: string;
  pocketType: string;
  dayRecord: string;
  renewAutomatically: boolean;
  renewProfits: boolean;
  period: string;
  pocketWithReturnsWorking: boolean;
  pocketWithReturnsCompleted: boolean;
}>;

export const initialPocketWithReturnsState: PocketWithReturnsState = {
  openAmount: 0,
  goal: 0,
  quota: 0,
  name: '',
  productIdParent: '',
  productNumberParent: '',
  productTypeParent: '',
  pocketCategory: '',
  pocketType: '',
  dayRecord: '',
  renewAutomatically: false,
  renewProfits: false,
  period: '',
  pocketWithReturnsWorking: false,
  pocketWithReturnsCompleted: false
};
