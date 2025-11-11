import { WebPlugin } from '@capacitor/core';
import { DigitalWalletPlugin } from './definitions';

export class DigitalWalletPluginWeb
  extends WebPlugin
  implements DigitalWalletPlugin
{
  public async validateWalletStatus(): Promise<void> {
    return Promise.resolve();
  }

  public async initializeWalletProvisioning(): Promise<void> {
    return Promise.resolve();
  }

  public async checkEligibility(): Promise<void> {
    return Promise.resolve();
  }

  public async createWallet(options: {
    activationCode: string;
    phoneNumber?: string;
  }): Promise<void> {
    return Promise.resolve();
  }

  public async enrollCardToWallet(options: {
    enrollmentData: string;
  }): Promise<{ success: string }> {
    return Promise.resolve({ success: '' });
  }

  public async getDigitalCardId(options: {
    cardId: string;
  }): Promise<{ digitalCardId: string }> {
    return Promise.resolve({ digitalCardId: '' });
  }

  public async setCustomCardDisplay(option: {
    cardId: string;
    cardImageUrl: string;
    cardDescription: string;
  }): Promise<{ imageIsLoaded: boolean }> {
    return Promise.resolve({ imageIsLoaded: true });
  }

  public async getDigitalCards(): Promise<{ cards: string }> {
    return Promise.resolve({ cards: '[]' });
  }

  public async getStatusApplePayService(option: {
    cardId: string;
  }): Promise<{ status: string }> {
    return Promise.resolve({ status: '' });
  }

  public async getWalletId(): Promise<{ walletId: string }> {
    return Promise.resolve({ walletId: '' });
  }

  public async canPushCardInApplePay(options: {
    cardId: string;
  }): Promise<{ canPushCardInApplePay: boolean }> {
    return Promise.resolve({ canPushCardInApplePay: false });
  }

  public async isWalletCreated(): Promise<{ wallet: boolean }> {
    return Promise.resolve({ wallet: false });
  }

  public async pushCardToApplePay(options: {
    cardId: string;
  }): Promise<{ pushToApplePay: boolean }> {
    return Promise.resolve({ pushToApplePay: true });
  }

  public async getStatusGooglePayService(option: {
    cardId: string;
  }): Promise<{ status: string }> {
    return Promise.resolve({ status: '' });
  }

  public async canPushCardInGooglePay(options: {
    cardId: string;
  }): Promise<{ canPushCardInGooglePay: boolean }> {
    return Promise.resolve({ canPushCardInGooglePay: false });
  }

  public async pushCardToGooglePay(options: {
    cardId: string;
  }): Promise<{ pushToGooglePay: boolean }> {
    return Promise.resolve({ pushToGooglePay: true });
  }
}
