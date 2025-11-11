import {
  DigitalWallet,
  DigitalWalletCreateWalletEvents,
  DigitalWalletEventType,
  DigitalWalletProvisioningEligibilityEvents,
  DigitalWalletProvisioningInitEvents,
  DigitalWalletStatusEvents
} from '@commons/capacitor-web-plugins/digital-wallet';
import { Platform } from '@commons/constants/global.constants';
import { StartWalletModalProps } from '@modules/wallets/entities/wallets.interface';
import {
  START_WALLET_ANDROID_MODAL,
  START_WALLET_IOS_MODAL
} from '@modules/wallets/constants/wallets.constants';

export const handleWalletProvisioningStatusEvents: () => Promise<boolean> =
  () =>
    new Promise(async (resolve, reject) => {
      const listener = await DigitalWallet.addListener(
        DigitalWalletEventType.WalletStatusEvent,
        (event) => {
          const [eventKey] = Object.keys(event);
          const mapWalletProvisioningStatusEventsResponse = {
            [DigitalWalletStatusEvents.onProvisioningRequired]: () =>
              resolve(false),
            [DigitalWalletStatusEvents.onCredentialsRequired]: () =>
              reject(event[DigitalWalletStatusEvents.onCredentialsRequired]),
            [DigitalWalletStatusEvents.onConnectionSuccess]: () =>
              resolve(true),
            [DigitalWalletStatusEvents.onConnectionError]: () =>
              reject(event[DigitalWalletStatusEvents.onConnectionError])
          };
          void listener.remove();
          mapWalletProvisioningStatusEventsResponse[eventKey]();
        }
      );
    });

export const handleWalletProvisioningInitializeEvents: () => Promise<boolean> =
  () =>
    new Promise(async (resolve, reject) => {
      const listener = await DigitalWallet.addListener(
        DigitalWalletEventType.WalletProvisioningInitEvent,
        (event) => {
          const [eventKey] = Object.keys(event);
          const mapWalletProvisioningInitEventsResponse = {
            [DigitalWalletProvisioningInitEvents.onInitializationSuccess]: () =>
              resolve(true),
            [DigitalWalletProvisioningInitEvents.onInitializationError]: () =>
              reject(
                event[DigitalWalletProvisioningInitEvents.onInitializationError]
              )
          };
          void listener.remove();
          mapWalletProvisioningInitEventsResponse[eventKey]();
        }
      );
    });

export const handleWalletProvisioningEligibilityEvents: () => Promise<boolean> =
  () =>
    new Promise(async (resolve, reject) => {
      const listener = await DigitalWallet.addListener(
        DigitalWalletEventType.WalletEligibilityEvent,
        (event) => {
          const [eventKey] = Object.keys(event);
          const mapWalletProvisioningInitEventsResponse = {
            [DigitalWalletProvisioningEligibilityEvents.onDeviceEligible]: () =>
              resolve(true),
            [DigitalWalletProvisioningEligibilityEvents.onDeviceNotEligible]:
              () =>
                reject(
                  event[
                    DigitalWalletProvisioningEligibilityEvents
                      .onDeviceNotEligible
                  ]
                ),
            [DigitalWalletProvisioningEligibilityEvents.onCheckEligibilityError]:
              () =>
                reject(
                  event[
                    DigitalWalletProvisioningEligibilityEvents
                      .onDeviceNotEligible
                  ]
                )
          };
          void listener.remove();
          mapWalletProvisioningInitEventsResponse[eventKey]();
        }
      );
    });

export const handleCreateWalletEvents: () => Promise<boolean> = () =>
  new Promise(async (resolve, reject) => {
    const listener = await DigitalWallet.addListener(
      DigitalWalletEventType.CreateWalletEvent,
      (event) => {
        const [eventKey] = Object.keys(event);
        if (eventKey === DigitalWalletCreateWalletEvents.onProvisioningPending)
          return;
        const mapCreateWalletEventsResponse = {
          [DigitalWalletCreateWalletEvents.onProvisioningSuccess]: () =>
            resolve(true),
          [DigitalWalletCreateWalletEvents.onProvisioningError]: () =>
            reject(event[DigitalWalletCreateWalletEvents.onProvisioningError])
        };
        void listener.remove();
        mapCreateWalletEventsResponse[eventKey]();
      }
    );
  });

export function selectStartWalletModal(
  currentPlatform: string
): StartWalletModalProps {
  switch (currentPlatform) {
    case Platform.IOS.toString():
      return START_WALLET_IOS_MODAL;
    case Platform.ANDROID.toString():
      return START_WALLET_ANDROID_MODAL;
  }
}
