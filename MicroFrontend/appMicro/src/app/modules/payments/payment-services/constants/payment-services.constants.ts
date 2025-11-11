import { PaymentServiceCardItemLabels } from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SecureKeys } from '@commons/constants/keys.constants';
import { BarcodeScannerUserGuidance } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';

export enum PaymentServicesError {
  scan = 'No pudimos leer el código de barras',
  nuraCodes = 'Error cargando códigos NURA',
  category = 'Error cargando código del convenio',
  billError = 'Error cargando información de factura',
  agreementLoad = 'Problemas para cargar los convenios',
  agreementFilter = 'Problemas para filtrar por convenio',
  alreadyPaid = 'Esta factura ya se encuentra paga',
  deadlineExpired = 'La fecha límite de pago de esta factura ya se cumplió'
}

export const PAYMENT_BILL_INFO_DEFAULT_CARD_ITEMS: PaymentServiceCardItemLabels[] =
  [
    PaymentServiceCardItemLabels.PAYMENT_REFERENCE,
    PaymentServiceCardItemLabels.PAYMENT_AMOUNT,
    PaymentServiceCardItemLabels.PAYMENT_LIMIT
  ];

export const PAYMENT_BILL_INFO_SCHEDULE_CARD_ITEMS: PaymentServiceCardItemLabels[] =
  [
    PaymentServiceCardItemLabels.PAYMENT_AMOUNT_MAX,
    PaymentServiceCardItemLabels.FROM
  ];

export const BARCODE_SCAN_PREPARE_ERROR_ALERT: AlertSheetProperties = {
  type: AlertSheetType.error,
  panelKey: SecureKeys.hiddenQrPayScanPermissionsInfo,
  id: 'qr-pay-scan-permission-alert',
  icon: 'icons/recargar-celular-cancelar.svg',
  title:
    'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_ERROR',
  description:
    'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_ERROR'
};

export const BARCODE_SCANNER_USER_GUIDANCE_SERVICES: BarcodeScannerUserGuidance =
  {
    title:
      'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_TITLE',
    cancelButtonText: 'ACTIONS.CANCEL'
  };
