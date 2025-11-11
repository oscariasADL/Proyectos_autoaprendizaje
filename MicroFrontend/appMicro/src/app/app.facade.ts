/* eslint-disable max-lines */
import { Injectable, Injector } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import {
  DataBasicClientDto,
  UserData
} from '@commons/entities/auth/auth.entities';
import { DeviceData } from '@commons/entities/device/device.interface';
import { MailboxItem } from '@commons/entities/notifications/mailbox.entities';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Balance } from '@commons/entities/product/balance.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import {
  isNullOrUndefined,
  valueToNumberFormat
} from '@commons/helpers/text.helpers';
import { isLoggedSelector } from '@modules/auth/login/store/login.selector';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { fetchDigitalDebitCardDetailAction } from '@modules/digital-debit-card/store/digital-debit-card.actions';
import {
  digitalDebitCardCompletedSelector,
  digitalDebitCardsSelector
} from '@modules/digital-debit-card/store/digital-debit-card.selector';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import {
  balanceSelector,
  findProductInBalances,
  hasBalanceSelector
} from '@modules/product/store/product.selector';
import { setProductFilter } from '@modules/products/store/products.actions';
import { productFilterSelector } from '@modules/products/store/products.selector';
import * as configActions from '@store/actions/config.action';
import * as globalActions from '@store/actions/global.actions';
import { initInterchangeKeyAction } from '@store/actions/interchange.action';
import {
  disableLoadingAction,
  enableLoadingAction
} from '@store/actions/loading.action';
import { closeModalAction } from '@store/actions/modal.action';
import * as notificationsActions from '@store/actions/notifications.action';
import { updateLastTransactionDateAction } from '@store/actions/notifications.action';
import {
  fetchFeatureToggleAction,
  fetchParameterAction
} from '@store/actions/parameter.action';
import { closeToastsAction, toastAction } from '@store/actions/toast.action';
import {
  complementaryServicesErrorSelector,
  complementaryServicesStateSelector,
  featureToggleDataSelector
} from '@store/selectors/feature-toggle.selector';
import {
  notificationsListSelector,
  notificationsLoadedSelector,
  transfiyaListSelector,
  transfiyaLoadedSelector,
  workingNotificationsSelector
} from '@store/selectors/notifications.selector';
import { ConfigState } from '@store/state/config.state';
import {
  FeatureFlagsBm,
  ParameterList,
  ParameterType,
  TermsAndConditions
} from '@store/state/parameter.state';
import { State } from '@store/state/state';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Product } from '@commons/entities/product/product.interface';
import { TransfiyaFingerprint } from '@store/state/transfiya-fingerprint.state';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { OPEN_EXTERNAL_URL_ALERT } from '@commons/constants/global.constants';
import { featureFlagsMapParameterSelector } from '@store/selectors/feature-flags.selector';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import {
  Campaign,
  MarketingCampaigns
} from '@modules/marketing-campaigns/entities/marketing-campaigns.interface';
import { VirtualCreditCard } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import {
  virtualCreditCardCompletedSelector,
  virtualCreditCardListSelector,
  virtualCreditCardMaxCardsLimitSelector
} from '@modules/virtual-credit-card/store/virtual-credit-card.selector';
import { pushNotificationStatusSelector } from '@store/selectors/push-notification-register.selector';
import {
  EventBus,
  EventDriven
} from '@avaldigitallabs/adl-commons-lib-frontend-event-bus';
import { TxEvalTriggerAction } from './modules/product/store/product.actions';
import { SPITransactionEvent } from './modules/home/entities/spi-channel.entities';

@Injectable()
export class AppFacade {
  public workingParameters$: Observable<boolean> = this.store.pipe(
    select((store) => store.parameter.working)
  );

  public completedParameters$: Observable<boolean> = this.store.pipe(
    select((store) => store.parameter.completed)
  );

  public interchangeCompleted$: Observable<boolean> = this.store.pipe(
    select((store) => store.interchange.completed)
  );

  public interchangeDate$: Observable<Date> = this.store.pipe(
    select((store) => store.interchange.date)
  );

  public interchangePublicKey$: Observable<string> = this.store.pipe(
    select((store) => store.interchange.publicKey)
  );

