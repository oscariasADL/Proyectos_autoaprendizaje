import { Inject, Injectable } from '@angular/core';
import { DigitalWalletStrategy } from '../entities/digital-wallet-strategy.interface';
import { DIGITAL_WALLET_STRATEGY } from '@modules/wallets/digital-wallet-provider';

//import { isNativeMethod } from '@commons/decorators/native.decorator';

//import { WALLET_CARD_LIST_MOCK } from '@modules/wallets/constants/wallets.constants';

@Injectable()
export class DigitalWalletContextService {
  constructor(
    @Inject(DIGITAL_WALLET_STRATEGY)
    private strategy: DigitalWalletStrategy
  ) {}

  public async validateWalletStatus(): Promise<void> {
    return this.strategy.validateWalletStatus();
  }

  public async initializeWalletProvisioning(): Promise<void> {
    return this.strategy.initializeWalletProvisioning();
  }

  public async checkEligibility(): Promise<void> {
    return this.strategy.checkEligibility();
  }

  public async createWallet(options: {
    activationCode: string;
    phoneNumber?: string;
  }): Promise<void> {
    return this.strategy.createWallet({
      activationCode: options.activationCode
    });
  }

  public async isWalletCreated(): Promise<{ wallet: boolean }> {
    return this.strategy.isWalletCreated();
  }

  //@isNativeMethod(Promise.resolve({ walletId: '7347347' }))
  public async getWalletId(): Promise<{ walletId: string }> {
    return this.strategy.getWalletId();
  }

  public async enrollCardToWallet(options: {
    enrollmentData: string;
  }): Promise<{ success: string }> {
    return this.strategy.enrollCardToWallet({
      enrollmentData: options.enrollmentData
    });
  }

  //@isNativeMethod(Promise.resolve({ digitalCardId: '4824515000029077' }))
  public async getDigitalCardId(options: {
    cardId: string;
  }): Promise<{ digitalCardId: string }> {
    return this.strategy.getDigitalCardId({ cardId: options.cardId });
  }

  public async setCustomCardDisplay(options: {
    cardId: string;
    cardImageUrl: string;
    cardDescription: string;
  }): Promise<{ imageIsLoaded: boolean }> {
    return this.strategy.setCustomCardDisplay({
      cardId: options.cardId,
      cardImageUrl: options.cardImageUrl,
      cardDescription: options.cardDescription
    });
  }

  /*@isNativeMethod(
    Promise.resolve({ cards: JSON.stringify(WALLET_CARD_LIST_MOCK) })
  )*/
  public async getDigitalCards(): Promise<{ cards: string }> {
    return this.strategy.getDigitalCards();
  }

  public async getStatusPlatformService(options: {
    cardId: string;
  }): Promise<{ status: string }> {
    return this.strategy.getStatusPlatformService({ cardId: options.cardId });
  }

  //@isNativeMethod(Promise.resolve({ canPushCardWalletPay: true }))
  public async canPushCardWalletPay(options: {
    cardId: string;
  }): Promise<{ canPushCardWalletPay: boolean }> {
    return this.strategy.canPushCardInWalletPay({ cardId: options.cardId });
  }

  public async pushCardToWalletPay(options: {
    cardId: string;
  }): Promise<{ pushToWalletPay: boolean }> {
    return this.strategy.pushCardToWalletPay({ cardId: options.cardId });
  }
}
