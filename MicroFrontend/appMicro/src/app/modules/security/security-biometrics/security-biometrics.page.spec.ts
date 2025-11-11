import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { BiometricService } from '@commons/services/biometric.service';
import { IonicModule } from '@ionic/angular';
import { SecurityBiometricsFacade } from '@modules/security/security-biometrics/security-biometrics.facade';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { SecurityBiometricsFacadeMock } from '@testing/mocks/facade/security-biometrics.facade.mock';
import { BiometricServiceMock } from '@testing/mocks/services/biometric.service.mock';

import { SecurityBiometricsPage } from './security-biometrics.page';

describe('SecurityBiometricsPage', () => {
  let component: SecurityBiometricsPage;
  let fixture: ComponentFixture<SecurityBiometricsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityBiometricsPage],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        {
          provide: SecurityBiometricsFacade,
          useClass: SecurityBiometricsFacadeMock
        },
        {
          provide: BiometricService,
          useClass: BiometricServiceMock
        },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityBiometricsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be verifyPassword', () => {
    expect(component.verifyPassword('')).toBeUndefined();
  });

  it('should be runAction', () => {
    component.biometricType$.subscribe();
    expect(component.runAction(false)).toBeUndefined();
    spyOn(component, 'close').and.callThrough();
    component.runAction(true);
  });

  it('should be deactivateBiometrics', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.deactivateBiometrics()).toBeUndefined();
  });
});