  public interchangeKeyTimeoutId$: Observable<number> = this.store.pipe(
    select((store) => store.interchange.timeoutId)
  );

  public workingNotifications$: Observable<boolean> = this.store.pipe(
    select(workingNotificationsSelector)
  );

  public config$: Observable<ConfigState> = this.store.pipe(
    select((store) => store.config)
  );

  public deviceInfo$: Observable<DeviceData> = this.store.pipe(
    select((store) => store.device.deviceInfo)
  );

  public transfiyaFingerprint$: Observable<TransfiyaFingerprint> =
    this.store.pipe(select((store) => store.transfiyaFingerprint));

  public isLogged$: Observable<boolean> = this.store.pipe(
    select(isLoggedSelector)
  );

  public hasProducts$: Observable<boolean> = this.store.pipe(
    select(hasBalanceSelector)
  );

  public balance$: Observable<Balance[]> = this.store.pipe(
    select(balanceSelector)
  );

  public productFilter$: Observable<number> = this.store.pipe(
    select(productFilterSelector)
  );

  public complementaryServicesState$: Observable<boolean> = this.store.pipe(
    select(complementaryServicesStateSelector)
  );

  public complementaryServicesError$: Observable<boolean> = this.store.pipe(
    select(complementaryServicesErrorSelector)
  );

  public pushNotificationsState$: Observable<boolean> = this.store.pipe(
    select(pushNotificationStatusSelector)
  );

  public date$: Observable<string> = this.config$.pipe(
    filter((state: ConfigState) => state.completed),
    map((state: ConfigState) => state.config.date)
  );

  public userData$: Observable<UserData> = this.store.pipe(
    select((store) => store.user.data)
  );

  public basicData$: Observable<DataBasicClientDto> = this.store.pipe(
    select((store) => store.user.basic)
  );

  public featureToggleData$: Observable<any> = this.store.pipe(
    select(featureToggleDataSelector)
  );

  public featureFlagsMap$: Observable<Map<string, FeatureFlagsBm>> =
    this.store.pipe(select(featureFlagsMapParameterSelector));

  public loginWithBiometric$: Observable<boolean> = this.store.pipe(
    select((store) => store.user.loginWithBiometric)
  );

  public transfiyaList$: Observable<TransfiyaAuthorizationItem[]> =
    this.store.pipe(select(transfiyaListSelector));

  public notificationsList$: Observable<NotificationItem[]> = this.store.pipe(
    select(notificationsListSelector)
  );

  public transfiyaLoaded$: Observable<boolean> = this.store.pipe(
    select(transfiyaLoadedSelector)
  );

  public notificationsLoaded$: Observable<boolean> = this.store.pipe(
    select(notificationsLoadedSelector)
  );

  public mailboxList$: Observable<MailboxItem[]> = this.store.pipe(
    select((store) => store.mailbox.mailboxList)
  );

  public lastTransactionDate$: Observable<string> = this.store.pipe(
    select((store) => store.notifications.lastTransactionDate)
  );

  public digitalDebitCards$: Observable<DigitalDebitCard[]> = this.store.pipe(
    select(digitalDebitCardsSelector)
  );

  public digitalDebitCardsCompleted$: Observable<boolean> = this.store.pipe(
    select(digitalDebitCardCompletedSelector)
  );

  public virtualCreditCards$: Observable<VirtualCreditCard[]> = this.store.pipe(
    select(virtualCreditCardListSelector)
  );

  public virtualCreditCardsCompleted$: Observable<boolean> = this.store.pipe(
    select(virtualCreditCardCompletedSelector)
  );

  public virtualCreditCardMaxCardsLimit$: Observable<number> = this.store.pipe(
    select(virtualCreditCardMaxCardsLimitSelector)
  );

  constructor(protected store: Store<State>, protected injector: Injector) {}

  public getFeatureFlagData(): Observable<DropdownList[] | any[] | any> {
    return this.store.pipe(
      select((store) => store.parameter?.catalogue),
      filter((data) => !isNullOrUndefined(data)),
      map((data: ParameterList) => data.featureFlagsBm)
    );
  }

