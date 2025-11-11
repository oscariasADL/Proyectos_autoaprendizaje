export interface UserData {
  lastAuthDate: string;
  currentDate: string;
  lastIPAddress: string;
  migrate?: string;
  dataBasicClientDto?: DataBasicClientDto;
  token?: string;
}

export interface DataBasicClientDto {
  lastAuthInfo?: string;
  clientName?: string;
  firstName?: string;
  lastName?: string;
  documentType?: string;
  documentNumber?: string;
  ip?: string;
  signStatus?: number;
  adviserEmail?: string;
  adviserPhone?: string;
  phoneNumberStatus?: string;
  channelState?: string;
  phoneNumber?: string;
  emailType?: string;
  adviserName?: string;
  email?: string;
  hasCreditProducts?: boolean;
  hasDigitalCard?: boolean;
}
