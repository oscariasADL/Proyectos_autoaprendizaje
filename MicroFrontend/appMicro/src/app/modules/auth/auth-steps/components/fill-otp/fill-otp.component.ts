import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import {
  authTermsValidators,
  otpValidators
} from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';

@Component({
  selector: 'app-fill-otp',
  templateUrl: './fill-otp.component.html',
  styleUrls: ['./fill-otp.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillOtpComponent extends AuthStepsBase implements OnInit {
  public form: UntypedFormGroup;

  constructor(
    protected injector: Injector,
    protected secureStorage: AdlSecureStorageService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public async run(): Promise<void> {
    if (this.form.valid) {
      const { deviceName } = this.facade.deviceInfo$.currentValue();

      const db = await this.secureStorage.getAll();
      const fingerprint = getDBValue(db, SecureKeys.fingerprint);

      this.method({
        processId: this.data.processId,
        content: {
          forceOtpGeneration: 'false',
          startProductValidation: false,
          otpValue: this.form.value.otp,
          confirmHabeasData: true,
          deviceSerial: fingerprint,
          deviceName
        }
      });
    }
  }

  public requestNewOtp(): void {
    this.method({
      processId: this.data.processId,
      content: {
        forceOtpGeneration: 'false',
        startProductValidation: true
      }
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      otp: [null, [Validators.required, otpValidators.bind(this)]],
      terms: [false, [Validators.required, authTermsValidators]]
    });
  }

  get otp(): AbstractControl {
    return this.form.get('otp');
  }

  get terms(): AbstractControl {
    return this.form.get('terms');
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
