import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { otpValidators } from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { SecurityComplementaryServicesFacade } from '@modules/security/security-complementary-services/security-complementary-services.facade';

@Component({
  selector: 'app-complementary-services-otp',
  templateUrl: './complementary-services-otp.component.html',
  styleUrls: ['./complementary-services-otp.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryServicesOtpComponent {
  @Output() setStateWithOtp: EventEmitter<string> = new EventEmitter<string>();

  public otp: UntypedFormControl = new UntypedFormControl(null, [
    Validators.required,
    otpValidators.bind(this)
  ]);

  constructor(private facade: SecurityComplementaryServicesFacade) {}

  get errorMessage$(): any {
    return this.facade.errorMessage$;
  }
}
