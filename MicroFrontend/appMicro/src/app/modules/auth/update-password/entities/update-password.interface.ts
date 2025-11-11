export interface UpdatePasswordPayload {
  documentType: string;
  documentNumber: string;
  password: string;
  deviceSerial: string;
  newPassword: string;
  confirmedPassword: string;
  companyId: string;
}
