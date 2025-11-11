import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { Platform } from '@commons/constants/global.constants';
import {
  DEBIT_CARD_BIN,
  WALLET_CONTINUE_PROCESS_APPLE_WALLET_ALERT,
  WALLET_CONTINUE_PROCESS_GOOGLE_WALLET_ALERT
} from '@modules/wallets/constants/wallets.constants';
import {
  DigitalCardStructureExt,
  GroupedDigitalCards
} from '@modules/wallets/entities/wallets.interface';

export function showContinueWalletProcessAlert(
  currentPlatform: string
): AlertSheetProperties {
  switch (currentPlatform.toString()) {
    case Platform.IOS.toString():
      return WALLET_CONTINUE_PROCESS_APPLE_WALLET_ALERT;
    case Platform.ANDROID.toString():
      return WALLET_CONTINUE_PROCESS_GOOGLE_WALLET_ALERT;
    default:
      return WALLET_CONTINUE_PROCESS_GOOGLE_WALLET_ALERT;
  }
}

export function mapGroupDigitalCards(
  digitalCards: DigitalCardStructureExt[]
): GroupedDigitalCards[] {
  const grouped = digitalCards.reduce((acc, card) => {
    const type = card.bin.includes(DEBIT_CARD_BIN) ? 'debit' : 'credit';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(card);
    return acc;
  }, {} as Record<'debit' | 'credit', DigitalCardStructureExt[]>);

  return Object.entries(grouped).map(([type, cards]) => ({
    type,
    cards
  }));
}
