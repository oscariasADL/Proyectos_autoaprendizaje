import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';

import { OtpAutocomplete } from '@commons/capacitor-web-plugins/otp-autocomplete';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue } from '@commons/helpers/text.helpers';
import { environment as ENV } from '@environment';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import {
  AuthStepResponse,
  AuthStepType
} from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { otpValidators } from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { TIME_WAIT_TO_REQUEST_AGAIN_OTP } from '@modules/auth/auth-steps/constants/auth-steps.constants';
import { firstValueFrom, take, tap } from 'rxjs';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-fill-otp-data',
  templateUrl: './fill-otp-data.component.html',
  styleUrls: ['./fill-otp-data.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillOtpDataComponent
  extends AuthStepsBase
  implements OnInit, OnDestroy
{
  public form: UntypedFormGroup;
  public requestOtpEnable: boolean = false;
  public timeWaitRequestOtp: number = TIME_WAIT_TO_REQUEST_AGAIN_OTP;
  public isRequestOTPEnabled: boolean = true;

  private otpListener: PluginListenerHandle;
  private isAutomaticOtp: boolean = false;
  private isBiometricsEnrrollmentEnabled: boolean = false;
  private isForgotPasswordWithBiometricsEnabled: boolean = false;

  constructor(protected injector: Injector, private cdRef: ChangeDetectorRef) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.validateRequestOTP();
    this.validateOtpAutocomplete();
    this.countDownRequestOtp();
  }

  ngOnDestroy(): void {
    if (!!this.otpListener) {
      void this.otpListener.remove();
    }
  }

  public async run(): Promise<void> {
    if (this.form.valid) {
      const { deviceName } = await firstValueFrom(this.facade.deviceInfo$);

      const db = await this.secureStorage.getAll();
      const fingerprint = getDBValue(db, SecureKeys.fingerprint);

      this.updateOtpReceived();
      this.method({
        processId: this.data.processId,
        content: {
          forceOtpGeneration: 'false',
          otpValue: this.form.value.otp,
          deviceSerial: fingerprint,
          deviceName,
          isAutomaticOtp: ENV.validate_automatic_otp
            ? this.isAutomaticOtp
            : true
        }
      });
    }
  }

  public requestNewOtp(): void {
    if (this.requestOtpEnable) {
      this.method({
        processId: this.data.processId,
        content: {
          forceOtpGeneration: 'true',
          otpValue: ''
        }
      });
    }
  }

  public onOtpAutocompleteInIOS(otpValue: string): void {
    this.isAutomaticOtp = true;
    this.otp.setValue(otpValue);
    this.otp.updateValueAndValidity();
    void this.run();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      otp: [null, [Validators.required, otpValidators.bind(this)]]
    });

    this.facade
      .isFeatureFlagEnabled(FeatureFlagsKey.BiometricsEnrollment)
      .pipe(
        take(1),
        tap(
          (isEnabled: boolean) =>
            (this.isBiometricsEnrrollmentEnabled = isEnabled)
        )
      )
      .subscribe();

    this.facade
      .isFeatureFlagEnabled(FeatureFlagsKey.ForgotPasswordWithBiometrics)
      .pipe(
        take(1),
        tap(
          (isEnabled: boolean) =>
            (this.isForgotPasswordWithBiometricsEnabled = isEnabled)
        )
      )
      .subscribe();
  }

  private validateOtpAutocomplete(): void {
    if (['web', 'android'].includes(Capacitor.getPlatform())) {
      this.OtpAutocomplete.listenOtpOnAndroid({
        senderCode: ENV.otp_sender_code
      })
        .then(async ({ success: ok }) => {
          if (ok) {
            this.otpListener = await this.OtpAutocomplete.addListener(
              'otpReceivedEvent',
              (data) => {
                if (!!data) {
                  const { success, msg, otp } = data;
                  if (success) {
                    this.isAutomaticOtp = true;
                    this.otp.setValue(otp);
                    this.otp.updateValueAndValidity();
                    void this.run();
                  } else {
                    void this.analytics.sendError('OtpAutocomplete error', msg);
                  }
                }
              }
            );
          }
        })
        .catch((error) =>
          this.analytics.sendError('OtpAutocomplete error', error)
        );
    }
  }

  private countDownRequestOtp(): void {
    if (this.isEnrollmentOrForgotPass) {
      this.requestOtpEnable = false;
      const timer = setInterval(() => {
        this.timeWaitRequestOtp -= 1;
        this.cdRef.detectChanges();
        if (this.timeWaitRequestOtp === 0) {
          clearInterval(timer);
          this.requestOtpEnable = true;
          this.cdRef.detectChanges();
        }
      }, 1000);
    }
  }

  private async validateRequestOTP() {
    const db = await this.secureStorage.getAll();
    const OTPReceivedData = getDBValue(db, SecureKeys.OTPReceived);

    if (this.isBiometricsEnabled()) {
      this.isRequestOTPEnabled = !JSON.parse(OTPReceivedData);
    } else {
      this.isRequestOTPEnabled = true;
    }
  }

  private async updateOtpReceived() {
    if (this.isBiometricsEnabled()) {
      await this.secureStorage.put(SecureKeys.OTPReceived, 'true', true);
    }
  }

  //TODO: Should be removed when biometrics is the only authentication method
  private isBiometricsEnabled(): boolean {
    return (
      this.isBiometricsEnrrollmentEnabled &&
      this.isForgotPasswordWithBiometricsEnabled
    );
  }

  get otp(): AbstractControl {
    return this.form.get('otp');
  }

  get method(): any {
    return this.routeData.method;
  }

  get title(): string {
    return this.routeData.title;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }

  get OtpAutocomplete(): typeof OtpAutocomplete {
    return OtpAutocomplete;
  }

  get type(): AuthStepType {
    return this.routeData.type;
  }

  get isEnrollmentOrForgotPass(): boolean {
    return [AuthStepType.forgotPassword, AuthStepType.register].includes(
      this.type
    );
  }
}
