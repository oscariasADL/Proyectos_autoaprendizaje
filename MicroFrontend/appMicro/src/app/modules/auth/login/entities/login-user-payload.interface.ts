export interface LoginDocumentFields {
  typeDocument: string;
  document: string;
}

export interface LoginUserPayload extends LoginDocumentFields {
  typeDocument: string;
  document: string;
  password: string;
  deviceName: string;
  deviceSerial: string;
}
