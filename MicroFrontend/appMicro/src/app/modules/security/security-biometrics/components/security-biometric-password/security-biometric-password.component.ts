import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { authCurrentPasswordValidators } from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { SecurityBiometricsFacade } from '@modules/security/security-biometrics/security-biometrics.facade';

@Component({
  selector: 'app-security-biometric-password',
  templateUrl: './security-biometric-password.component.html',
  styleUrls: ['./security-biometric-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityBiometricPasswordComponent implements OnInit {
  @Output() verifyPassword: EventEmitter<string> = new EventEmitter<string>();

  public form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private facade: SecurityBiometricsFacade
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public runVerify(): void {
    if (this.form.valid) {
      this.verifyPassword.emit(this.password.value);
      this.facade.sendCustomFactsRSA();
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      password: [
        null,
        [Validators.required, authCurrentPasswordValidators.bind(this)]
      ]
    });
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
}
