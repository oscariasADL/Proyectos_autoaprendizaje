import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
/*import {
  BarcodeScannerOptions,
  BarcodeScanResult
} from '@ionic-native/barcode-scanner/ngx';*/

export const QR_PAY_SCAN_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'qr-pay-scan-error-alert',
  title: 'No pudimos leer el código QR',
  buttons: ['Intentar de nuevo']
};

export const QR_AUTHORIZATION_SCAN_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'qr-authorization-scan-error-alert',
  title: 'No pudimos leer el código QR',
  description: 'Por favor intenta escanearlo de nuevo',
  buttons: ['Intentar de nuevo']
};

/*export const QR_SCANNER_OPTIONS: BarcodeScannerOptions = {
  prompt: 'Escanea el código QR',
  orientation: 'portrait',
  formats: 'QR_CODE',
  resultDisplayDuration: 0
};*/

//export const QR_SCAN_RESULT_DEFAULT: BarcodeScanResult = {
export const QR_SCAN_RESULT_DEFAULT = {
  format: 'QR_CODE',
  cancelled: false,
  text:
    // eslint-disable-next-line max-len
    '0002015502020102125606243.005802CO5910ABCDEF S.A49250103RBM0014CO.COM.RBM.RED9028010433270016CO.COM.RBM.TRXID80270103POS0016CO.COM.RBM.CANAL91460124xKyb54CfRMcHCQKIbxuuSFZP0014CO.COM.RBM.SEC81250102020015CO.COM.RBM.CIVA601211001 BOGOTA8227010580.000014CO.COM.RBM.IVA50290108102030400013CO.COM.RBM.CU833001072000.000015CO.COM.RBM.BASE62180708PAXCOM1108020084250102020015CO.COM.RBM.CINC520457128527010555.000014CO.COM.RBM.INC530317064200002ES0110ABCDEF S.A540450006304D141'
};
