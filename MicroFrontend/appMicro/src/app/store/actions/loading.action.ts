import { LoadingProperties } from '@commons/entities/loading/loading.entities';
import { type } from '@commons/utils/util';
import * as authActions from '@modules/auth/login/store/login.actions';
import * as updatePasswordActions from '@modules/auth/update-password/store/update-password.actions';
import * as changePasswordActions from '@modules/change-password/store/change-password.actions';
import * as contactAddProductActions from '@modules/contacts/pages/contact-add-product/store/contact-add-product.actions';
import * as debitCardDetailActions from '@modules/digital-debit-card/store/digital-debit-card.actions';
import * as favoritesCommonActions from '@commons/components/favorites/store/favorites-common.action';
import * as favoritesHomeActions from '@modules/favorites/pages/favorites-home/store/favorites-home.actions';
import * as favoritesEditActions from '@modules/favorites/pages/favorites-edit/store/favorites-edit.actions';
import * as addFavoriteActions from '@app/modules/favorites/store/favorites.actions';
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
import * as complementaryServicesActions from '@modules/security/security-complementary-services/store/complementary-services.actions';
import * as securityMediaActions from '@modules/security/security-media-activation/store/security-media.action';
import * as securityNotificationsActions from '@modules/security/security-notifications/store/security-notifications.actions';
import * as removeTrustRelationActions from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.actions';
import * as transferActions from '@modules/transfers/store/transfers.actions';
import * as withdrawActions from '@modules/withdraw/store/withdraw.actions';
import { createAction, props } from '@ngrx/store';
import * as notifications from './notifications.action';
import * as pfmActions from '@modules/pfm/store/pfm.action';
import * as qrAuthorizationActions from '@modules/qr/pages/qr-authorization/store/qr-authorization.actions';
import * as cel2celActions from '@modules/transfers/pages/transfers-cel2cel-send/store/transfers-cel2cel-send.actions';
import * as blockAccountActions from '@modules/product-options/block-account/store/block-account.actions';
import * as cancelAccountActions from '@modules/product-options/cancel-account/store/cancel-account.actions';
import * as walletsActions from '@modules/wallets/store/wallets.actions';
import * as avalKeyActions from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.actions';
import * as defaultAccountActions from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.actions';
import * as virtualCreditCardActions from '@modules/virtual-credit-card/store/virtual-credit-card.actions';
import * as customizeAvalTagActions from '@modules/product-options/customize-aval-tag/store/customize-aval-tag.actions';
import * as pocketWithReturnsEditActions from '@modules/pockets/pages/edit-pocket-with-returns/store/edit-pocket-with-returns.actions';
import * as pocketDetailWithReturnsActions from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.actions';
import * as createPocketWithReturnsActions from '@modules/pockets/pages/pocket-create-with-returns/store/create-pocket-with-returns.action';
import * as pushNotificationRegisterActions from '@store/actions/push-notification-register.actions';
import * as breBTransfersActions from '@modules/transfers/pages/bre-b-transfers/store/bre-b-transfers.actions';

export const enableLoadingAction = createAction(
  type('[Loading] Enable Loading'),
  props<{ payload?: LoadingProperties }>()
);

export const disableLoadingAction = createAction(
  type('[Loading] Disable Loading')
);

