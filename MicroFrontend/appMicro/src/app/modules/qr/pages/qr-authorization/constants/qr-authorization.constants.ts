import { CustomFactKeys } from '../entities/qr-authorization.interface';
import { BarcodeScannerUserGuidance } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const CUSTOM_FACTS_LABELS: Record<string, string> = {
  [CustomFactKeys.NICKNAME_ACCOUNT]: 'Nombre de la cuenta',
  [CustomFactKeys.NUMBER_ACCOUNT]: 'No. de la cuenta',
  [CustomFactKeys.AMOUNT]: 'Valor',
  [CustomFactKeys.DATE]: 'Fecha'
};

export const CUSTOM_FACTS_SORTED_KEYS: string[] = [
  CustomFactKeys.NICKNAME_ACCOUNT,
  CustomFactKeys.NUMBER_ACCOUNT,
  CustomFactKeys.AMOUNT,
  CustomFactKeys.DATE
];

export const BARCODE_SCANNER_USER_GUIDANCE: BarcodeScannerUserGuidance = {
  title: 'QR.OPTIONS.SCAN.TITLE',
  description: 'QR.OPTIONS.SCAN.DESCRIPTION',
  cancelButtonText: 'ACTIONS.CANCEL'
};

export const WRONG_SCAN_ALERT_ERROR = {
  id: 'alert-complementary-service-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: 'iconsV2/process-error-cellphone.svg',
  title: '<b>Ingresaste por la opción equivocada</b>',
  description:
    'Para realizar tus pagos lo debes hacer por la opción de <b>“Escanear QR del datáfono o cartel”</b> que se encuentra en esta misma sección.',
  buttons: ['ESCANEAR QR DEL DATÁFONO']
};
