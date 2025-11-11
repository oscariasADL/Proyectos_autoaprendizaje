export interface LastTokenResponse {
  token: string;
  lastDigits: string;
}

export interface ActivateTokenPayload {
  tokenInfo: {
    token: string;
  };
  desc: string;
  custInfo: {
    orgInfo: {
      organizationName: 'ADL' | string;
    };
    custName: {
      legalName: string;
    };
    participantId: string;
  };
}

export interface InfoActivationData {
  icon: string;
  title: string;
  description: string;
  button: string;
}
