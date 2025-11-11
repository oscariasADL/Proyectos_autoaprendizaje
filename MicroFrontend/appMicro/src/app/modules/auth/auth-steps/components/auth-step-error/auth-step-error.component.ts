import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';

@Component({
  selector: 'app-auth-step-error',
  templateUrl: './auth-step-error.component.html',
  styleUrls: ['./auth-step-error.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthStepErrorComponent {
  @Input() data: AuthStepResponse;
}
