import { CellPhoneContactsComponent } from '@commons/components/cell-phone-contacts/cell-phone-contacts.component';
import { CellPhoneContactsProps } from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Subscription } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

export const Util = {
  isNative: () => Capacitor.getPlatform() !== 'web'
};

export function type(label: string): string {
  const typeCache: { [label: string]: boolean } = {};
  if (typeof label !== 'string') {
    throw new Error(`Action type "${label}" is not string"`);
  } else if (typeCache[label.toString()]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[label.toString()] = true;

  return label;
}

export function removeSubscriptions(subscriptions: Subscription[]): void {
  subscriptions
    .filter((subscription: Subscription) => !!subscription)
    .forEach((subscription: Subscription) => subscription.unsubscribe());
}

export function removeProperties(object: any, properties: string[]): any {
  return Object.keys(object)
    .filter((key) => !properties.includes(key))
    .reduce((beforeValue, key) => {
      beforeValue[key] = object[key];
      return beforeValue;
    }, {});
}

export function cancelSubscription(subscription: Subscription): void {
  if (!isNullOrUndefined(subscription)) {
    subscription.unsubscribe();
  }
}

export function exitApp(): void {
  /* eslint-disable @typescript-eslint/dot-notation */
  if (!isNullOrUndefined(navigator['app'])) {
    navigator['app'].exitApp();
  }
  /* eslint-enable @typescript-eslint/dot-notation */
}

export const showModalCellPhoneContacts = async (
  modalCtrl: ModalController,
  props: CellPhoneContactsProps = new CellPhoneContactsProps()
) => {
  const {
    showTabs,
    activeTab,
    avvContactsWorking$,
    avvContacts$,
    utagCategory
  } = props;
  const modal = await modalCtrl.create({
    component: CellPhoneContactsComponent,
    componentProps: {
      showTabs,
      activeTab,
      avvContacts$,
      avvContactsWorking$,
      utagCategory
    }
  });
  await modal.present();
  const { data } = await modal.onDidDismiss();
  return data;
};

export const isValidCellPhone = (phone: string): boolean | string => {
  const tel = phone?.replace(/\W/g, '').slice(-10) || '';
  if (tel.length === 10 && tel.charAt(0) === '3') {
    return `${tel.slice(0, 3)} ${tel.slice(3, 6)} ${tel.slice(6)}`;
  }
  return false;
};

export const isValidEmail = (email: string): boolean | string => {
  const emailRegexPattern =
    // eslint-disable-next-line max-len
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegexPattern.test(email)) {
    return email;
  }
  return false;
};

export const isGreaterThanZero = (value: number | string): boolean => {
  return parseInt(value.toString(), 10) > 0;
};

export const normalizeText = (text: string): string => {
  return !!text
    ? text
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    : text;
};

export const getScreenSize = (): string => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  return `${screenWidth}x${screenHeight}`;
};

export const getGeolocationInfo = async (): Promise<{
  latitude: string | null;
  longitude: string | null;
}> => {
  try {
    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };

    const currentPosition = await Geolocation.getCurrentPosition(
      defaultOptions
    );

    const coords = currentPosition?.coords;

    if (!coords) {
      console.warn('Geolocation returned no coordinates');
      return {
        latitude: null,
        longitude: null
      };
    }

    return {
      latitude: coords.latitude !== undefined ? `${coords.latitude}` : null,
      longitude: coords.longitude !== undefined ? `${coords.longitude}` : null
    };
  } catch (error) {
    console.error('Failed to get geolocation:', error);

    return {
      latitude: null,
      longitude: null
    };
  }
};

export const isAndroid = () => {
  return Capacitor.getPlatform() === 'android';
};
