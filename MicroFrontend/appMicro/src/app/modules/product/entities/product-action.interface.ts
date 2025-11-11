import { TypeDocument } from '@app/commons/entities/product/type-document';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export interface ProductAction {
  type: ProductActionType;
  label: string;
  icon: string;
  id: string;
  disabled?: boolean;
  featureFlagKey?: FeatureFlagsKey;
  denyDocumentTypes?: TypeDocument[];
  isNew?: boolean;
}

export enum ProductActionType {
  Pockets = 'Pockets',
  Transfer = 'Transfer',
  WithoutCard = 'WithoutCard',
  MoneyOrder = 'MoneyOrder',
  MobileRecharge = 'MobileRecharge',
  Payments = 'Payments',
  DebtPurchase = 'DebtPurchase',
  RealizeAdvance = 'RealizeAdvance',
  DirectedPayments = 'DirectedPayments',
  UpdateInstallments = 'UpdateInstallments',
  Security = 'Security',
  Documents = 'Documents',
  UseQuota = 'UseQuota',
  BlockCard = 'BlockCard',
  ConfigCards = 'ConfigCards',
  EditTDD = 'EditTDD',
  DeleteTDD = 'DeleteTDD',
  ReissueTDD = 'ReissueTDD',
  BlockAccount = 'BlockAccount',
  CancelAccount = 'CancelAccount',
  CancelTCV = 'CancelTCV',
  ReissueTCV = 'ReissueTCV',
  EditTCV = 'EditTCV',
  ApplePay = 'ApplePay',
  GooglePay = 'GooglePay',
  Remittances = 'Remittances'
}

