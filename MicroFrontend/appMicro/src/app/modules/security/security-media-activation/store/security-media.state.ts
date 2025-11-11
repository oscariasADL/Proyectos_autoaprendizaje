import {
  ActivationProduct,
  MediaActivationType,
  SuspiciousTransaction
} from '../entities/security-media.interface';

export const featureName = 'securityMediaModule';

export enum ActivateProductSteps {
  from,
  password,
  activateProduct,
  block,
  unlockInfo,
  unlockProduct,
  unblockProduct,
  blockTemporary,
  sendBlockTemporary,
  sendBlockProduct,
  success,
  error
}

export enum OperationType {
  PC = 'PC',
  ASP = 'ASP'
}

export interface SecurityState {
  products: ActivationProduct[];
  productsToActivate: ActivationProduct[];
  productsOtherProducts: ActivationProduct[];
  working: boolean;
  completed: boolean;
  message: string;
  step: ActivateProductSteps;
  mediaType: MediaActivationType;
  suspiciousTransaction: SuspiciousTransactionState;
}

export interface MediaStepsData {
  step: ActivateProductSteps;
  data?: any;
}

export interface SuspiciousTransactionState {
  data: SuspiciousTransaction;
  working: boolean;
  completed: boolean;
  message: string;
}

export const initialSecurityState: SecurityState = {
  products: null,
  productsToActivate: null,
  productsOtherProducts: null,
  working: false,
  completed: false,
  message: '',
  step: ActivateProductSteps.from,
  mediaType: null,
  suspiciousTransaction: {
    data: null,
    working: false,
    completed: false,
    message: ''
  }
};