export const EnableLoadingObserverActionsTypes = [
  authActions.loginUserAction,
  withdrawActions.withdrawAction,
  cardAdvanceActions.cardAdvanceAction,
  useQuotaActions.useQuotaAction,
  rechargeActions.rechargeAction,
  transferActions.transferAction,
  contactAddProductActions.contactAddProductAction,
  pocketCreateActions.pocketCreateAction,
  pocketEditActions.pocketEditAction,
  updatePocketStatusActions.updatePocketStatusAction,
  pocketTransferActions.pocketTransferAction,
  pocketDeleteActions.pocketDeleteAction,
  pocketPayActions.pocketPayAction,
  payLoanActions.payLoanAction,
  payBillActions.payBillAction,
  creditMovements.fetchCreditMovementsAction,
  creditMovements.directedPaymentAction,
  creditMovements.updateInstallmentsAction,
  debitPurchaseActions.debitPurchaseAction,
  payQRActions.payQRAction,
  payQRActions.payQRAccountAction,
  payQRActions.payQRSpiUserKeyAction,
  payQRActions.cancelQRAction,
  securityBiometricActions.verifyPasswordAction,
  notifications.acceptTransfiyaAuthorizationAction,
  notifications.rejectTransfiyaAuthorizationAction,
  changePasswordActions.changePasswordAction,
  paymentTaxesActions.makePaymentTaxes,
  socialSecurityActions.paySocialSecurityAction,
  socialSecurityActions.fetchSocialSecurityDataByPinAction,
  socialSecurityActions.fetchSocialSecurityDataByReferenceAction,
  securityMediaActions.activateProduct,
  securityMediaActions.blockProduct,
  securityMediaActions.temporaryBlockProduct,
  securityMediaActions.unlockProduct,
  updatePasswordActions.updatePasswordAction,
  complementaryServicesActions.toggleComplementaryServicesAction,
  securityNotificationsActions.toggleSecurityNotificationsAction,
  renewalCdtActions.renewalCdtAction,
  renewalCdtActions.cancelRenewalCdtAction,
  removeTrustRelationActions.removeTrustRelationAction,
  debitCardDetailActions.fetchDigitalDebitCardDetailAction,
  debitCardDetailActions.createDigitalDebitCardAction,
  debitCardDetailActions.editDigitalDebitCardAction,
  debitCardDetailActions.cancelDigitalDebitCardAction,
  debitCardDetailActions.reissueDigitalDebitCardAction,
  favoritesCommonActions.favoriteCreateAction,
  favoritesHomeActions.deleteFavoriteAction,
  favoritesEditActions.favoriteEditAction,
  addFavoriteActions.fetchTowardProductsByPhoneNumberAction,
  pfmActions.changeCategory,
  qrAuthorizationActions.scanningQr,
  cel2celActions.fetchTowardProductsByPhoneNumberAction,
  cancelAccountActions.cancelAccountAction,
  blockAccountActions.sendBlockAccountAction,
  payBillActions.createBillSchedulingAction,
  payBillActions.editBillSchedulingAction,
  payBillActions.deleteBillSchedulingAction,
  payBillActions.payBillsMultipleAction,
  walletsActions.fetchCardListAction,
  walletsActions.cardEnrollmentProcessAction,
  walletsActions.prepareCardsAction,
  walletsActions.validateAndPushCardAction,
  avalKeyActions.fetchAccountAvalKeyAction,
  defaultAccountActions.deleteDefaultAccountAction,
  virtualCreditCardActions.createVirtualCreditCardAction,
  virtualCreditCardActions.fetchVirtualCreditCardDetailAction,
  virtualCreditCardActions.cancelVirtualCreditCardAction,
  virtualCreditCardActions.reissueVirtualCreditCardAction,
  virtualCreditCardActions.editVirtualCreditCardAction,
  securityMediaActions.temporaryBlockProductV2,
  securityMediaActions.unlockProductV2Action,
  customizeAvalTagActions.modifyAvalTagAction,
  pocketWithReturnsEditActions.pocketWithReturnsEditAction,
  pocketDetailWithReturnsActions.pocketWithReturnsDeleteAction,
  pocketDetailWithReturnsActions.updatePocketWithReturnsStatusAction,
  createPocketWithReturnsActions.CreatePocketAction,
  qrAuthorizationActions.sendToken,
  pushNotificationRegisterActions.togglePushNotificationsAction,
  pushNotificationRegisterActions.notifyProviderPushNotificationToggleAction,
  breBTransfersActions.fetchAccountKeyAction,
  breBTransfersActions.transferAction,
  breBTransfersActions.addSpiContactAction,
  breBTransfersActions.updateSpiContactAction,
  breBTransfersActions.fetchSpiContactAction,
  breBTransfersActions.fetchGMFAction
];

