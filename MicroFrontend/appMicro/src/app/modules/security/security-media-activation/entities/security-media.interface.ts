import { TypeAccount } from '@commons/entities/product/type-account';
import { OperationType } from '@modules/security/security-media-activation/store/security-media.state';

export interface ActivationProduct {
  activationType: ProductTypeActivation;
  type: ProductType;
  id: string;
  parentType: TypeAccount;
  parentId: string;
  status: string;
  cardId: string;
  cardFranchise?: string;
  cardType?: string;
  name?: string;
  textInfo?: string;
  cardCover?: CardCoverType;
}

export interface SuspiciousTransaction {
  uncommonTransactions: [
    {
      amount: string;
      date: string;
      country: string;
      description: string;
    }
  ];
}

export enum CardCoverType {
  Digital = 'D',
  Physical = 'F'
}

export enum ProductTypeActivation {
  M = 'Manilla',
  D = 'Tarjeta de Débito',
  T = 'Tarjeta de Crédito', // Mastercard
  V = 'Tarjeta de Crédito', // Visa
  R = 'Master Debit'
}

export enum ProductType {
  C = 'Crédito',
  D = 'Débito'
}

export enum BlockTemporaryStep {
  ChooseDate = 'ChooseDate',
  Confirmation = 'Confirmation'
}

export enum ActivationStatusDescription {
  TO_ACTIVATE = 'POR ACTIVAR',
  ACTIVE = 'ACTIVA',
  PREVENTIVE_BLOCK = 'BLOQUEO_PREVENTIVO',
  TEMPORAL_BLOCK = 'BLOQUEO_TEMPORAL',
  LOST_OR_THEFT_BLOCK = 'BLOQUEO_PERDIDA_O_ROBO',
  BLOCKED = 'BLOQUEADA'
}

export enum ActivationStatusLabel {
  'POR_ACTIVAR' = 'Por Activar',
  'ACTIVA' = 'Activa',
  'BLOQUEO_PREVENTIVO' = 'Bloqueo preventivo',
  'BLOQUEO_TEMPORAL' = 'Bloqueo temporal',
  'BLOQUEO_PERDIDA_O_ROBO' = 'Bloqueo pérdida o robo',
  'BLOQUEADA' = 'Bloqueada'
}

export enum MediaActivationType {
  ActivateCard = 'ActivateCard',
  BlockCard = 'BlockCard',
  BlockTemporary = 'BlockTemporary',
  ConfigurePassword = 'ConfigurePassword',
  UnlockPreventive = 'UnlockPreventive',
  UnlockTemporary = 'UnlockTemporary',
  Unblock = 'Unblock'
}

export interface MediaActivationOptionItem {
  id: string;
  icon: string;
  label: string;
  type: MediaActivationType;
}

export interface MediaActivationData {
  title: string;
  description?: string;
  items?: string[];
  showTextWithLink?: boolean;
}

export interface ActivationPayloadRequest {
  id: string;
  pin: string;
  expirationDate?: string;
  cvc?: string;
  operationType?: OperationType;
}

export interface TemporaryBlockPayload {
  id: string;
  endDate: string;
}
