import { CdtRenewalResponse } from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';

export const cdtRenewalFeatureName = 'cdtRenewalModuleState';

export type CdtRenewalState = Readonly<{
  detail: CdtRenewalResponse;
  working: boolean;
  completed: boolean;
}>;

export const initialCdtRenewalState: CdtRenewalState = {
  detail: null,
  working: false,
  completed: false
};
