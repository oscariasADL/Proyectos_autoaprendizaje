export const taxFeatureName = 'taxModuleState';
export type TaxState = Readonly<{
  downloadFileYear: number;
  working: boolean;
  completed: boolean;
}>;
export const initialTaxState: TaxState = {
  downloadFileYear: 0,
  working: false,
  completed: true
};
