import { Component, Injector, OnInit } from '@angular/core';
import {
  REGISTERING_FAILURE_URL_FOR_FORGOT_PASSWORD,
  REGISTERING_FAILURE_URL_FOR_REGISTER
} from '@commons/constants/navigate.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { StepEnrollmentType } from '@modules/auth/register/entities/register.interface';
import { AuthStepsBase } from '../../auth-steps.base';
import {
  AuthStepPayload,
  AuthStepResponse,
  AuthStepType
} from '../../entities/auth-steps.interface';
import { ActivateOneSpanDigipassService } from '@commons/services/activate-one-span-digipass.service';
import { StepForgotPasswordTypeWithBiometrics } from '@app/modules/auth/forgot-password/entities/forgot-password.interface';

@Component({
  selector: 'app-registering-device',
  templateUrl: './registering-device.component.html',
  styleUrls: ['./registering-device.component.sass']
})
export class RegisteringDeviceComponent
  extends AuthStepsBase
  implements OnInit
{
  constructor(
    protected injector: Injector,
    private activateOneSpanDigipass: ActivateOneSpanDigipassService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.callOneSpanSdk().catch((error) => {
      this.analytics.sendError('Error callOneSpanSdk', error);
      this.navCtrl.navigateForward(this.getRegisteringFailedUrl());
    });
  }

  private async callOneSpanSdk(): Promise<any> {
    if (isNullOrUndefined(this.enrollmentKey)) {
      throw new Error('No tiene el campo enrollmentKey');
    }
    if (
      this.data.step === StepEnrollmentType.ONESPAN_ACTIVATE_LICENSE ||
      this.data.step ===
        StepForgotPasswordTypeWithBiometrics.ONESPAN_ACTIVATE_LICENSE
    ) {
      const deviceCode = await this.activateOneSpanDigipass.activateLicense({
        enrollmentKey: this.enrollmentKey
      });
      this.method({
        processId: this.data.processId,
        content: {
          deviceCode
        }
      } as AuthStepPayload);
    } else if (
      this.data.step === StepEnrollmentType.ONESPAN_ACTIVATE_INSTANCE ||
      this.data.step ===
        StepForgotPasswordTypeWithBiometrics.ONESPAN_ACTIVATE_INSTANCE
    ) {
      const signatureCode = await this.activateOneSpanDigipass.activateInstance(
        { enrollmentKey: this.enrollmentKey }
      );
      this.method({
        processId: this.data.processId,
        content: {
          signatureCode
        }
      } as AuthStepPayload);
    }
  }

  private getRegisteringFailedUrl() {
    return this.type === AuthStepType.forgotPassword
      ? REGISTERING_FAILURE_URL_FOR_FORGOT_PASSWORD
      : REGISTERING_FAILURE_URL_FOR_REGISTER;
  }

  get enrollmentKey(): string {
    return this.data.enrollmentKey;
  }

  get method(): any {
    return this.routeData.method;
  }

  get type(): AuthStepType {
    return this.routeData.type;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
