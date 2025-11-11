/* eslint-disable max-lines */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Actions, ofType } from '@ngrx/effects';
import { defer, from, Observable, of } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { addDays, format, isAfter, parseISO } from 'date-fns';

import { StoreRating } from '@commons/capacitor-web-plugins/store-rating';
import { AppFacade } from '@app/app.facade';
import {
  BLACKLIST_AUTHORIZED_URLS,
  BLACKLIST_TEXT_URLS,
  INTERCHANGE_KEY_URL,
  URL_WITH_CUSTOM_FACTS_REQUIRED
} from '@commons/constants/authorized-urls.constants';
import { OneSpanStorageItem } from '@avaldigitallabs/one-span-secure-storage';
import {
  HttpHeadersData,
  HttpHeadersName,
  HttpMethods,
  NEEDS_DECRYPTION,
  NEEDS_ENCRYPTION
} from '@commons/constants/header.constants';
import { HttpStatus } from '@commons/constants/http.constants';
import { SecureKeys } from '@commons/constants/keys.constants';
import {
  FEATURE_THAT_SHOW_RATING,
  FEATURE_THAT_SHOW_SURVEY
} from '@commons/constants/store-rating.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import {
  getDBValue,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty,
  urlWithCorrelation
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { decryptAES, encryptAES } from '@commons/utils/encrypt';
import { environment as ENV } from '@environment';
import { CLEAR_ACTION } from '@store/reducers/clear.reducer';
import { mapError } from '../helpers/http.helpers';
import { TransferSurveyComponent } from '@modules/transfers/components/transfer-survey/transfer-survey.component';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  logInterceptorEvent,
  validateApprovalId
} from '@commons/interceptors/helpers/bavv-mb-interceptor.helpers';
import { DeviceData } from '../entities/device/device.interface';
import { mapCustomFacts } from '@app/modules/product-options/recharges/mappers/recharges-payload.mapper';
import { LogManagerService } from '../services/log-manager-service/log-manager-service.service';
import { LogSeverity } from '../services/log-manager-service/entities/log-manager-service.interface';
import { NavController } from '@ionic/angular';
import { OFFLINE } from '../constants/navigate.constants';
import { DEVICE_TOKEN_URLS } from '../constants/authorized-urls.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Injectable({
  providedIn: 'root'
})
export class BavvMbInterceptor implements HttpInterceptor {
  constructor(
    private facade: AppFacade,
    private actions$: Actions,
    private secureStorage: AdlSecureStorageService,
    private toastrService: ToastrService,
    private modalCtrl: ModalController,
    private logManagerService: LogManagerService,
    private navctrl: NavController
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.db(request)
      .pipe(
        mergeMap((db) => {
          const parseUrl = request.url;
          let handle: Observable<HttpEvent<any>> = next.handle(request);
          if (this.requestNeedsToBeMapped(parseUrl)) {
            handle = next.handle(this.mapRequest(request, db));
          }

          return handle.pipe(
            map((event) => this.mapResponse(event, request, db)),
            tap(
              (event) => this.checkResponse(event),
              (error) => this.checkError(error, request, db)
            ),
            takeUntil(this.actions$.pipe(ofType(CLEAR_ACTION)))
          );
        })
      )
      .pipe(
        mergeMap((response) =>
          defer(async () => {
            await this.checkNetwork(request);
            return response;
          })
        )
      );
  }

  private db(request: HttpRequest<any>): Observable<OneSpanStorageItem[]> {
    const needsInterchange =
      ENV.encrypt &&
      this.requestNeedsToBeMapped(request.url) &&
      NEEDS_ENCRYPTION.includes(request.method as HttpMethods);

    return from(Promise.resolve({})).pipe(
      mergeMap(() =>
        needsInterchange
          ? this.facade.interchangeCompleted$.pipe(
              filter((completed) => completed),
              take(1)
            )
          : Promise.resolve({})
      ),
      mergeMap(() => this.secureStorage.getAll()),
      take(1)
    );
  }

