import { TrustRelationItem } from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';

export const trustRelationFeatureName = 'trustRelationModuleState';

export type TrustRelationState = Readonly<{
  data: TrustRelationItem[];
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialTrustRelationState: TrustRelationState = {
  data: null,
  working: false,
  completed: false,
  message: ''
};
