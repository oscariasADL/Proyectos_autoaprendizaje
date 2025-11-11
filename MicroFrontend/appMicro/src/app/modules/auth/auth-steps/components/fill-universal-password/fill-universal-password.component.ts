import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import {
  authConfirmPasswordValidators,
  authNewPasswordValidators
} from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-fill-universal-password',
  templateUrl: './fill-universal-password.component.html',
  styleUrls: ['./fill-universal-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillUniversalPasswordComponent
  extends AuthStepsBase
  implements OnInit
{
  public form: UntypedFormGroup;

  constructor(protected injector: Injector) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  public async run(): Promise<void> {
    if (this.form.valid) {
      const { deviceName } = await firstValueFrom(this.facade.deviceInfo$);

      const db = await this.secureStorage.getAll();
      const fingerprint = getDBValue(db, SecureKeys.fingerprint);

      this.method({
        processId: this.data.processId,
        content: {
          universalPassword: this.form.value.newPassword,
          deviceSerial: fingerprint,
          deviceName
        }
      });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      newPassword: [
        null,
        [Validators.required, authNewPasswordValidators.bind(this)]
      ],
      confirmPassword: [
        null,
        [Validators.required, authConfirmPasswordValidators.bind(this)]
      ]
    });
  }

  get newPassword(): AbstractControl {
    return this.form.get('newPassword');
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword');
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
}
