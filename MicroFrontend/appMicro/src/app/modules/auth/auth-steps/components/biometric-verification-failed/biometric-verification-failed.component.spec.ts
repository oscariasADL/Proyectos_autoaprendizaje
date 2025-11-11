import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BiometricVerificationFailedComponent } from './biometric-verification-failed.component';
import { AppFacade } from '@app/app.facade';
import { TestingModule } from '@testing/testing.module';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthStepsFacade } from '../../auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { AuthStepType } from '../../entities/auth-steps.interface';
import { BIOMETRIC_FAILURE_TITLE_FOR_FORGOT_PASSWORD } from '../biometric-verification/constants/biometrics.constants';
import { HOME } from '@app/commons/constants/navigate.constants';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { ActivatedRoute } from '@angular/router';

describe('BiometricVerificationFailedComponent', () => {
  let component: BiometricVerificationFailedComponent;
  let fixture: ComponentFixture<BiometricVerificationFailedComponent>;
  let facadeSpy: jasmine.SpyObj<AppFacade>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    facadeSpy = jasmine.createSpyObj('AppFacade', [
      'deviceInfo$',
      'openExternalLinks'
    ]);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        RouterTestingModule,
        TestingModule,
        BiometricVerificationFailedComponent
      ],
      providers: [
        { provide: AppFacade, useValue: AppFacadeMock },
        { provide: AuthStepsFacade, useValue: AuthStepsFacadeMock },
        { provide: NavController, useValue: navCtrlSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  data: { title: '' },
                  method: () => {
                    return;
                  }
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BiometricVerificationFailedComponent);
    component = fixture.componentInstance;

    spyOnProperty(component, 'routeData', 'get').and.returnValue({
      title: 'Test Title',
      type: AuthStepType.forgotPassword
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct title from routeData', () => {
    expect(component.title).toBe('Test Title');
  });

  it('should return the correct auth step type from routeData', () => {
    expect(component.type).toBe(AuthStepType.forgotPassword);
  });

  it('should navigate back to home', () => {
    component.goToHome();
    expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith(HOME);
  });

  it('should return correct title for forgot password', () => {
    expect(component.getTitleByAuthStepType()).toBe(
      BIOMETRIC_FAILURE_TITLE_FOR_FORGOT_PASSWORD
    );
  });

  it('should return correct title for forgot password', () => {
    expect(component.getTitleByAuthStepType()).toBe(
      'AUTH.STEP.BIOMETRIC_VERIFICATION_FAILED.FORGOT_PASSWORD_TITLE'
    );
  });

  it('should  return correct title for register', async () => {
    spyOnProperty(component, 'type').and.returnValue(AuthStepType.register);
    expect(component.getTitleByAuthStepType()).toBe(
      'AUTH.STEP.BIOMETRIC_VERIFICATION_FAILED.REGISTER_TITLE'
    );
  });
});
