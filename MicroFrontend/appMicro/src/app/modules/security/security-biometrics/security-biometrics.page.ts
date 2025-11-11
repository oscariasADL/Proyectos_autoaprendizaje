import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BiometricService } from '@commons/services/biometric.service';
import { NavController } from '@ionic/angular';
import { BiometricType } from '@modules/auth/login/entities/biometric.interface';
import { SecurityBiometricStep } from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import { SecurityBiometricsFacade } from '@modules/security/security-biometrics/security-biometrics.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-security-biometrics',
  templateUrl: './security-biometrics.page.html',
  styleUrls: ['./security-biometrics.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityBiometricsPage implements OnInit {
  constructor(
    private facade: SecurityBiometricsFacade,
    private biometric: BiometricService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.facade.setSecurityBiometricStep(this.securityBiometricStep.question);
  }

  public runAction(confirm: boolean): void {
    if (confirm) {
      if (this.hasBiometricRegistered$.currentValue()) {
        this.deactivateBiometrics();
      } else {
        this.activateBiometrics();
      }
    } else {
      this.close();
    }
  }

  public verifyPassword(password: string): void {
    this.facade.verifyPassword({ password });
  }

  public close(): void {
    this.navCtrl.pop();
  }

  public isActiveStep$(_step: SecurityBiometricStep): Observable<boolean> {
    return this.step$.pipe(
      map((step: SecurityBiometricStep) => step === _step)
    );
  }

  private deactivateBiometrics(): void {
    this.biometric
      .deactivateBiometrics()
      .then(() =>
        this.facade.setSecurityBiometricStep(
          this.securityBiometricStep.finished
        )
      );
  }

  private activateBiometrics(): void {
    this.facade.setSecurityBiometricStep(this.securityBiometricStep.password);
  }

  get biometricType$(): Observable<BiometricType> {
    return this.biometric.biometricType$;
  }

  get biometricText$(): Observable<string> {
    return this.biometric.biometricText$;
  }

  get hasBiometricRegistered$(): Observable<boolean> {
    return this.biometric.hasBiometricRegistered$;
  }

  get securityBiometricStep(): typeof SecurityBiometricStep {
    return SecurityBiometricStep;
  }

  get step$(): Observable<SecurityBiometricStep> {
    return this.facade.step$;
  }
}
