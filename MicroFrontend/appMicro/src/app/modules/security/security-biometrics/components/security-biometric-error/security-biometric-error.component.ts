import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { BiometricType } from '@modules/auth/login/entities/biometric.interface';
import { BiometricTexts } from '@modules/security/security-biometrics/entities/security-biometrics.interface';

@Component({
  selector: 'app-security-biometric-error',
  templateUrl: './security-biometric-error.component.html',
  styleUrls: ['./security-biometric-error.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityBiometricErrorComponent {
  @Input() type: BiometricType;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();

  get biometricText(): string {
    return BiometricTexts[this.type];
  }
}
