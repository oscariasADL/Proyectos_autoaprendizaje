export interface QrPayPayload {
  qrMetadata: string;
  paymentMethod: {
    relativeId: string;
  };
  numberOfInstalments: string;
  amount?: number;
}

export interface QrPayAccountPayload {
  qrMetadata: string;
  paymentMethod: {
    accountId: string;
    accountType: string;
  };
  deviceAdmin: {
    deviceModel: string;
    serial: string;
  };
  amount: string;
  ipAddress?: string;
  typeDoc?: string;
  numDoc?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface QrCancelPayload {
  qrMetadata: string;
}

export interface SearchBusinessesPayload {
  qrMetadata: string;
  ipAddress: string;
  typeDoc: string;
  numDoc: string;
}

export interface SearchBusinessResponse {
  isCommerceValid: boolean;
}

export enum QrPayError {
  processQR = 'Error procesando el código QR',
  paymentMethods = 'Error cargando métodos de pago',
  methodQRData = 'Error cargando información de pago QR'
}
