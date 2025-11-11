import { DigitalWalletStrategy } from '@modules/wallets/entities/digital-wallet-strategy.interface';
import { DigitalWallet } from '@commons/capacitor-web-plugins/digital-wallet';

export class GooglePayStrategy
  implements Omit<DigitalWalletStrategy, 'addListener'>
{
  public async validateWalletStatus(): Promise<void> {
    return DigitalWallet.validateWalletStatus();
  }

  public async initializeWalletProvisioning(): Promise<void> {
    return DigitalWallet.initializeWalletProvisioning();
  }

  public async checkEligibility(): Promise<void> {
    return DigitalWallet.checkEligibility();
  }

  public async createWallet(options: {
    activationCode: string;
    phoneNumber?: string;
  }): Promise<void> {
    return DigitalWallet.createWallet(options);
  }

  public async isWalletCreated(): Promise<{ wallet: boolean }> {
    return DigitalWallet.isWalletCreated();
  }

  public async getWalletId(): Promise<{ walletId: string }> {
    const isCreated = await DigitalWallet.isWalletCreated();
    if (!isCreated) {
      throw new Error('WALLETS.PROVISIONING.PROVISIONING_ERROR');
    }

    const walletId = await DigitalWallet.getWalletId();

    if (!walletId?.walletId) {
      throw new Error('WALLETS.PROVISIONING.PROVISIONING_ERROR');
    }

    return walletId;
  }

  public async enrollCardToWallet(options: {
    enrollmentData: string;
  }): Promise<{ success: string }> {
    return DigitalWallet.enrollCardToWallet(options);
  }

  public async getDigitalCardId(options: {
    cardId: string;
  }): Promise<{ digitalCardId: string }> {
    return DigitalWallet.getDigitalCardId(options);
  }

  public async setCustomCardDisplay(options: {
    cardId: string;
    cardImageUrl: string;
    cardDescription: string;
  }): Promise<{
    imageIsLoaded: boolean;
  }> {
    return DigitalWallet.setCustomCardDisplay(options);
  }

  public async getDigitalCards(): Promise<{ cards: string }> {
    return DigitalWallet.getDigitalCards();
  }

  public async getStatusPlatformService(options: {
    cardId: string;
  }): Promise<{ status: string }> {
    return DigitalWallet.getStatusGooglePayService(options);
  }

  public async canPushCardInWalletPay(options: {
    cardId: string;
  }): Promise<{ canPushCardWalletPay: boolean }> {
    const result = await DigitalWallet.canPushCardInGooglePay(options);
    return { canPushCardWalletPay: result?.canPushCardInGooglePay };
  }

  public async pushCardToWalletPay(options: {
    cardId: string;
  }): Promise<{ pushToWalletPay: boolean }> {
    const result = await DigitalWallet.pushCardToGooglePay(options);
    return { pushToWalletPay: result?.pushToGooglePay };
  }
}
