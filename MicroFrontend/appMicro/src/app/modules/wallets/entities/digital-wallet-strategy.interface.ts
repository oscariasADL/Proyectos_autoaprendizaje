export interface DigitalWalletStrategy {
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

  getDigitalCardId(options: {
    cardId: string;
  }): Promise<{ digitalCardId: string }>;

  setCustomCardDisplay(options: {
    cardId: string;
    cardImageUrl: string;
    cardDescription: string;
  }): Promise<{ imageIsLoaded: boolean }>;

  getDigitalCards(): Promise<{ cards: string }>;

  getStatusPlatformService(options: {
    cardId: string;
  }): Promise<{ status: string }>;

  canPushCardInWalletPay(options: {
    cardId: string;
  }): Promise<{ canPushCardWalletPay: boolean }>;

  pushCardToWalletPay(options: {
    cardId: string;
  }): Promise<{ pushToWalletPay: boolean }>;

  /*addListener(
    eventName: DigitalWalletEventType,
    listenerFunc: (info: InfoEvent) => void
  ): Promise<PluginListenerHandle>;*/
}
