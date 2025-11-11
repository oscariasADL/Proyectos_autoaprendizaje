export interface OutputResponse {
  topicName: string;
  topicValue: {
    data: {
      message: string;
      detail: string;
      messageCode: string;
      rejectionDetail?: string;
      rejectionCode?: string;
    };
    transactionId?: string;
    processId: string;
    biometricToken: string;
    dataCustomer: {
      documentType: string;
      identificationNumber: number;
      firstName?: string;
      secondName?: string;
      firstSurname?: string;
      secondSurname?: string;
      birthDate?: string;
      gender?: string;
      issueDate?: string;
      expirationDate?: string;
      nationality?: string;
    };
  };
  eventDriven: number;
}

export interface BiometricPayload {
  biometricProcessId: string;
  biometricToken: string;
  messageCode: string;
}

export interface OutputResponseOverflow {
  topicName: string;
  topicValue: {
    data: {
      message: string;
      detail: string;
      messageCode: string;
    };
  };
  eventDriven: number;
}

export interface BiometricData {
  authorization: string;
  uuid: string;
  device: string;
  legalName: string;
  companyId: string;
  documentType: string;
  identificationNumber: string;
}
