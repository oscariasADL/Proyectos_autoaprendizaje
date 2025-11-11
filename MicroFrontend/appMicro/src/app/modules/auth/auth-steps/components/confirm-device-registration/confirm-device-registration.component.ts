import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import {
  AuthStepResponse,
  AuthStepType
} from '@modules/auth/auth-steps/entities/auth-steps.interface';

@Component({
  selector: 'app-confirm-device-registration',
  templateUrl: './confirm-device-registration.component.html',
  styleUrls: ['./confirm-device-registration.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDeviceRegistrationComponent extends AuthStepsBase {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public run(type: boolean): void {
    this.method({
      processId: this.data.processId,
      content: {
        agree: type
      }
    });
  }

  public getIconByAuthStepType() {
    return this.type === AuthStepType.forgotPassword
      ? 'illustrationsV2/navegador-contrasena-candado-regular.svg'
      : 'illustrationsV2/notificaciones-regular.svg';
  }

  public getTitleByAuthStepType() {
    return this.type === AuthStepType.forgotPassword
      ? 'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.FORGOT_PASSWORD_TITLE'
      : 'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.TITLE';
  }

  public getDescriptionByAuthStepType() {
    return this.type === AuthStepType.forgotPassword
      ? 'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.FORGOT_PASSWORD_DESCRIPTION'
      : 'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.DESCRIPTION';
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

  get type(): AuthStepType {
    return this.routeData.type;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
