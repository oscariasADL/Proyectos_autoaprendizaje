import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { SecurityBiometricFinishedComponent } from './security-biometric-finished.component';
import { BiometricFinishedIcon } from '../../entities/security-biometrics.interface';

describe('SecurityBiometricFinishedComponent', () => {
  let component: SecurityBiometricFinishedComponent;
  let fixture: ComponentFixture<SecurityBiometricFinishedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityBiometricFinishedComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityBiometricFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return success icon when hasBiometric is true', () => {
    component.hasBiometric = true;
    fixture.detectChanges();
    expect(component.biometricFinishedIcon).toBe(BiometricFinishedIcon.success);
  });
});
