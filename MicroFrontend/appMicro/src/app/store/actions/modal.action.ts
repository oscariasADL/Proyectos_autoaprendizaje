import { createAction, props } from '@ngrx/store';

import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import * as forgotPasswordActions from '@modules/auth/forgot-password/store/forgot-password.actions';
import * as loginActions from '@modules/auth/login/store/login.actions';
import * as registerActions from '@modules/auth/register/store/register.actions';
import * as silentEnrollmentActions from '@modules/auth/silent-enrollment/store/silent-enrollment.actions';
import * as updatePasswordActions from '@modules/auth/update-password/store/update-password.actions';
import * as contactAddProductActions from '@modules/contacts/pages/contact-add-product/store/contact-add-product.actions';
import * as digitalDebitCardActions from '@modules/digital-debit-card/store/digital-debit-card.actions';
import * as payLoanActions from '@modules/payments/payment-credits/store/payment-credits.actions';
import * as payBillActions from '@modules/payments/payment-services/store/payment-services.actions';
import * as socialSecurityActions from '@modules/payments/payment-social-security/store/payment-social-security.actions';
import * as paymentTaxesActions from '@modules/payments/payment-taxes/store/payment-taxes.action';
import * as pocketCreateActions from '@modules/pockets/pages/pocket-create/store/pocket-create.actions';
import * as pocketDeleteActions from '@modules/pockets/pages/pocket-delete/store/pocket-delete.actions';
import * as pocketEditActions from '@modules/pockets/pages/pocket-edit/store/pocket-edit.actions';
import * as pocketPayActions from '@modules/pockets/pages/pocket-pay/store/pocket-pay.actions';
import * as updatePocketStatusActions from '@modules/pockets/pages/pocket-status/store/pocket-status.actions';
import * as pocketTransferActions from '@modules/pockets/pages/pocket-transfer/store/pocket-transfer.actions';
import * as cardAdvanceActions from '@modules/product-options/card-advance/store/card-advance.actions';
import * as renewalCdtActions from '@modules/product-options/cdt-renewal/store/cdt-renewal.actions';
import * as creditMovements from '@modules/product-options/credit-movements/store/credit-movements.action';
import * as debitPurchaseActions from '@modules/product-options/debit-purchase/store/debit-purchase.actions';
import * as rechargeActions from '@modules/product-options/recharges/store/recharges.actions';
import * as useQuotaActions from '@modules/product-options/use-quota/store/use-quota.actions';
import * as payQRActions from '@modules/qr/pages/qr-pay/store/qr-pay.actions';
import * as securityBiometricActions from '@modules/security/security-biometrics/store/security-biometrics.actions';
import * as removeTrustRelationActions from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.actions';
import * as transferActions from '@modules/transfers/store/transfers.actions';
import * as withdrawActions from '@modules/withdraw/store/withdraw.actions';
import * as notifications from './notifications.action';
import * as cancelAccountActions from '@modules/product-options/cancel-account/store/cancel-account.actions';
import * as walletsActions from '@modules/wallets/store/wallets.actions';
import * as avalKeyActions from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.actions';
import * as securityMediaActions from '@modules/security/security-media-activation/store/security-media.action';
import * as virtualCreditCardActions from '@modules/virtual-credit-card/store/virtual-credit-card.actions';
import * as pocketWithReturnsEditActions from '@modules/pockets/pages/edit-pocket-with-returns/store/edit-pocket-with-returns.actions';
import * as pocketDetailWithReturnsActions from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.actions';
import * as createPocketWithReturnsActions from '@modules/pockets/pages/pocket-create-with-returns/store/create-pocket-with-returns.action';
import * as mailboxActions from '@app/store/actions/mailbox.action';
import * as breBTransfersActions from '@modules/transfers/pages/bre-b-transfers/store/bre-b-transfers.actions';

export const openModalAction = createAction(
  type('[Global/UI] Open modal'),
  props<{ props?: AlertSheetProperties }>()
);

export const closeModalAction = createAction(type('[Global/UI] Close modal'));

