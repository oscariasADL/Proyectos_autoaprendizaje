import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { BiometricType } from '@modules/auth/login/entities/biometric.interface';
import {
  BiometricBigIcons,
  BiometricTexts
} from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import { SecurityBiometricsFacade } from '../../security-biometrics.facade';

@Component({
  selector: 'app-security-biometric-alert',
  templateUrl: './security-biometric-alert.component.html',
  styleUrls: ['./security-biometric-alert.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityBiometricAlertComponent {
  @Input() type: BiometricType;
  @Input() hasBiometric: boolean;

  @Output() option: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private facade: SecurityBiometricsFacade) {}
  get biometricIcon(): string {
    return BiometricBigIcons[this.type];
  }

  get biometricText(): string {
    return BiometricTexts[this.type];
  }
  public onToggleBiometrics() {
    this.option.emit(true);
    if (this.hasBiometric) {
      this.facade.sendCustomFactsRSA();
    }
  }
}
