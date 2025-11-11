import { TypeAccount } from '@app/commons/entities/product/type-account';

export interface ProductSpiUserKey {
  numberProduct: string;
  accountId: string;
  accountType: TypeAccount;
  keyId: string;
  keyType: SpiKeyType;
  preferredIndicator: string;
  statusDesc: string;
  effDt: string;
  statusDirectory: StatusDirectory;
}
export enum StatusDirectory {
  DICE = 'DICE',
  DIRAVAL = 'DIRAVAL',
  DIFE = 'DIFE'
}
export enum SpiKeyType {
  IdentityDocument = '1', //  Documento de identidad
  PhoneNumber = '2', // Número de celular
  EmailAddress = '3', // Correo electrónico
  AlphanumericIdentifier = '4', // Identificador alfanumérico
  CreditInstitutionCode = '5' //Código asignado al establecimiento de crédito
}

export const priorityOrder: Record<SpiKeyType, number> = {
  [SpiKeyType.AlphanumericIdentifier]: 0,
  [SpiKeyType.PhoneNumber]: 1,
  [SpiKeyType.IdentityDocument]: 2,
  [SpiKeyType.EmailAddress]: 3,
  [SpiKeyType.CreditInstitutionCode]: 4
};

export interface Tag {
  type: SpiKeyType;
  value: string;
}
