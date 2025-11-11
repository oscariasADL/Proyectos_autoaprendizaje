import { registerPlugin } from '@capacitor/core';
import type { DigitalWalletPlugin } from './definitions';

const DigitalWallet = registerPlugin<DigitalWalletPlugin>('DigitalWallet', {
  web: () => import('./web').then((m) => new m.DigitalWalletPluginWeb())
});

export * from './definitions';
export { DigitalWallet };