  public parameterByKey(
    key: ParameterType
  ): Observable<DropdownList[] | any[] | any> {
    return this.store.pipe(
      select((store) => store.parameter?.catalogue),
      filter((data) => !isNullOrUndefined(data)),
      map((data: ParameterList) => data[key])
    );
  }

  public boundsByKey(key: string, parse: boolean = true): number {
    return this.parameterByKey(ParameterType.bounds)
      .pipe(
        filter((list) => !isNullOrUndefined(list)),
        take(1),
        map((list) => {
          const la = list.find((item) => item.label === key)?.value;
          return la;
        }),
        map((value) => (parse ? parseInt(value, 10) : value))
      )
      .currentValue();
  }

  public linkByKey(key: LinkKey): string {
    return this.parameterByKey(ParameterType.links)
      .pipe(map((list) => list.find((item) => item.label === key)?.value))
      .currentValue();
  }

  public featureFlagsByKey(key: string): string | boolean {
    return this.getFeatureFlagData()
      .pipe(
        map((list: any) => {
          const parameter = list.find((item) => item.featureName === key);
          return parameter.value;
        })
      )
      .currentValue();
  }

  public isFeatureFlagEnabled(key: FeatureFlagsKey): Observable<boolean> {
    return this.featureFlagsMap$.pipe(
      filter(
        (featuresMap) => !isNullOrUndefined(featuresMap) && featuresMap.size > 0
      ),
      map((featuresMap: Map<string, FeatureFlagsBm>) => {
        if (!featuresMap.has(key)) return true;
        const feature: FeatureFlagsBm = featuresMap.get(key);
        return feature.value;
      })
    );
  }

  public termsAndConditionsByKey(key: string): TermsAndConditions {
    return this.parameterByKey(ParameterType.termsAndConditions)
      .pipe(
        map((list: any) =>
          list.find((item: TermsAndConditions) => item.id === key)
        )
      )
      .currentValue();
  }

  public boundsValue(key: ParameterKey): { value: string } {
    const bound = this.boundsByKey(key);
    const value = key.includes('$')
      ? valueToNumberFormat(bound)
      : bound.toString();
    return { value };
  }

  public marketingCampaignsByPlace(
    place: string,
    typeAccount?: TypeAccount
  ): Observable<Campaign> {
    return this.parameterByKey(ParameterType.marketingCampaignsBm).pipe(
      filter(
        (campaigns) => !isNullOrUndefined(campaigns) && campaigns?.length > 0
      ),
      map(({ campaigns }: MarketingCampaigns) =>
        campaigns.find((item: Campaign) => {
          const placeMatches = item.place.includes(place);
          const isEmptyTypes = item?.accountTypesAllowed?.length === 0;
          const accountTypeMatches = item.accountTypesAllowed?.some(
            (type) => typeAccount?.toString() === type
          );
          return (
            placeMatches &&
            item.isActive &&
            (isEmptyTypes || accountTypeMatches)
          );
        })
      )
    );
  }

  public redirectExternal(
    key: LinkKey,
    target: '_self' | '_blank' = '_self'
  ): void {
    window.open(this.linkByKey(key), target);
  }

  public setProductFilter(productFilter: number): void {
    this.store.dispatch(setProductFilter({ productFilter }));
  }

  public fetchTransfiyaAuthorizationsIfNecessary(): void {
    this.store.dispatch(
      notificationsActions.fetchTransfiyaAuthorizationsIfNecessaryAction()
    );
  }

  public fetchNotificationsIfNecessary(): void {
    this.store.dispatch(
      notificationsActions.fetchNotificationsIfNecessaryAction()
    );
  }

  public fetchNotifications(): void {
    this.store.dispatch(notificationsActions.fetchNotificationsAction());
  }

  public getTransfiyaAuthorizations(): void {
    this.store.dispatch(
      notificationsActions.fetchTransfiyaAuthorizationsAction()
    );
  }

  public logout(
    redirectToLogin: boolean = true,
    closeModal: boolean = true
  ): void {
    this.store.dispatch(
      globalActions.logoutUserAction({ redirectToLogin, closeModal })
    );
  }

  public appLoaded(): void {
    this.store.dispatch(configActions.appLoadedAction());
  }

