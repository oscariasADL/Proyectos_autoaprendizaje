import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import { BarcodeScannerUserGuidance } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';

export enum QrPaySlide {
  data = 'data',
  installments = 'installments',
  confirmation = 'confirmation'
}

export const QrPayStep = {
  [QrPaySlide.data]: 0,
  [QrPaySlide.installments]: 0.5,
  [QrPaySlide.confirmation]: 1
};

export const QR_PAY_DYNAMIC_STEPS: Step[] = [
  {
    id: QrPayStep[QrPaySlide.data],
    label: 'Datos'
  },
  {
    id: QrPayStep[QrPaySlide.confirmation],
    label: 'Confirma'
  }
];

export const QR_PAY_STATIC_STEPS: Step[] = [
  {
    id: QrPayStep[QrPaySlide.data],
    label: 'Valor'
  },
  {
    id: QrPayStep[QrPaySlide.confirmation],
    label: 'Confirma'
  }
];

export const QR_PAY_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'qr-pay-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar el pago con QR?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const WRONG_SCAN_ALERT_ERROR = {
  id: 'alert-complementary-service-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: 'iconsV2/process-error.svg',
  title: '<b>Ingresaste por la opción equivocada</b>',
  description:
    'Para autorizar tus transacciones de la banca virtual lo debes hacer por la opción <b>“Autoriza tus transacciones”</b> que se encuentra en esta misma sección.',
  buttons: ['AUTORIZAR TRANSACCIONES']
};

export const QR_PAY_DATA_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'qr-pay-scan-error-alert',
  title: 'Lo sentimos',
  buttons: ['Entendido']
};

export const QR_PAY_AVAILABLE_FIELD = 'availableBalance';
export const QR_PAY_SCAN_ID = 'scan-qr';

export const LENGTH_MERCHANT_CODE = 9;
export const FIRST_POSITION_MERCHANT_CODE = '9';

export const LENGTH_MERCHANT_CODE_SPI_KEY = 10;
export const FIRST_CHARACTERS_SPI_KEY = '00';

export const FILLER_CHARACTER_FOR_SPI_KEY = '0';

export const BARCODE_SCANNER_USER_GUIDANCE_QR_PAY: BarcodeScannerUserGuidance =
  {
    title: 'QR.OPTIONS.SCAN.TITLE',
    description: 'QR.OPTIONS.SCAN.DESCRIPTION',
    cancelButtonText: 'ACTIONS.CANCEL'
  };