export const DisableLoadingObserverActionsTypes = [
  authActions.loginUserErrorAction,
  withdrawActions.withdrawSuccessAction,
  withdrawActions.withdrawErrorAction,
  cardAdvanceActions.cardAdvanceSuccessAction,
  cardAdvanceActions.cardAdvanceErrorAction,
  useQuotaActions.useQuotaSuccessAction,
  useQuotaActions.useQuotaErrorAction,
  rechargeActions.rechargeSuccessAction,
  rechargeActions.rechargeErrorAction,
  transferActions.transferSuccessAction,
  transferActions.transferErrorAction,
  contactAddProductActions.contactAddProductSuccessAction,
  contactAddProductActions.contactAddProductErrorAction,
  contactAddProductActions.contactAddProductFinishedAction,
  pocketCreateActions.pocketCreateSuccessAction,
  pocketCreateActions.pocketCreateErrorAction,
  pocketEditActions.pocketEditSuccessAction,
  pocketEditActions.pocketEditErrorAction,
  updatePocketStatusActions.updatePocketStatusSuccessAction,
  updatePocketStatusActions.updatePocketStatusErrorAction,
  pocketTransferActions.pocketTransferSuccessAction,
  pocketTransferActions.pocketTransferErrorAction,
  pocketDeleteActions.pocketDeleteSuccessAction,
  pocketDeleteActions.pocketDeleteErrorAction,
  pocketPayActions.pocketPaySuccessAction,
  pocketPayActions.pocketPayErrorAction,
  payLoanActions.payLoanSuccessAction,
  payLoanActions.payLoanErrorAction,
  payBillActions.payBillSuccessAction,
  payBillActions.payBillErrorAction,
  creditMovements.fetchCreditMovementsSuccessAction,
  creditMovements.fetchCreditMovementsErrorAction,
  creditMovements.directedPaymentSuccessAction,
  creditMovements.directedPaymentErrorAction,
  creditMovements.updateInstallmentsSuccessAction,
  creditMovements.updateInstallmentsErrorAction,
  debitPurchaseActions.debitPurchaseSuccessAction,
  debitPurchaseActions.debitPurchaseErrorAction,
  payQRActions.payQRSuccessAction,
  payQRActions.payQRErrorAction,
  payQRActions.cancelQRSuccessAction,
  payQRActions.cancelQRErrorAction,
  securityBiometricActions.verifyPasswordSuccessAction,
  securityBiometricActions.verifyPasswordErrorAction,
  notifications.acceptTransfiyaAuthorizationSuccessAction,
  notifications.acceptTransfiyaAuthorizationErrorAction,
  notifications.rejectTransfiyaAuthorizationSuccessAction,
  notifications.rejectTransfiyaAuthorizationErrorAction,
  changePasswordActions.changePasswordSuccessAction,
  changePasswordActions.changePasswordErrorAction,
  paymentTaxesActions.makePaymentTaxesSuccess,
  paymentTaxesActions.makePaymentTaxesError,
  socialSecurityActions.paySocialSecuritySuccessAction,
  socialSecurityActions.paySocialSecurityErrorAction,
  socialSecurityActions.fetchSocialSecurityDataByPinSuccessAction,
  socialSecurityActions.fetchSocialSecurityDataByPinErrorAction,
  socialSecurityActions.fetchSocialSecurityDataByReferenceSuccessAction,
  socialSecurityActions.fetchSocialSecurityDataByReferenceErrorAction,
  securityMediaActions.activateProductSetStep,
  updatePasswordActions.updatePasswordSuccessAction,
  updatePasswordActions.updatePasswordErrorAction,
  complementaryServicesActions.toggleComplementaryServicesSuccessAction,
  complementaryServicesActions.toggleComplementaryServicesErrorAction,
  securityNotificationsActions.toggleSecurityNotificationsSuccessAction,
  securityNotificationsActions.toggleSecurityNotificationsErrorAction,
  renewalCdtActions.renewalCdtSuccessAction,
  renewalCdtActions.renewalCdtErrorAction,
  renewalCdtActions.cancelRenewalCdtSuccessAction,
  renewalCdtActions.cancelRenewalCdtErrorAction,
  removeTrustRelationActions.removeTrustRelationSuccessAction,
  removeTrustRelationActions.removeTrustRelationErrorAction,
  debitCardDetailActions.fetchDigitalDebitCardDetailSuccessAction,
  debitCardDetailActions.fetchDigitalDebitCardDetailErrorAction,
  debitCardDetailActions.createDigitalDebitCardSuccessAction,
  debitCardDetailActions.createDigitalDebitCardErrorAction,
  debitCardDetailActions.editDigitalDebitCardSuccessAction,
  debitCardDetailActions.editDigitalDebitCardErrorAction,
  debitCardDetailActions.cancelDigitalDebitCardSuccessAction,
  debitCardDetailActions.cancelDigitalDebitCardErrorAction,
  debitCardDetailActions.reissueDigitalDebitCardSuccessAction,
  debitCardDetailActions.reissueDigitalDebitCardErrorAction,
  favoritesCommonActions.favoriteCreateSuccessAction,
  favoritesCommonActions.favoriteCreateErrorAction,
  favoritesHomeActions.deleteFavoritesSuccessAction,
  favoritesHomeActions.deleteFavoritesErrorAction,
  favoritesEditActions.favoriteEditSuccessAction,
  favoritesEditActions.favoriteEditErrorAction,
  addFavoriteActions.fetchTowardProductsByPhoneNumberErrorAction,
  addFavoriteActions.fetchTowardProductsByPhoneNumberSuccessAction,
  pfmActions.changeCategorySuccess,
  pfmActions.changeCategoryError,
  qrAuthorizationActions.setQrData,
  qrAuthorizationActions.sendTokenSuccess,
  qrAuthorizationActions.sendTokenFailure,
  cel2celActions.fetchTowardProductsByPhoneNumberErrorAction,
  cel2celActions.fetchTowardProductsByPhoneNumberSuccessAction,
  blockAccountActions.sendBlockAccountSuccessAction,
  blockAccountActions.sendBlockAccountErrorAction,
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
  walletsActions.fetchCardListSuccessAction,
  walletsActions.fetchCardListErrorAction,
  walletsActions.cardEnrollmentProcessSuccessAction,
  walletsActions.prepareCardsSuccessAction,
  walletsActions.prepareCardsErrorAction,
  walletsActions.validateAndPushCardSuccessAction,
  walletsActions.validateAndPushCardErrorAction,
  avalKeyActions.fetchAccountAvalKeyErrorAction,
  defaultAccountActions.deleteDefaultAccountSuccessAction,
  defaultAccountActions.deleteDefaultAccountErrorAction,
  virtualCreditCardActions.createVirtualCreditCardSuccessAction,
  virtualCreditCardActions.createVirtualCreditCardErrorAction,
  virtualCreditCardActions.fetchVirtualCreditCardDetailSuccessAction,
  virtualCreditCardActions.fetchVirtualCreditCardDetailErrorAction,
  virtualCreditCardActions.cancelVirtualCreditCardSuccessAction,
  virtualCreditCardActions.cancelVirtualCreditCardErrorAction,
  virtualCreditCardActions.reissueVirtualCreditCardSuccessAction,
  virtualCreditCardActions.reissueVirtualCreditCardErrorAction,
  virtualCreditCardActions.editVirtualCreditCardSuccessAction,
  virtualCreditCardActions.editVirtualCreditCardErrorAction,
  securityMediaActions.temporaryBlockProductV2SuccessAction,
  securityMediaActions.temporaryBlockProductV2ErrorAction,
  securityMediaActions.unlockProductV2SuccessAction,
  securityMediaActions.unlockProductV2ErrorAction,
  customizeAvalTagActions.modifyAvalTagSuccessAction,
  customizeAvalTagActions.modifyAvalTagErrorAction,
  pocketWithReturnsEditActions.pocketWithReturnsEditSuccessAction,
  pocketWithReturnsEditActions.pocketWithReturnsEditErrorAction,
  pocketDetailWithReturnsActions.pocketWithReturnsDeleteSuccessAction,
  pocketDetailWithReturnsActions.pocketWithReturnsDeleteErrorAction,
  createPocketWithReturnsActions.CreatePocketSuccessAction,
  createPocketWithReturnsActions.CreatePocketErrorAction,
  pocketDetailWithReturnsActions.updatePocketWithReturnsStatusSuccessAction,
  pocketDetailWithReturnsActions.updatePocketWithReturnsStatusErrorAction,
  pushNotificationRegisterActions.togglePushNotificationsSuccessAction,
  pushNotificationRegisterActions.togglePushNotificationsPermissionErrorAction,
  pushNotificationRegisterActions.togglePushNotificationsErrorAction,
  pushNotificationRegisterActions.notifyProviderPushNotificationToggleSuccessAction,
  pushNotificationRegisterActions.notifyProviderPushNotificationToggleErrorAction,
  breBTransfersActions.fetchAccountKeySuccessAction,
  breBTransfersActions.fetchAccountKeyErrorAction,
  breBTransfersActions.transferSuccessAction,
  breBTransfersActions.transferErrorAction,
  breBTransfersActions.addSpiContactSuccessAction,
  breBTransfersActions.addSpiContactErrorAction,
  breBTransfersActions.updateSpiContactSuccessAction,
  breBTransfersActions.updateSpiContactErrorAction,
  breBTransfersActions.fetchSpiContactSuccessAction,
  breBTransfersActions.fetchSpiContactErrorAction,
  breBTransfersActions.fetchGMFSuccessAction,
  breBTransfersActions.fetchGMFErrorAction
];
