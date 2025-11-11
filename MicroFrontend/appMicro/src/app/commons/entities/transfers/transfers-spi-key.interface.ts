export interface TransferSpiUserKey {
  bankName: string;
  name: string;
  fullName: string;
  key: string;
  statusDirectory?: StatusKeyDirectory;
}

export enum StatusKeyDirectory {
  DICE = 'DICE'
}
