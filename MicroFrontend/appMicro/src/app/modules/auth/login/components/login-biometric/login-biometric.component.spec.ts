import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BiometricService } from '@commons/services/biometric.service';
import { IonicModule } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { BiometricServiceMock } from '@testing/mocks/services/biometric.service.mock';
import { Observable } from 'rxjs';

import { LoginBiometricComponent } from './login-biometric.component';

describe('LoginBiometricComponent', () => {
  let component: LoginBiometricComponent;
  let fixture: ComponentFixture<LoginBiometricComponent>;

  const actions$ = new Observable<Action>();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginBiometricComponent],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        provideMockActions(() => actions$),
        {
          provide: BiometricService,
          useClass: BiometricServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginBiometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call runBiometric', () => {
    component.biometricIcon$.subscribe();
    component.biometricType$.subscribe();
    expect(component.runBiometric()).toBeTruthy();
  });
});
