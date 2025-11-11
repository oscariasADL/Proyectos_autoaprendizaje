import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ConfirmDeviceRegistrationComponent } from './confirm-device-registration.component';
import { SafeHtmlPipe } from '@app/commons/pipes/safe-html.pipe';
import { AuthStepType } from '../../entities/auth-steps.interface';
describe('ConfirmDeviceRegistrationComponent', () => {
  let component: ConfirmDeviceRegistrationComponent;
  let fixture: ComponentFixture<ConfirmDeviceRegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDeviceRegistrationComponent,
        ImageUrlPipe,
        SafeHtmlPipe
      ],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        },
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeviceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.run(true)).toBeUndefined();
  });

  it('should  return correct icon for register', async () => {
    spyOnProperty(component, 'type').and.returnValue(AuthStepType.register);
    expect(component.getIconByAuthStepType()).toBe(
      'illustrationsV2/notificaciones-regular.svg'
    );
  });

  it('should  return correct title for register', async () => {
    spyOnProperty(component, 'type').and.returnValue(AuthStepType.register);
    expect(component.getTitleByAuthStepType()).toBe(
      'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.TITLE'
    );
  });

  it('should  return correct description for register', async () => {
    spyOnProperty(component, 'type').and.returnValue(AuthStepType.register);
    expect(component.getDescriptionByAuthStepType()).toBe(
      'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.DESCRIPTION'
    );
  });

  it('should  return correct icon for forgot password', async () => {
    spyOnProperty(component, 'type').and.returnValue(
      AuthStepType.forgotPassword
    );
    expect(component.getIconByAuthStepType()).toBe(
      'illustrationsV2/navegador-contrasena-candado-regular.svg'
    );
  });

  it('should  return correct title for forgot password', async () => {
    spyOnProperty(component, 'type').and.returnValue(
      AuthStepType.forgotPassword
    );
    expect(component.getTitleByAuthStepType()).toBe(
      'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.FORGOT_PASSWORD_TITLE'
    );
  });

  it('should  return correct description for forgot password', async () => {
    spyOnProperty(component, 'type').and.returnValue(
      AuthStepType.forgotPassword
    );
    expect(component.getDescriptionByAuthStepType()).toBe(
      'AUTH.STEP.CONFIRM_DEVICE_REGISTRATION.FORGOT_PASSWORD_DESCRIPTION'
    );
  });
});
