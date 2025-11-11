import { PluginListenerHandle } from '@capacitor/core';

export interface DigitalWalletPlugin {
  validateWalletStatus(): Promise<void>;

  initializeWalletProvisioning(): Promise<void>;

  checkEligibility(): Promise<void>;

  createWallet(options: {
    activationCode: string;
    phoneNumber?: string;
  }): Promise<void>;

  isWalletCreated(): Promise<{ wallet: boolean }>;

  getWalletId(): Promise<{ walletId: string }>;

  enrollCardToWallet(options: {
    enrollmentData: string;
  }): Promise<{ success: string }>;

  getDigitalCardId(option: {
    cardId: string;
  }): Promise<{ digitalCardId: string }>;

  setCustomCardDisplay(option: {
    cardId: string;
    cardImageUrl: string;
    cardDescription: string;
  }): Promise<{ imageIsLoaded: boolean }>;

  getDigitalCards(): Promise<{ cards: string }>;

  getStatusApplePayService(option: {
    cardId: string;
  }): Promise<{ status: string }>;

  canPushCardInApplePay(options: {
    cardId: string;
  }): Promise<{ canPushCardInApplePay: boolean }>;

  pushCardToApplePay(options: {
    cardId: string;
  }): Promise<{ pushToApplePay: boolean }>;

  getStatusGooglePayService(option: {
    cardId: string;
  }): Promise<{ status: string }>;

  canPushCardInGooglePay(options: {
    cardId: string;
  }): Promise<{ canPushCardInGooglePay: boolean }>;

  pushCardToGooglePay(options: {
    cardId: string;
  }): Promise<{ pushToGooglePay: boolean }>;

  addListener(
    eventName: DigitalWalletEventType,
    listenerFunc: (info: InfoEvent) => void
  ): Promise<PluginListenerHandle>;
}

export interface DigitalCardStructure {
  id: string;
  status: string;
  lastDigits: string;
  bin: string;
  expirationDate: string;
  imageIsLoaded: boolean;
}

export enum DigitalWalletEventType {
  WalletStatusEvent = 'WalletStatusEvent',
  WalletProvisioningInitEvent = 'WalletProvisioningInitEvent',
  WalletEligibilityEvent = 'WalletEligibilityEvent',
  CreateWalletEvent = 'CreateWalletEvent',
  EnrollCardEvent = 'EnrollCardEvent'
}

export type InfoEvent = { [key: string]: string };

export enum DigitalWalletStatusEvents {
  onProvisioningRequired = 'onProvisioningRequired',
  onCredentialsRequired = 'onCredentialsRequired',
  onConnectionSuccess = 'onConnectionSuccess',
  onConnectionError = 'onConnectionError'
}

export enum DigitalWalletProvisioningInitEvents {
  onInitializationSuccess = 'onInitializationSuccess',
  onInitializationError = 'onInitializationError'
}

export enum DigitalWalletProvisioningEligibilityEvents {
  onDeviceEligible = 'onDeviceEligible',
  onDeviceNotEligible = 'onDeviceNotEligible',
  onCheckEligibilityError = 'onCheckEligibilityError'
}

export enum DigitalWalletCreateWalletEvents {
  onProvisioningPending = 'onProvisioningPending',
  onProvisioningSuccess = 'onProvisioningSuccess',
  onProvisioningError = 'onProvisioningError'
}

export enum DigitalWalletEnrollCardEvents {
  onCardsUpdated = 'onCardsUpdated'
}
