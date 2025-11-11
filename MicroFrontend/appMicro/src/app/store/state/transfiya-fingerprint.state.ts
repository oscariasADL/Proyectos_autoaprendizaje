export interface TransfiyaFingerprint {
  Geolocation?: {
    city?: string;
    country?: string;
    ip?: string;
    isp?: string;
  };
  Hash?: string;
  General?: {
    deviceId?: string;
    hostname?: string;
    macAddress?: string;
    passiveId?: string;
  };
}

export const transfiyaFingerprintFeatureName = 'TransfiyaFingerprint';

export type TransfiyaFingerprintState = Readonly<TransfiyaFingerprint>;

export const initialTransfiyaFingerprintState: TransfiyaFingerprintState = {
  Geolocation: {
    city: '',
    country: '',
    ip: '',
    isp: ''
  },
  Hash: '',
  General: {
    deviceId: '',
    hostname: '',
    macAddress: '',
    passiveId: ''
  }
};
