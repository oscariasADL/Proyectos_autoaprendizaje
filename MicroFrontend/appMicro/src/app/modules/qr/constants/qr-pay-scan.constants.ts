import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SecureKeys } from '@commons/constants/keys.constants';

export enum QRType {
  static = 11, // QR Dale
  dynamic = 12
}

export const QR_MOCK_RAW_WEB =
  // eslint-disable-next-line max-len
  '000201550202010212560105802CO5918LA TIENDECITA BPOP49250103RBM0014CO.COM.RBM.RED903001060348210016CO.COM.RBM.TRXID80270103APP0016CO.COM.RBM.CANAL91460124kcIf4z8nvGQdA67kr5VUFvFI0014CO.COM.RBM.SEC81250102020015CO.COM.RBM.CIVA601141001 NEIVA8223010100014CO.COM.RBM.IVA503001099353177340013CO.COM.RBM.CU6105410018324010100015CO.COM.RBM.BASE62400213+5735037457350306000000070300008020084250102020015CO.COM.RBM.CINC520400008523010100014CO.COM.RBM.INC530317064280002ES0118LA TIENDECITA BPOP5404200063047C3B';

export const QR_PAY_SCAN_PERMISSION_ALERT: AlertSheetProperties = {
  type: AlertSheetType.error,
  panelKey: SecureKeys.hiddenQrPayScanPermissionsInfo,
  id: 'qr-pay-scan-permission-alert',
  icon: 'icons/recargar-celular-cancelar.svg',
  title: 'QR.OPTIONS.SCAN.MODAL_PERMISSION.TITLE',
  description: 'QR.OPTIONS.SCAN.MODAL_PERMISSION.DESCRIPTION'
};

export const QR_PAY_SCAN_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenQrPayScanInfo,
  id: 'qr-pay-scan-info-alert',
  icon: 'favoritos.svg',
  title: 'QR.OPTIONS.SCAN.MODAL_INFO.TITLE',
  iconList: [
    {
      icon: 'img/icons/qr-scan-icon.svg',
      text: 'QR.OPTIONS.SCAN.MODAL_INFO.DESCRIPTION'
    }
  ]
};

export const QR_PAY_SCAN_READING_ERROR_ALERT: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'qr-pay-scan-reading-error-alert',
  icon: 'icons/recargar-celular-cancelar.svg',
  title: 'QR.OPTIONS.SCAN.MODAL_ERROR_READING.TITLE',
  description: 'QR.OPTIONS.SCAN.MODAL_ERROR_READING.DESCRIPTION',
  buttons: ['ACTIONS.RETRY']
};
