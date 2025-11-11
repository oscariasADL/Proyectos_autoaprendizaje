import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecurityBiometricsFacade } from '@modules/security/security-biometrics/security-biometrics.facade';
import { SecurityBiometricsFacadeMock } from '@testing/mocks/facade/security-biometrics.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { SecurityBiometricPasswordComponent } from './security-biometric-password.component';

describe('SecurityBiometricPasswordComponent', () => {
  let component: SecurityBiometricPasswordComponent;
  let fixture: ComponentFixture<SecurityBiometricPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityBiometricPasswordComponent],
      imports: [IonicModule, FormsModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: SecurityBiometricsFacade,
          useClass: SecurityBiometricsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityBiometricPasswordComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormBuilder().group({
      password: null
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call runVerify', () => {
    spyOn(component.verifyPassword, 'emit');
    spyOn((component as any).facade, 'boundsByKey').and.returnValue(4);
    component.password.setValue('1256');
    component.runVerify();
    expect(component.verifyPassword.emit).toHaveBeenCalled();
  });
});
