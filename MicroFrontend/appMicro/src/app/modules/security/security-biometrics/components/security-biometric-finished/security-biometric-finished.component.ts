import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { BiometricType } from '@modules/auth/login/entities/biometric.interface';
import {
  BiometricFinishedIcon,
  BiometricTexts
} from '@modules/security/security-biometrics/entities/security-biometrics.interface';

@Component({
  selector: 'app-security-biometric-finished',
  templateUrl: './security-biometric-finished.component.html',
  styleUrls: ['./security-biometric-finished.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityBiometricFinishedComponent {
  @Input() type: BiometricType;
  @Input() hasBiometric: boolean;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();

  get biometricText(): string {
    return BiometricTexts[this.type];
  }

  get biometricFinishedIcon(): string {
    return this.hasBiometric
      ? BiometricFinishedIcon.success
      : BiometricFinishedIcon.error;
  }
}
