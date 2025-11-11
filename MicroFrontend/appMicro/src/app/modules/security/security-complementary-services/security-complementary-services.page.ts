import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HOME } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import {
  ComplementaryServicesStep,
  ComplementaryServicesType
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import { SecurityComplementaryServicesFacade } from '@modules/security/security-complementary-services/security-complementary-services.facade';
import { firstValueFrom, Observable } from 'rxjs';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { DeviceData } from '@commons/entities/device/device.interface';
import { mapComplementaryServicesPayload } from '@modules/security/security-complementary-services/mappers/complementary-services.mapper';

@Component({
  selector: 'app-security-complementary-services',
  templateUrl: './security-complementary-services.page.html',
  styleUrls: ['./security-complementary-services.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityComplementaryServicesPage implements OnInit {
  constructor(
    private facade: SecurityComplementaryServicesFacade,
    private navCtrl: NavController,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this.facade.setComplementaryServicesStep(ComplementaryServicesStep.info);
  }
  ComplementaryServicesStep = ComplementaryServicesStep;
  public changeState(state: boolean): void {
    if (state) {
      this.facade.setComplementaryServicesStep(ComplementaryServicesStep.otp);
    } else {
      this.toggleComplementaryServices(ComplementaryServicesType.DISABLE);
    }
  }

  public setComplementaryServicesStep(step: ComplementaryServicesStep): void {
    this.facade.setComplementaryServicesStep(step);
  }

  public async toggleComplementaryServices(
    action: ComplementaryServicesType = ComplementaryServicesType.ENABLE,
    otp: string = null
  ): Promise<void> {
    const step: ComplementaryServicesStep = this.step$.currentValue();
    const deviceInfo: DeviceData = await firstValueFrom(
      this.facade.deviceInfo$
    );
    const loginData: string = await this.secureStorage.get(
      SecureKeys.loginData
    );
    const loginDataObj: LoginUserPayload = loginData && JSON.parse(loginData);
    const fingerprint: string = await this.secureStorage.get(
      SecureKeys.fingerprint
    );
    const complementaryServicesPayload = mapComplementaryServicesPayload({
      deviceInfo,
      loginData: loginDataObj,
      fingerprint,
      otpValue: otp,
      automaticValidation: false,
      turnOn: action === ComplementaryServicesType.ENABLE
    });
    this.facade.toggleComplementaryServices({
      ...complementaryServicesPayload,
      ...(step === ComplementaryServicesStep.otp
        ? { processId: this.facade.toggleProcessId$.currentValue() }
        : {})
    });
  }

  public close(): void {
    this.navCtrl.navigateBack(HOME);
  }

  get step$(): Observable<ComplementaryServicesStep> {
    return this.facade.step$;
  }

  get state$(): Observable<boolean> {
    return this.facade.complementaryServicesState$;
  }

  get complementaryServicesType(): typeof ComplementaryServicesType {
    return ComplementaryServicesType;
  }
}
