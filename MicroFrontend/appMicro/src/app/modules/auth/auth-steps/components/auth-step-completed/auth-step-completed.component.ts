import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy
} from '@angular/core';
import { SecureKeys } from '@commons/constants/keys.constants';
import { HOME, LOGIN, REGISTER } from '@commons/constants/navigate.constants';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import {
  AuthStepResponse,
  AuthStepType
} from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { Observable, of } from 'rxjs';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-auth-step-completed',
  templateUrl: './auth-step-completed.component.html',
  styleUrls: ['./auth-step-completed.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthStepCompletedComponent
  extends AuthStepsBase
  implements OnDestroy
{
  private isClickRedirectLogin: boolean = false;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnDestroy(): void {
    if (this.isSilentEnrollment && !this.isClickRedirectLogin) {
      this.secureStorage.remove(SecureKeys.silentEnrollmentData).then();
    }
  }

  public async redirectLogin(): Promise<void> {
    if (this.isSilentEnrollment) {
      this.isClickRedirectLogin = true;
      this.facade.silentEnrollmentCompleted();
    } else {
      if (this.type === AuthStepType.forgotPassword) {
        const db = await this.secureStorage.getAll();
        const isEnrolled = !isNullOrUndefinedOrEmpty(
          getDBValue(db, SecureKeys.isEnrolled)
        );
        if (!isEnrolled) {
          await this.navCtrl.navigateForward(REGISTER);
          return;
        }
      }
      await this.navCtrl.navigateRoot(LOGIN);
    }
  }
  public goToHome(): void {
    this.navCtrl.navigateBack(HOME);
  }
  get method(): any {
    return this.routeData.method;
  }

  get completeStepTitle(): string {
    const isSilentEnrollment: string = this.isSilentEnrollment
      ? 'TITLE_1'
      : 'TITLE_2';
    return this.translate.instant(
      'AUTH.STEP.COMPLETED.' +
        (this.type === AuthStepType.forgotPassword
          ? 'TITLE_3'
          : isSilentEnrollment)
    );
  }

  get hasComplementaryServices$(): Observable<boolean> {
    if (this.isSilentEnrollment) {
      return this.facade.complementaryServicesState$;
    } else {
      return of(this.data.complementary);
    }
  }

  get isSilentEnrollment(): boolean {
    return this.type === AuthStepType.silentEnrollment;
  }

  get title(): string {
    return this.routeData.title;
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