export const PRODUCT_ACTIONS = {
  [ProductActionType.Remittances]: {
    label: 'Recibe remesas',
    icon: 'illustrationsV2/menu-bolsa-de-dinero-small.svg',
    type: ProductActionType.Remittances,
    id: 'recieve-remittances',
    featureFlagKey: FeatureFlagsKey.Remittances,
    denyDocumentTypes: [TypeDocument.CE, TypeDocument.TI],
    isNew: true
  },
  [ProductActionType.Pockets]: {
    label: 'Bolsillos',
    icon: 'illustrationsV2/bolsillo-dinero-small.svg',
    type: ProductActionType.Pockets,
    id: 'admin-pockets-action',
    featureFlagKey: FeatureFlagsKey.Pockets
  },
  [ProductActionType.Transfer]: {
    label: 'Transferir',
    icon: 'illustrationsV2/transferencia-small.svg',
    type: ProductActionType.Transfer,
    id: 'transfer-action'
  },
  [ProductActionType.WithoutCard]: {
    label: 'Retiro sin tarjeta',
    icon: 'illustrationsV2/retiro-dinero-small.svg',
    type: ProductActionType.WithoutCard,
    id: 'withdraw-money-without-card-action',
    featureFlagKey: FeatureFlagsKey.CashWithdrawal
  },
  [ProductActionType.MoneyOrder]: {
    label: 'Giros',
    icon: 'illustrationsV2/transferencia-terceros-small.svg',
    type: ProductActionType.MoneyOrder,
    id: 'order-money-action',
    featureFlagKey: FeatureFlagsKey.Withdraw
  },
  [ProductActionType.MobileRecharge]: {
    label: 'Recargas a celular',
    icon: 'illustrationsV2/celular-dinero-small.svg',
    type: ProductActionType.MobileRecharge,
    id: 'mobile-recharge-action',
    featureFlagKey: FeatureFlagsKey.Recharges
  },
  [ProductActionType.Payments]: {
    label: 'Pagos',
    icon: 'illustrationsV2/pagar-small.svg',
    type: ProductActionType.Payments,
    id: 'payments-action'
  },
  [ProductActionType.DebtPurchase]: {
    label: 'Compra de cartera',
    icon: 'illustrationsV2/billetera-small.svg',
    type: ProductActionType.DebtPurchase,
    id: 'debt-purchase-action',
    featureFlagKey: FeatureFlagsKey.DebitPurchase
  },
  [ProductActionType.RealizeAdvance]: {
    label: 'Realizar avance',
    icon: 'illustrationsV2/menu-bolsa-de-dinero-small.svg',
    type: ProductActionType.RealizeAdvance,
    id: 'realize-advance-action',
    featureFlagKey: FeatureFlagsKey.CardAdvance
  },
  [ProductActionType.DirectedPayments]: {
    label: 'Pagos dirigidos desde cuentas AV Villas',
    icon: 'illustrationsV2/celular-dinero-small.svg',
    type: ProductActionType.DirectedPayments,
    id: 'direct-payments-action',
    featureFlagKey: FeatureFlagsKey.DirectedPayments
  },
  [ProductActionType.UpdateInstallments]: {
    label: 'Modificar cuotas',
    icon: 'illustrationsV2/configurar-tarjeta-regular.svg',
    type: ProductActionType.UpdateInstallments,
    id: 'update-installments-action',
    featureFlagKey: FeatureFlagsKey.UpdateInstallments
  },
  [ProductActionType.Security]: {
    label: 'Seguridad',
    icon: 'illustrationsV2/tarjeta-candado-small.svg',
    type: ProductActionType.Security,
    id: 'security-action',
    featureFlagKey: FeatureFlagsKey.Security
  },
  [ProductActionType.Documents]: {
    label: 'Extractos y Certificados',
    icon: 'illustrationsV2/descargar-documento-small.svg',
    type: ProductActionType.Documents,
    id: 'download-documents-action',
    featureFlagKey: FeatureFlagsKey.ExtractsAndDocuments
  },
  [ProductActionType.UseQuota]: {
    label: 'Utilizar cupo',
    icon: 'illustrationsV2/bolsillo-de-dinero-small.svg',
    type: ProductActionType.UseQuota,
    id: 'use-quota-action',
    featureFlagKey: FeatureFlagsKey.UseQuota
  },
  [ProductActionType.BlockCard]: {
    label: 'Bloquear por perdida o robo',
    icon: 'illustrationsV2/tarjeta-candado-small.svg',
    type: ProductActionType.BlockCard,
    id: 'block-card'
  },
  [ProductActionType.ConfigCards]: {
    label: 'Configurar tarjetas',
    icon: 'illustrationsV2/configurar-tarjeta-regular.svg',
    type: ProductActionType.ConfigCards,
    id: 'config-card',
    featureFlagKey: FeatureFlagsKey.SecurityMediaActivation
  },
  [ProductActionType.EditTDD]: {
    label: 'Editar tarjeta',
    icon: 'illustrationsV2/listado-small.svg',
    type: ProductActionType.EditTDD,
    id: 'tdd-edit-card'
  },
  [ProductActionType.DeleteTDD]: {
    label: 'Eliminar tarjeta',
    icon: 'illustrationsV2/eliminar-small.svg',
    type: ProductActionType.DeleteTDD,
    id: 'tdd-cancel-card'
  },
  [ProductActionType.ReissueTDD]: {
    label: 'Reexpedir tarjeta',
    icon: 'illustrationsV2/tarjeta-dinero-small.svg',
    type: ProductActionType.ReissueTDD,
    id: 'tdd-reissue-card'
  },
  [ProductActionType.BlockAccount]: {
    label: 'Bloquear cuenta',
    icon: 'illustrationsV2/tarjeta-candado-small.svg',
    type: ProductActionType.BlockAccount,
    id: 'block-account',
    featureFlagKey: FeatureFlagsKey.BlockAccount
  },
  [ProductActionType.CancelAccount]: {
    label: 'Cancelar cuenta',
    icon: 'illustrationsV2/dinero-error-small.svg',
    type: ProductActionType.CancelAccount,
    id: 'cancel-account',
    featureFlagKey: FeatureFlagsKey.CancelAccount
  },
  [ProductActionType.CancelTCV]: {
    label: 'Cancelar tarjeta',
    icon: 'illustrationsV2/eliminar-small.svg',
    type: ProductActionType.CancelTCV,
    id: 'tcv-cancel-card-option'
  },
  [ProductActionType.EditTCV]: {
    label: 'Editar tarjeta',
    icon: 'illustrationsV2/listado-small.svg',
    type: ProductActionType.EditTCV,
    id: 'tcv-edit-card-option'
  },
  [ProductActionType.ReissueTCV]: {
    label: 'Reexpedir tarjeta',
    icon: 'illustrationsV2/tarjeta-dinero-small.svg',
    type: ProductActionType.ReissueTCV,
    id: 'tcv-reissue-card-option'
  },
  [ProductActionType.ApplePay]: {
    label: 'Agregar a Apple Wallet',
    icon: 'wallets/apple-pay-logo.svg',
    type: ProductActionType.ApplePay,
    id: 'add-apple-wallet',
    featureFlagKey: FeatureFlagsKey.AppleWalletAccountOption
  }
};
