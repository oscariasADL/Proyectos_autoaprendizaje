import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector
} from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { HOME } from '@app/commons/constants/navigate.constants';
import { LinkKey } from '@app/commons/entities/parameters/links.entities';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthStepsBase } from '../../auth-steps.base';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { CommonModule } from '@angular/common';
import { AuthStepType } from '../../entities/auth-steps.interface';
import {
  BIOMETRIC_FAILURE_TITLE_FOR_FORGOT_PASSWORD,
  BIOMETRIC_FAILURE_TITLE_FOR_REGISTER
} from '../biometric-verification/constants/biometrics.constants';

@Component({
  standalone: true,
  imports: [GlobalPipesModule, IonicModule, CommonModule],
  selector: 'app-biometric-verification-failed',
  templateUrl: './biometric-verification-failed.component.html',
  styleUrls: ['./biometric-verification-failed.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiometricVerificationFailedComponent extends AuthStepsBase {
  public appFacade = inject(AppFacade);
  public navCtrl = inject(NavController);

  constructor(protected injector: Injector) {
    super(injector);
  }
  public redirecToOffice() {
    this.facade.openExternalLinks(this.facade.linkByKey(LinkKey.linkOfficeMap));
  }

  public goToHome(): void {
    this.navCtrl.navigateBack(HOME);
  }

  public getTitleByAuthStepType() {
    return this.type === AuthStepType.forgotPassword
      ? BIOMETRIC_FAILURE_TITLE_FOR_FORGOT_PASSWORD
      : BIOMETRIC_FAILURE_TITLE_FOR_REGISTER;
  }

  get title(): string {
    return this.routeData.title;
  }
  get type(): AuthStepType {
    return this.routeData.type;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
