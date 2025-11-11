import {
  InitializationOptions,
  BarcodeScannerViewConfiguration
} from 'scanbot-web-sdk/@types';
import {
  BarcodeFormat,
  BarcodeType
} from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const INITIALIZATION_OPTIONS: InitializationOptions = {
  licenseKey: '',
  verboseLogging: true,
  enginePath: 'assets/js/lib/scanbot/',
  allowThreads: false
};

export const BARCODE_SCANNER_CONFIGURATION: BarcodeScannerViewConfiguration = {
  containerId: 'scanner-container',
  onError: (e: Error) => {
    console.error(e.name + ': ' + e.message);
  },
  finder: {
    visible: false
  }
};

export const BARCODE_FORMAT = {
  [BarcodeType.QR]: BarcodeFormat.QR_CODE,
  [BarcodeType.BARCODE]: BarcodeFormat.CODE_128
};

export const SCANNER_TIMEOUT_MS = 50_000; // DANGER: it cannot be greater than 59000

export const BARCODE_SCANNER_PREPARE_ERROR_ALERT: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'qr-pay-scan-permission-alert',
  icon: 'icons/recargar-celular-cancelar.svg',
  title: 'BARCODE_SCANNER.ERRORS.BARCODE_ERROR',
  description: 'BARCODE_SCANNER.ERRORS.BARCODE_ERROR'
};
