import { NavController } from '@ionic/angular';
import {
  TRANSFER_CONTACTS,
  TRANSFER_AVV_ACCOUNT,
  TRANSFERS_CEL2CEL,
  TRANSFER_AVAL_TAG,
  MONEY_ORDER,
  CASH_WITHDRAWAL,
  REMITTANCES,
  TRANSFERS,
  BRE_B_TRANSFERS
} from '@commons/constants/navigate.constants';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { BaseButtonHelper } from '@app/commons/helpers/create-buttons-base.helper';
import { TypeDocument } from '@app/commons/entities/product/type-document';

export class TransfersButtonHelper extends BaseButtonHelper {
  protected readonly BASE_BUTTONS: AvvIconsBtnList[] = [
    {
      label: 'TRANSFERS.BUTTON_LIST.CONTACTS',
      image: 'illustrationsV2/contactos-dinero-regular.svg',
      id: 'registered-contacts-btn',
      utag: 'a contactos inscritos',
      utagCategory: 'transferencias',
      featureFlagKey: FeatureFlagsKey.TransferContacts,
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(TRANSFER_CONTACTS)
    },
    {
      label: 'TRANSFERS.BUTTON_LIST.AVV_ACCOUNT',
      image: 'illustrationsV2/transferencia-regular.svg',
      id: 'avv-account-btn',
      utag: 'a cuentas av villas',
      utagCategory: 'transferencias',
      featureFlagKey: FeatureFlagsKey.TransferVillas,
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(TRANSFER_AVV_ACCOUNT)
    },
    {
      label: 'TRANSFERS.BUTTON_LIST.BRE_B',
      image: 'bre-b/bre-b.svg',
      id: 'bre-b-btn',
      utag: 'a Bre-B',
      utagCategory: 'transferencias',
      featureFlagKey: FeatureFlagsKey.BreBTransfers,
      isNew: true,
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(BRE_B_TRANSFERS)
    },
    {
      label: 'TRANSFERS.BUTTON_LIST.CEL2CEL',
      image: 'illustrationsV2/celular-billete-regular.svg',
      id: 'cel2cel-phone-btn',
      utag: 'a un celular',
      utagCategory: 'transferencias',
      featureFlagKey: FeatureFlagsKey.TransferCel2cel,
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(TRANSFERS_CEL2CEL)
    },
    {
      label: 'TRANSFERS.BUTTON_LIST.AVAL_KEY',
      image: 'aval-icons/tag-aval-transfers.svg',
      id: 'aval-key-btn',
      utag: 'a Tag Aval',
      utagCategory: 'transferencias',
      featureFlagKey: FeatureFlagsKey.TransferAvalKey,
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(TRANSFER_AVAL_TAG)
    },
    {
      label: 'TRANSFERS.BUTTON_LIST.REMITTANCES',
      image: 'illustrationsV2/menu-bolsa-de-dinero-regular.svg',
      id: 'remittance-transfer',
      featureFlagKey: FeatureFlagsKey.Remittances,
      denyDocumentTypes: [TypeDocument.CE, TypeDocument.TI],
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(REMITTANCES, {
          queryParams: {
            from: TRANSFERS
          }
        })
    }
  ];

  protected readonly ADDITIONAL_BUTTONS: AvvIconsBtnList[] = [
    {
      label: 'TRANSFERS.BUTTON_LIST.THIRD_TRANSFERS',
      image: 'illustrationsV2/transferencia-terceros-regular.svg',
      id: 'btn-money-orders-service',
      featureFlagKey: FeatureFlagsKey.Withdraw,
      action: (navCtrl: NavController) => navCtrl.navigateForward(MONEY_ORDER)
    },
    {
      label: 'TRANSFERS.BUTTON_LIST.WITHOUT_CARD',
      image: 'illustrationsV2/retiro-dinero-regular.svg',
      id: 'btn-cash-withdrawals-service',
      featureFlagKey: FeatureFlagsKey.CashWithdrawal,
      action: (navCtrl: NavController) =>
        navCtrl.navigateForward(CASH_WITHDRAWAL)
    }
  ];
}
