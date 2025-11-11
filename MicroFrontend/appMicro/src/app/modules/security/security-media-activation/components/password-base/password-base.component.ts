import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {
  authConfirmPasswordValidators,
  authNewPasswordValidators
} from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import {
  ActivateProductSteps,
  MediaStepsData
} from '../../store/security-media.state';

@Component({
  selector: 'app-password-base',
  template: ``
})
export class PasswordBaseComponent {
  @Input() title: string;
  @Input() description: string;

  @Output()
  continue: EventEmitter<MediaStepsData> = new EventEmitter<MediaStepsData>();

  public form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private facade: SecurityMediaActivationFacade
  ) {}

  public submitPassword(): void {
    if (this.form.valid) {
      this.continue.emit({
        step: ActivateProductSteps.activateProduct,
        data: this.newPassword.value
      });
    }
  }

  protected initForm(): void {
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
}
