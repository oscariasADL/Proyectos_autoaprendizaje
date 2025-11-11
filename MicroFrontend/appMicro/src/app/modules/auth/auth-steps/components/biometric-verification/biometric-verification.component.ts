import {
  ModuleFederationToolsModule,
  WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Injector,
  NO_ERRORS_SCHEMA,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CustomEventService } from '@app/commons/services/custom-events.service';

import { environment as ENV } from '@environment';
import { IonicModule } from '@ionic/angular';
import {
  LEGAL_NAME,
  BIOMETRICS_TOPICS,
  BIOMETRICS_MICROFRONTEND_EVENTS,
  BiometricsActions,
  DOCUMENTS_TYPE_BY_BIOMETRICS,
  BIOMETRIC_VERIFICATION_STATUS,
  BIOMETRIC_MESSAGES_BY_CODE
} from './constants/biometrics.constants';
import { BANK_GROUP } from '@app/commons/constants/card.constants';
import { Capacitor } from '@capacitor/core';
import { AppFacade } from '@app/app.facade';
import { filter, take } from 'rxjs';
import { trackEvents } from '@app/commons/helpers/event.helpers';
import { EventType } from '@app/commons/entities/analytics/events.entities';
import {
  AuthStepPayload,
  AuthStepResponse,
  AuthStepType
} from '../../entities/auth-steps.interface';
import { AuthStepsBase } from '../../auth-steps.base';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import {
  BiometricData,
  BiometricPayload,
  OutputResponse,
  OutputResponseOverflow
} from './constants/biometrics.interface';
import {
  BIOMETRIC_FAILURE_URL_FOR_FORGOT_PASSWORD,
  BIOMETRIC_FAILURE_URL_FOR_REGISTER
} from '@app/commons/constants/navigate.constants';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import {
  LogMessageDetails,
  LogSeverity
} from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, ModuleFederationToolsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  selector: 'app-biometric-verification',
  templateUrl: './biometric-verification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiometricVerificationComponent
  extends AuthStepsBase
  implements OnInit, OnDestroy
{
  options: WebComponentWrapperOptions = {
    type: 'script',
    remoteEntry: ENV.microfrontends.biometrics.remoteEntryUrl,
    exposedModule: ENV.microfrontends.biometrics.exposedModule,
    elementName: ENV.microfrontends.biometrics.elementName,
    remoteName: ENV.microfrontends.biometrics.remoteName
  };

  private customEventService = inject(CustomEventService);
  private appFacade = inject(AppFacade);
  private logManagerService = inject(LogManagerService);

  private uuid: string = '';

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initDeviceData();
    this.initBiometricsAuthorization();
    this.waitForOutputResponse();
    this.waitForOutputResponseOverflow();
  }

  ngOnDestroy(): void {
    this.customEventService.clearStoredEvent();
  }

  private initDeviceData() {
    this.appFacade.deviceInfo$
      .pipe(
        filter((deviceInfo) => !!deviceInfo),
        take(1)
      )
      .subscribe(({ uuid }) => {
        this.uuid = uuid;
      });
  }

  private async initBiometricsAuthorization() {
    const db = await this.secureStorage.getAll();
    const { typeDocument, document } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );
    const biometricData: BiometricData = {
      authorization: this.biometricAuthorizer,
      uuid: this.uuid,
      device: this.getPlatform(),
      legalName: LEGAL_NAME,
      companyId: BANK_GROUP.VILLAS_CODE,
      documentType: DOCUMENTS_TYPE_BY_BIOMETRICS[typeDocument],
      identificationNumber: document
    };

    this.customEventService.publishCustomEvent(
      BIOMETRICS_TOPICS.BIOMETRIC_DATA,
      biometricData
    );
  }

  private waitForOutputResponse() {
    this.customEventService
      .subscribeToCustomEvent(BIOMETRICS_TOPICS.OUTPUT_RESPONSE)
      .subscribe(({ topicValue }: OutputResponse) => {
        this.trackBiometricResponse({
          severity: LogSeverity.INFO,
          fileName: 'biometric-verification.component.ts',
          functionName: 'waitForOutputResponse',
          customMessage: `[Biometric verification] response: ${JSON.stringify(
            topicValue.data
          )}`
        });
        const { message } = { ...topicValue.data };

        this.handleBiometricResponse(message, {
          messageCode: topicValue.data.messageCode,
          biometricProcessId: topicValue.processId,
          biometricToken: topicValue.biometricToken
        });
      });
  }

  private trackBiometricResponse(logMessageDetails: LogMessageDetails) {
    this.logManagerService.log(logMessageDetails);
  }

  private waitForOutputResponseOverflow() {
    this.customEventService
      .subscribeToCustomEvent(BIOMETRICS_TOPICS.OUTPUT_RESPONSE_OVERFLOW)
      .subscribe(({ topicValue }: OutputResponseOverflow) => {
        this.trackBiometricResponse({
          severity: LogSeverity.INFO,
          fileName: 'biometric-verification.component.ts',
          functionName: 'waitForOutputResponseOverflow',
          customMessage: `[Biometric verification] response: ${JSON.stringify(
            topicValue.data
          )}`
        });
        const { message } = {
          ...topicValue.data
        };
        this.handleBiometricResponse(message);
      });
  }

  private handleBiometricResponse(
    message: string,
    biometricPayload?: BiometricPayload
  ): void {
    message === BIOMETRIC_VERIFICATION_STATUS.SUCCESS
      ? this.handleBiometricSuccess(biometricPayload)
      : this.handleBiometricFailed();
  }

  private handleBiometricSuccess(biometricPayload: BiometricPayload): void {
    const biometricMessage = this.getBiometricMessage(
      biometricPayload.messageCode
    );

    this.handleTrackEvent(
      BIOMETRICS_MICROFRONTEND_EVENTS.success,
      `${BiometricsActions.RESPONSE_DATA_FROM_MICROFRONTEND_BIOMETRICS}: ${biometricMessage}`
    );

    this.method({
      processId: this.data.processId,
      content: {
        biometricProcessId: biometricPayload.biometricProcessId,
        biometricToken: biometricPayload.biometricToken
      }
    } as AuthStepPayload);
  }

  private getBiometricMessage(code: string): string {
    return (
      BIOMETRIC_MESSAGES_BY_CODE[code] ?? BIOMETRIC_MESSAGES_BY_CODE['UNKNOWN']
    );
  }

  private handleBiometricFailed(): void {
    this.handleTrackEvent(
      BIOMETRICS_MICROFRONTEND_EVENTS.error,
      BiometricsActions.RESPONSE_DATA_FROM_MICROFRONTEND_BIOMETRICS
    );
    const failureUrl = this.getBiometricVeriticationFailedUrl();

    this.router.navigate(failureUrl);
  }

  private getBiometricVeriticationFailedUrl() {
    return this.type === AuthStepType.forgotPassword
      ? BIOMETRIC_FAILURE_URL_FOR_FORGOT_PASSWORD
      : BIOMETRIC_FAILURE_URL_FOR_REGISTER;
  }

  private handleTrackEvent(path: string, pageName: string): void {
    trackEvents(path, pageName, EventType.DataToMicrofrontend);
  }

  private getPlatform(): string {
    return Capacitor.getPlatform().toUpperCase();
  }

  get enrollmentKey(): string {
    return this.data.enrollmentKey;
  }

  get biometricAuthorizer(): string {
    return this.data.biometricAuthorizer;
  }

  get method(): any {
    return this.routeData.method;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get type(): AuthStepType {
    return this.routeData.type;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
