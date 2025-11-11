import { InjectionToken, Provider } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { DigitalWalletStrategy } from '@modules/wallets/entities/digital-wallet-strategy.interface';
import { ApplePayStrategy } from '@modules/wallets/strategies/apple-pay.strategy';
import { Platform } from '@commons/constants/global.constants';
import { GooglePayStrategy } from '@modules/wallets/strategies/google-pay.strategy';

export const DIGITAL_WALLET_STRATEGY =
  new InjectionToken<DigitalWalletStrategy>('DigitalWalletStrategy');

export const DigitalWalletStrategyProvider: Provider = {
  provide: DIGITAL_WALLET_STRATEGY,
  useFactory: (): DigitalWalletStrategy => {
    const os = Capacitor.getPlatform();
    return os === Platform.IOS
      ? new ApplePayStrategy()
      : new GooglePayStrategy();
  }
};
