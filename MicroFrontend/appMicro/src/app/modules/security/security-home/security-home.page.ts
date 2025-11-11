import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SIDE_MENU_LIST } from '@commons/components/side-menu/constants/side-menu.constants';
import { SideMenuItem } from '@commons/components/side-menu/entities/side-menu.interface';
import * as NAVIGATE from '@commons/constants/navigate.constants';
import { AlertService } from '@commons/services/alert.service';
import { BiometricService } from '@commons/services/biometric.service';
import { NavController } from '@ionic/angular';
import { SECURITY_HOME_COMPLEMENTARY_SERVICES } from '@modules/security/security-home/constants/security-home.constants';
import { SecurityHomeFacade } from '@modules/security/security-home/security-home.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-security-home',
  templateUrl: './security-home.page.html',
  styleUrls: ['./security-home.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityHomePage implements OnInit {
  public sideMenuList: SideMenuItem[] = SIDE_MENU_LIST;
  public hasBiometrics: boolean = false;
  public readonly featureFlagsKey = FeatureFlagsKey;

  constructor(
    private navCtrl: NavController,
    private facade: SecurityHomeFacade,
    private biometric: BiometricService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.biometric.initBiometrics();
  }

  public navigateToComplementaryServices(): void {
    if (this.complementaryServicesError$.currentValue()) {
      this.alertService.create(SECURITY_HOME_COMPLEMENTARY_SERVICES);
    } else {
      this.navigateTo(NAVIGATE.COMPLEMENTARY_SERVICES);
    }
  }

  public navigateTo(path: string[]): void {
    this.navCtrl.navigateForward(path);
  }

  get biometricIconClass$(): Observable<string> {
    return this.biometric.biometricIconClass$;
  }

  get hasBiometric$(): Observable<boolean> {
    return this.biometric.hasBiometric$;
  }

  get hasBiometricRegistered$(): Observable<boolean> {
    return this.biometric.hasBiometricRegistered$;
  }

  get complementaryServicesState$(): Observable<boolean> {
    return this.facade.complementaryServicesState$;
  }

  get complementaryServicesError$(): Observable<boolean> {
    return this.facade.complementaryServicesError$;
  }

  get biometricText$(): Observable<string> {
    return this.hasBiometricRegistered$.pipe(
      map(
        (hasBiometric) =>
          `${
            hasBiometric ? 'Desactivar' : 'Activar'
          } ${this.biometric.biometricText$.currentValue()}`
      )
    );
  }

  get NAVIGATE(): any {
    return NAVIGATE;
  }
}
