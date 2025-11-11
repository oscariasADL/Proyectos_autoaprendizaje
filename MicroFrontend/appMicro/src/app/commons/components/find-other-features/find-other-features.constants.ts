import { TypeAccount } from '@commons/entities/product/type-account';

export enum FindOtherFeaturesType {
  transfers = 'transfers',
  payments = 'payments'
}

export const FindOtherFeaturesProducts = {
  typeAccountProducts: [TypeAccount.CCA, TypeAccount.LOC]
};