  public initInterchangeKey(): void {
    this.store.dispatch(initInterchangeKeyAction());
  }

  public initUser(redirectHome: boolean = false): void {
    this.store.dispatch(globalActions.initUserAction({ redirectHome }));
  }

  public dispatchPing(): void {
    this.store.dispatch(configActions.dispatchPingAction());
  }

  public fetchParameters(): void {
    this.store.dispatch(fetchParameterAction());
    this.store.dispatch(fetchFeatureToggleAction());
  }

  public fetchFeatureToggle(): void {
    this.store.dispatch(fetchFeatureToggleAction());
  }

  public setDeviceInfo(deviceInfo: DeviceData): void {
    this.store.dispatch(globalActions.setDeviceInfo({ deviceInfo }));
  }

  public setGeolocationInfo(latitude: string, longitude: string): void {
    this.store.dispatch(
      globalActions.setGeolocationInfo({ latitude, longitude })
    );
  }

  public setTransfiyaFingerprint(transfiyaFingerprint: any): void {
    this.store.dispatch(
      globalActions.setTransfiyaFingerprint({ ...transfiyaFingerprint })
    );
  }

  public setComplementaryServicesState(state: boolean): void {
    this.store.dispatch(
      globalActions.setComplementaryServicesStateAction({ state, error: false })
    );
  }

  public showToast(toastProperties: ToastProperties): void {
    this.store.dispatch(toastAction({ props: toastProperties }));
  }

  public fetchDigitalDebitCardDetail(
    relativeParentId: string,
    alertSuccess: string = '',
    warningSuccess: string = ''
  ): void {
    this.store.dispatch(
      fetchDigitalDebitCardDetailAction({
        relativeParentId,
        alertSuccess,
        warningSuccess
      })
    );
  }

  public closeToast(): void {
    this.store.dispatch(closeToastsAction());
  }

  public closeModal(): void {
    this.store.dispatch(closeModalAction());
  }

  public enableLoading(): void {
    this.store.dispatch(enableLoadingAction(null));
  }

  public disableLoading(): void {
    this.store.dispatch(disableLoadingAction());
  }

  public updateLastTransactionDate(lastTransactionDate: string): void {
    this.store.dispatch(
      updateLastTransactionDateAction({ lastTransactionDate })
    );
  }

  public dispatch(actions: Action[]): void {
    actions.forEach((action) => this.store.dispatch(action));
  }

  public canRequestDigitalDebitCard(): Observable<boolean> {
    const balanceFiltered = mapProductsByFilter(this.balance$.currentValue(), {
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    });
    const digitalDebitCards =
      this.digitalDebitCards$
        .currentValue()
        ?.map((card) => card?.relativeParentId) || [];
    const balanceWithoutCard = balanceFiltered?.filter(
      (product) => !digitalDebitCards.includes(product?.id)
    );
    return of(balanceWithoutCard?.length !== 0);
  }

  public getProduct(typeAccount: TypeAccount, id: string): Product {
    const balanceFiltered = mapProductsByFilter(this.balance$.currentValue(), {
      typeAccountProduct: typeAccount
    });
    return balanceFiltered?.find((product) => product?.id === id);
  }

  public findProductByProductId(productId: string): Observable<Product> {
    return this.store.pipe(select(findProductInBalances(productId)));
  }

  public openExternalLinks(
    url: string,
    target: '_self' | '_blank' = '_blank',
    alertProps: AlertSheetProperties = OPEN_EXTERNAL_URL_ALERT,
    closeModalId: string = null,
    asyncCall?: Observable<any>
  ): void {
    this.store.dispatch(
      globalActions.openExternalUrl({
        url,
        target,
        alertProps,
        closeModalId,
        ObservablePostCall: asyncCall
      })
    );
  }

  public openDeepLink(url: string): void {
    this.store.dispatch(globalActions.openDeepLink({ url }));
  }
  public eventBus = EventBus.getInstance(
    false,
    EventDriven.CustomEvent | EventDriven.PostMessage
  );
  public evalTx(payload: SPITransactionEvent) {
    this.store.dispatch(TxEvalTriggerAction({ payload }));
  }
}