export const ModalObserverActionsTypes = [
  loginActions.loginUserErrorAction,
  registerActions.runRegisterErrorAction,
  forgotPasswordActions.runForgotPasswordErrorAction,
  cardAdvanceActions.cardAdvanceSuccessAction,
  cardAdvanceActions.cardAdvanceErrorAction,
  useQuotaActions.useQuotaSuccessAction,
  useQuotaActions.useQuotaErrorAction,
  rechargeActions.rechargeSuccessAction,
  rechargeActions.rechargeErrorAction,
  transferActions.transferSuccessAction,
  transferActions.transferErrorAction,
  withdrawActions.withdrawSuccessAction,
  withdrawActions.withdrawErrorAction,
  contactAddProductActions.contactAddProductSuccessAction,
  contactAddProductActions.contactAddProductErrorAction,
  pocketCreateActions.pocketCreateErrorAction,
  pocketEditActions.pocketEditErrorAction,
  pocketPayActions.pocketPayErrorAction,
  pocketTransferActions.pocketTransferErrorAction,
  pocketDeleteActions.pocketDeleteErrorAction,
  updatePocketStatusActions.updatePocketStatusErrorAction,
  payLoanActions.payLoanSuccessAction,
  payLoanActions.payLoanErrorAction,
  payBillActions.payBillSuccessAction,
  payBillActions.payBillErrorAction,
  creditMovements.directedPaymentSuccessAction,
  creditMovements.directedPaymentErrorAction,
  creditMovements.updateInstallmentsErrorAction,
  debitPurchaseActions.debitPurchaseSuccessAction,
  debitPurchaseActions.debitPurchaseErrorAction,
  payQRActions.payQRSuccessAction,
  payQRActions.payQRErrorAction,
  payQRActions.cancelQRSuccessAction,
  payQRActions.cancelQRErrorAction,
  securityBiometricActions.verifyPasswordErrorAction,
  notifications.acceptTransfiyaAuthorizationSuccessAction,
  notifications.acceptTransfiyaAuthorizationErrorAction,
  notifications.rejectTransfiyaAuthorizationErrorAction,
  paymentTaxesActions.makePaymentTaxesSuccess,
  paymentTaxesActions.makePaymentTaxesError,
  socialSecurityActions.paySocialSecuritySuccessAction,
  socialSecurityActions.paySocialSecurityErrorAction,
  updatePasswordActions.updatePasswordErrorAction,
  silentEnrollmentActions.runSilentEnrollmentErrorAction,
  renewalCdtActions.renewalCdtSuccessAction,
  renewalCdtActions.renewalCdtErrorAction,
  renewalCdtActions.cancelRenewalCdtSuccessAction,
  renewalCdtActions.cancelRenewalCdtErrorAction,
  removeTrustRelationActions.removeTrustRelationErrorAction,
  digitalDebitCardActions.createDigitalDebitCardErrorAction,
  digitalDebitCardActions.fetchDigitalDebitCardDetailErrorAction,
  digitalDebitCardActions.editDigitalDebitCardErrorAction,
  digitalDebitCardActions.cancelDigitalDebitCardErrorAction,
  digitalDebitCardActions.reissueDigitalDebitCardErrorAction,
  cancelAccountActions.cancelAccountSuccessAction,
  cancelAccountActions.cancelAccountErrorAction,
  payBillActions.createBillSchedulingSuccessAction,
  payBillActions.createBillSchedulingErrorAction,
  payBillActions.editBillSchedulingSuccessAction,
  payBillActions.editBillSchedulingErrorAction,
  payBillActions.deleteBillSchedulingSuccessAction,
  payBillActions.deleteBillSchedulingErrorAction,
  payBillActions.payBillsMultipleSuccessAction,
  payBillActions.payBillsMultipleErrorAction,
  walletsActions.validateAndPushCardErrorAction,
  avalKeyActions.fetchAccountAvalKeyErrorAction,
  securityMediaActions.temporaryBlockProductV2ErrorAction,
  securityMediaActions.unlockProductV2ErrorAction,
  virtualCreditCardActions.createVirtualCreditCardErrorAction,
  virtualCreditCardActions.cancelVirtualCreditCardErrorAction,
  virtualCreditCardActions.cancelVirtualCreditCardSuccessAction,
  virtualCreditCardActions.reissueVirtualCreditCardErrorAction,
  virtualCreditCardActions.editVirtualCreditCardErrorAction,
  pocketWithReturnsEditActions.pocketWithReturnsEditErrorAction,
  pocketDetailWithReturnsActions.updatePocketWithReturnsStatusErrorAction,
  pocketDetailWithReturnsActions.pocketWithReturnsDeleteErrorAction,
  createPocketWithReturnsActions.CreatePocketErrorAction,
  breBTransfersActions.transferSuccessAction,
  breBTransfersActions.transferErrorAction,
  breBTransfersActions.fetchAccountKeyErrorAction
];
