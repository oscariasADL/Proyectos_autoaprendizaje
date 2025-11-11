import {
  DigitalWallet,
  DigitalWalletEnrollCardEvents,
  DigitalWalletEventType
} from '@commons/capacitor-web-plugins/digital-wallet';

export const handleEnrollCardEvents: () => Promise<boolean> = () =>
  new Promise(async (resolve, reject) => {
    const listener = await DigitalWallet.addListener(
      DigitalWalletEventType.EnrollCardEvent,
      (event) => {
        const [eventKey] = Object.keys(event);
        const mapEnrollCardEventsResponse = {
          [DigitalWalletEnrollCardEvents.onCardsUpdated]: () => resolve(true)
        };
        void listener.remove();
        mapEnrollCardEventsResponse[eventKey]();
      }
    );
  });
