import { Injectable } from '@angular/core';
import { MailboxItem } from '@commons/entities/notifications/mailbox.entities';
import {
  DataBasicClientDto,
  UserData
} from '@commons/entities/auth/auth.entities';
import { DeviceData } from '@commons/entities/device/device.interface';
import {
  NotificationItem,
  NotificationPayload
} from '@commons/entities/notifications/notification.entities';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Balance } from '@commons/entities/product/balance.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { Action } from '@ngrx/store';
import { ConfigState } from '@store/state/config.state';
import {
  FeatureFlagsBm,
  ParameterType,
  TermsAndConditions
} from '@store/state/parameter.state';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Product } from '@commons/entities/product/product.interface';
import { TransfiyaFingerprint } from '@store/state/transfiya-fingerprint.state';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { OPEN_EXTERNAL_URL_ALERT } from '@commons/constants/global.constants';
import { Campaign } from '@modules/marketing-campaigns/entities/marketing-campaigns.interface';
import { BasicDataClientFactory } from '@testing/factories/basic-data.factory';
import {
  EventBus,
  EventDriven
} from '@avaldigitallabs/adl-commons-lib-frontend-event-bus';

@Injectable()
export class AppFacadeMock {
  public workingParameters$: Observable<boolean> = new BehaviorSubject(null);

  public completedParameters$: Observable<boolean> = new BehaviorSubject(null);

  public interchangeCompleted$: Observable<boolean> = new BehaviorSubject(null);

  public workingNotifications$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public config$: Observable<ConfigState> = new BehaviorSubject({
    config: {
      idleTime: 1000,
      pingTime: 50000,
      date: ''
    },
    appLoaded: true,
    working: false,
    completed: true,
    message: ''
  });

  public deviceInfo$: Observable<DeviceData | any> = new BehaviorSubject({
    model: 'Macintosh',
    platform: 'web',
    appVersion: '',
    appBuild: '',
    appId: '',
    appName: '',
    operatingSystem: 'mac',
    osVersion: '10.15.2',
    manufacturer: 'Google Inc.',
    isVirtual: false,
    uuid: '3dc8d46f-4a26-4ce1-8fac-70f44428b89f',
    deviceSerial: '3dc8d46f-4a26-4ce1-8fac-70f44428b89f',
    deviceName: 'macintosh_mac_10.15.2',
    deviceOS: 'mac'
  });

  public transfiyaFingerprint$: Observable<TransfiyaFingerprint | any> =
    new BehaviorSubject({
      Geolocation: {
        city: 'Dublin',
        country: 'United States',
        ip: '3.13.132.40',
        isp: 'Amazon.com, Inc.'
      },
      Hash: {
        id: 'b9706a0b551e7dc614f56b92d75397f79bff8ee03c932e4885bd6991f59c923e'
      },
      General: {
        deviceId: '',
        hostname: 'Chrome',
        macAddress: 'Mac OS',
        passiveId: ''
      }
    });

  public isLogged$: Observable<boolean> = new BehaviorSubject(false);

  public hasProducts$: Observable<boolean> = new BehaviorSubject(null);

  public balance$: Observable<Balance[]> = new BehaviorSubject([]);

  public productFilter$: Observable<number> = new BehaviorSubject(null);

  public complementaryServicesState$: Observable<boolean> = new BehaviorSubject(
    null
  );

  public complementaryServicesError$: Observable<boolean> = new BehaviorSubject(
    null
  );

  public pushNotificationsState$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public date$: Observable<string> = new BehaviorSubject(
    '2021-01-22T15:34:03.901Z'
  );

  public userData$: Observable<UserData> = new BehaviorSubject(null);

  public featureToggleData$: Observable<any> = new BehaviorSubject(null);

  public featureFlagsMap$: Observable<Map<string, FeatureFlagsBm>> =
    new BehaviorSubject(new Map());

  public basicData$: Observable<DataBasicClientDto> = new BehaviorSubject(
    new BasicDataClientFactory().create()
  );

  public loginWithBiometric$: Observable<boolean> = new BehaviorSubject(null);

  public transfiyaList$: Observable<TransfiyaAuthorizationItem[]> =
    new BehaviorSubject([]);

  public notificationsList$: Observable<NotificationItem[]> =
    new BehaviorSubject([]);

  public transfiyaLoaded$: Observable<boolean> = new BehaviorSubject(false);

  public notificationsLoaded$: Observable<boolean> = new BehaviorSubject(false);

  public mailboxList$: Observable<MailboxItem[]> = new BehaviorSubject([]);

  public lastTransactionDate$: Observable<string> = new BehaviorSubject(null);

  public digitalDebitCards$: Observable<DigitalDebitCard[]> =
    new BehaviorSubject([]);

  public digitalDebitCardsCompleted$: Observable<boolean> = new BehaviorSubject(
    true
  );

  public parameterByKey(key: ParameterType): Observable<DropdownList | any[]> {
    return of([]);
  }

  public boundsByKey(key: string): number {
    return 10000;
  }

  public linkByKey(key: LinkKey): string {
    return '';
  }

  public featureFlagsByKey(key: string): boolean | FeatureFlagsBm {
    return true;
  }

  public isFeatureFlagEnabled(key: FeatureFlagsKey): Observable<boolean> {
    return of(true);
  }

  public termsAndConditionsByKey(key: string): TermsAndConditions {
    return {
      id: 'wallet',
      title: 'Términos y condiciones',
      content: '<h1>Contenido términos y condiciones</h1>'
    };
  }

  public boundsValue(key: ParameterKey): { value: string } {
    return { value: '' };
  }

  public marketingCampaignsByPlace(
    place: string,
    typeAccount?: TypeAccount
  ): Observable<Campaign> {
    return of(null);
  }

  public redirectExternal(key: LinkKey): void {}

  public fetchTransfiyaAuthorizationsIfNecessary(): void {}

  public fetchNotificationsIfNecessary(): void {}

  public fetchNotifications(payload: NotificationPayload): void {}

  public getTransfiyaAuthorizations(): void {}

  public logout(): void {}

  public appLoaded(): void {}

  public initInterchangeKey(): void {}

  public initUser(): void {}

  public dispatchPing(): void {}

  public fetchParameters(): void {}

  public setDeviceInfo(deviceInfo: DeviceData): void {}

  public setComplementaryServicesState(state: boolean): void {}

  public fetchDigitalDebitCardDetail(
    relativeParentId: string,
    alertSuccess: string = ''
  ): void {}

  public showToast(toastProperties: ToastProperties): void {}

  public closeToast(): void {}

  public closeModal(): void {}

  public enableLoading(): void {}

  public disableLoading(): void {}

  public updateLastTransactionDate(string): void {}

  public dispatch(actions: Action[]): void {}

  public setProductFilter(productFilter: number): void {}

  public canRequestDigitalDebitCard(): Observable<boolean> {
    return new BehaviorSubject(true);
  }

  public getProduct(typeAccount: TypeAccount, id: string): Product {
    return {};
  }

  public findProductByProductId(productId: string): Observable<Product> {
    return new BehaviorSubject({});
  }

  public openExternalLinks(
    url: string,
    target: '_self' | '_blank' = '_blank',
    alertProps: AlertSheetProperties = OPEN_EXTERNAL_URL_ALERT
  ): void {}

  public setTransfiyaFingerprint(transfiyaFingerprint: any): void {}
  public eventBus = EventBus.getInstance(
    false,
    EventDriven.CustomEvent | EventDriven.PostMessage
  );
}
