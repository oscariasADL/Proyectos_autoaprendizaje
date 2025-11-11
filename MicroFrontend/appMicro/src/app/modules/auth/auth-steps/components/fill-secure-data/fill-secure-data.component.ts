import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { authTermsValidators } from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';

@Component({
  selector: 'app-fill-secure-data',
  templateUrl: './fill-secure-data.component.html',
  styleUrls: ['./fill-secure-data.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillSecureDataComponent extends AuthStepsBase implements OnInit {
  public form: UntypedFormGroup;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public run(): void {
    if (this.form.valid) {
      this.method({
        processId: this.data.processId,
        content: {
          secureDataSecret: this.form.value.secureDataSecret,
          confirmHabeasData: true
        }
      });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      secureDataSecret: [
        null,
        [
          Validators.required,
          Validators.minLength(this.data.secureDataBriefQuestion.length),
          Validators.maxLength(this.data.secureDataBriefQuestion.length)
        ]
      ],
      terms: [false, [Validators.required, authTermsValidators]]
    });
  }

  get icon(): string {
    return this.isCreditCard ? 'icon-seguridad2' : 'icon-tarjeta';
  }

  get label(): string {
    return this.isCreditCard
      ? 'AUTH.STEP.FILL_SECURE_DATA.PASSWORD_FIELD'
      : 'AUTH.STEP.FILL_SECURE_DATA.CARD_FIELD';
  }

  get secureDataSecret(): AbstractControl {
    return this.form.get('secureDataSecret');
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

  get isCreditCard(): boolean {
    return this.data.secureDataBriefQuestion.productType === 'CREDIT_CARD';
  }

  get isLastAttempt(): boolean {
    return this.data?.isLastAttempt;
  }

  get hasError(): string {
    return !this.secureDataSecret.value &&
      !this.data.success &&
      this.data.errorMessage
      ? this.data.errorMessage
      : null;
  }
}