  private validateLastTransactionDate(event: any): void {
    const transactionDate =
      event?.body?.transactionDate || event?.body?.paymentDate;
    if (!!transactionDate) {
      try {
        this.facade.updateLastTransactionDate(
          format(parseISO(transactionDate), 'dd/MM/yyyy - hh:mm a')
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  private async requestSurvey(event: any) {
    const surveyActiveFeature = this.facade.boundsByKey(
      ParameterKey.surveyActiveFeature,
      false
    );
    if (
      !isNullOrUndefined(surveyActiveFeature) &&
      event.url.includes(FEATURE_THAT_SHOW_SURVEY[surveyActiveFeature])
    ) {
      const db = await this.secureStorage.getAll();
      const surveyLastDate = getDBValue(db, SecureKeys.surveyLastDate);
      const surveyFrequencyInDays = this.facade.boundsByKey(
        ParameterKey.surveyFrequencyInDays
      );
      const currentDate = this.facade.date$.currentValue();
      if (
        isNullOrUndefined(surveyLastDate) ||
        (!isNullOrUndefined(surveyLastDate) &&
          isAfter(
            parseISO(currentDate),
            addDays(parseISO(surveyLastDate), surveyFrequencyInDays)
          ))
      ) {
        this.showTransferToast();
      }
    }
  }

  private async requestStoreRating(event: any): Promise<void> {
    if (FEATURE_THAT_SHOW_RATING.some((url) => event.url.includes(url))) {
      const db = await this.secureStorage.getAll();
      const storeRateLastDate = getDBValue(db, SecureKeys.storeRateLastDate);
      const ratingFrequencyInDays = this.facade.boundsByKey(
        ParameterKey.ratingFrequencyInDays
      );
      const currentDate = this.facade.date$.currentValue();

      if (
        isNullOrUndefined(storeRateLastDate) ||
        (!isNullOrUndefined(storeRateLastDate) &&
          isAfter(
            parseISO(currentDate),
            addDays(parseISO(storeRateLastDate), ratingFrequencyInDays)
          ))
      ) {
        await this.secureStorage.put(
          SecureKeys.storeRateLastDate,
          currentDate,
          true
        );
        await StoreRating.requestReview();
      }
    }
  }

  private mapResponse(
    event: any,
    request: HttpRequest<any>,
    db: OneSpanStorageItem[]
  ): HttpResponse<any> {
    if (
      ENV.encrypt &&
      event instanceof HttpResponse &&
      this.requestNeedsToBeMapped(request.url) &&
      NEEDS_DECRYPTION.includes(request.method as HttpMethods) &&
      !isNullOrUndefinedOrEmpty(event?.body)
    ) {
      let decryptedBody;

      try {
        //TODO: Should be removed
        logInterceptorEvent(
          this.logManagerService,
          LogSeverity.INFO,
          db,
          `Testing service [URL]: ${request.url}. [STATUS]: ${event.status}`
        );

        const decryptAESBody = decryptAES(
          event?.body,
          getDBValue(db, SecureKeys.randomKey)
        );

        decryptedBody = this.isBlacklistTextUrls(request.url)
          ? decryptAESBody
          : JSON.parse(decryptAESBody);

        if (this.isWhitelistDTUrls(request.url)) {
          const deviceTokenCookie =
            event.headers.get(HttpHeadersName.DEVICE_TOKEN_COOKIE) ?? '';
          this.secureStorage.put(
            SecureKeys.deviceTokenCookie,
            deviceTokenCookie,
            true
          );
        }
      } catch (error) {
        logInterceptorEvent(
          this.logManagerService,
          LogSeverity.ERROR,
          db,
          `Logging error`,
          error
        );

        throw new HttpErrorResponse({
          status: error.status,
          error: mapError(error)
        });
      }

      event = event.clone({ body: decryptedBody });
    }
    return event;
  }

  private checkResponse(event: any): void {
    if (event instanceof HttpResponse) {
      this.validateLastTransactionDate(event);
      if (event?.status === HttpStatus.Accepted) {
        throw new HttpErrorResponse({
          status: HttpStatus.BadRequest,
          error: {
            code: event?.body?.code || 0,
            description: event?.body?.description || 'Error'
          }
        });
      } else {
        validateApprovalId(event);
        this.requestStoreRating(event);
        this.requestSurvey(event);
      }
    }
  }

  private checkError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    db: OneSpanStorageItem[]
  ): void {
    const urlLogin = ENV.api.services.auth.login;
    const urlLogout = ENV.api.services.auth.logout;
    const urlChangePass = ENV.api.services.auth.change_expired_password;
    const isLoginUrl: boolean = request.url.includes(urlLogin);
    const isLogoutUrl: boolean = request.url.includes(urlLogout);
    const isChangePasswordUrl: boolean = request.url.includes(urlChangePass);
    const isError: boolean =
      error instanceof HttpErrorResponse &&
      !isLoginUrl &&
      !isLoginUrl &&
      !isLogoutUrl &&
      !isChangePasswordUrl;
    this.requestSurvey(error);

    logInterceptorEvent(
      this.logManagerService,
      LogSeverity.ERROR,
      db,
      `Testing service response [URL]: ${request.url}. [STATUS]: ${error.status}`,
      error
    );

    if (isError && error.status === HttpStatus.Unauthorized) {
      this.facade.logout();
    } else if (
      ENV.encrypt &&
      error instanceof HttpErrorResponse &&
      this.requestNeedsToBeMapped(request.url) &&
      NEEDS_DECRYPTION.includes(request.method as HttpMethods)
    ) {
      let decryptedBody;

      try {
        decryptedBody = JSON.parse(
          decryptAES(error?.error, getDBValue(db, SecureKeys.randomKey))
        );
      } catch (err) {
        throw new HttpErrorResponse({
          status: err.status,
          error: mapError(err)
        });
      }

      throw new HttpErrorResponse({
        status: error.status,
        error: decryptedBody
      });
    }
  }

  private async checkNetwork(request: HttpRequest<any>): Promise<void> {
    if (
      request.method === HttpMethods.post ||
      request.url.includes(INTERCHANGE_KEY_URL)
    ) {
      const networkStatus: ConnectionStatus = await Network.getStatus();
      if (!networkStatus.connected) {
        throw new HttpErrorResponse({
          status: HttpStatus.BadRequest,
          error: {
            code: 0,
            description: 'Revisa tu conexión a Internet e inténtalo de nuevo'
          }
        });
      }
    }
  }

  private requestNeedsToBeMapped(url: string): boolean {
    const apiGatewayBreBTransfer: string = this.facade.featureFlagsByKey(
      FeatureFlagsKey.NewEndPointTransferBreB
    ) as string;
    return (
      (url.includes(apiGatewayBreBTransfer) ||
        url.includes(ENV.api.server_url)) &&
      !urlWithCorrelation(url, BLACKLIST_AUTHORIZED_URLS)
    );
  }

  private isBlacklistTextUrls(url: string): boolean {
    return (
      url.includes(ENV.api.server_url) &&
      urlWithCorrelation(url, BLACKLIST_TEXT_URLS)
    );
  }

  private isWhitelistDTUrls(url: string): boolean {
    return (
      url.includes(ENV.api.server_url) &&
      urlWithCorrelation(url, DEVICE_TOKEN_URLS)
    );
  }

  private logoutIfNecessary(): void {
    if (this.facade.isLogged$.currentValue()) {
      this.facade.logout();
    }
  }

  private mapRequest(request: HttpRequest<any>, db: any): HttpRequest<any> {
    let body: any = request.body;
    let headers: HttpHeaders = request.headers;

    const responseType = 'text';
    const token = getDBValue(db, SecureKeys.token);
    const isLoginRequest =
      request.method === HttpMethods.post &&
      request.url.includes(ENV.api.services.auth.login);

    if (this.isWhitelistDTUrls(request.url)) {
      const deviceTokenCookie = getDBValue(db, SecureKeys.deviceTokenCookie);
      headers = headers.append(
        HttpHeadersName.DEVICE_TOKEN_COOKIE,
        deviceTokenCookie ?? ''
      );
    }
    if (!isNullOrUndefinedOrEmpty(token) || isLoginRequest) {
      headers = headers.append(
        HttpHeadersName.AUTHORIZATION,
        isLoginRequest
          ? `Basic ${btoa(ENV.ath_auth.user + ':' + ENV.ath_auth.pass)}`
          : `Bearer ${token}`
      );
    }

    if (ENV.encrypt) {
      const sessionHash = getDBValue(db, SecureKeys.sessionHash);
      const fingerprint = getDBValue(db, SecureKeys.fingerprint);
      const randomKey = getDBValue(db, SecureKeys.randomKey);

      if (!isNullOrUndefinedOrEmpty(sessionHash)) {
        headers = headers.append(HttpHeadersName.X_SESSION_HASH, sessionHash);
      }

      if (!isNullOrUndefinedOrEmpty(fingerprint)) {
        headers = headers.append(HttpHeadersName.X_DEVICE_SERIAL, fingerprint);
      }

      if (
        !isNullOrUndefined(randomKey) &&
        NEEDS_ENCRYPTION.includes(request.method as HttpMethods)
      ) {
        if (this.shouldModifyPayload(request)) {
          this.modifyPayloadIfNeeded(request.body)
            .pipe(take(1))
            .subscribe((modifiedBody) => {
              body = encryptAES(JSON.stringify(modifiedBody), randomKey);
            });
        } else {
          body = encryptAES(JSON.stringify(request.body), randomKey);
        }
      }
    } else {
      if (this.shouldModifyPayload(request)) {
        this.modifyPayloadIfNeeded(request.body)
          .pipe(take(1))
          .subscribe((modifiedBody) => {
            body = modifiedBody;
          });
      }
    }

    headers = headers.append(
      HttpHeadersName.CONTENT_TYPE,
      HttpHeadersData.CONTENT_TYPE
    );

    if (ENV.log_request) {
      console.log(
        `request: ${request.urlWithParams} method: ${request.method}`
      );
    }

    return request.clone({
      ...{ headers, body },
      ...(ENV.encrypt ? { responseType } : {})
    });
  }

  private modifyPayloadIfNeeded(body: any): Observable<any> {
    return this.facade.deviceInfo$.pipe(
      map((deviceInfo: DeviceData) => ({
        ...body,
        customFacts: mapCustomFacts(deviceInfo)
      }))
    );
  }

  private shouldModifyPayload(request: HttpRequest<any>): boolean {
    const servicesThatNeedModification = URL_WITH_CUSTOM_FACTS_REQUIRED;
    return servicesThatNeedModification.some((service) =>
      request.url.includes(service)
    );
  }

  private showTransferToast() {
    this.toastrService
      .show(
        null,
        '<b>¿Cómo te va con la nueva app?</b> Responde aquí <img src="assets/img/icons/chevron-right.svg">',
        {
          disableTimeOut: false,
          tapToDismiss: true,
          toastClass: 'avv-toast-info ngx-toastr avv-toast-survey',
          closeButton: false,
          enableHtml: true
        }
      )
      .onTap.subscribe((data) => {
        this.showSurvey();
      });
  }

  private async showSurvey(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TransferSurveyComponent,
      componentProps: {},
      id: 'avv-transfer-survey-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal',
      backdropDismiss: false,
      keyboardClose: false
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data)) {
    }
  }
}
