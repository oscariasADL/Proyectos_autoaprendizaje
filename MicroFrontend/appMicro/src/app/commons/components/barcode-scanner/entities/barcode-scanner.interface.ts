export enum BarcodeType {
  QR = 'QR',
  BARCODE = 'BARCODE'
}

export enum BarcodeFormat {
  QR_CODE = 'QR_CODE',
  CODE_128 = 'CODE_128'
}

export interface BarcodeScannerUserGuidance {
  title: string;
  description?: string;
  cancelButtonText: string;
  helpText?: string;
}
