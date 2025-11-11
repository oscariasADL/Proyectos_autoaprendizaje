import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { FillCurrentPasswordComponent } from './fill-current-password.component';

describe('FillCurrentPasswordComponent', () => {
  let component: FillCurrentPasswordComponent;
  let fixture: ComponentFixture<FillCurrentPasswordComponent>;
  let navControlSpy;
  let alertSpy;

  beforeEach(waitForAsync(() => {
    alertSpy = jasmine.createSpyObj('AlertService', ['create']);
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.configureTestingModule({
      declarations: [FillCurrentPasswordComponent, ImageUrlPipe],
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
        },
        { provide: NavController, useValue: navControlSpy },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: AlertService,
          useValue: alertSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FillCurrentPasswordComponent);
    component = fixture.componentInstance;
    alertSpy.create.and.callFake(async () => true);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirectForgotPassword', async () => {
    navControlSpy.navigateRoot.and.returnValue(Promise.resolve(true));
    component.redirectForgotPassword();
    expect(navControlSpy.navigateRoot.calls.argsFor(0)[0]).toEqual([
      '/auth/forgot-password'
    ]);
  });

  it('should call to run when form is valid', () => {
    component.password.setValue('1234');
    spyOnProperty(component.passwordForm, 'valid').and.returnValue(true);
    expect(component.run()).toBeUndefined();
  });

  it('should call to run when form is invalid', () => {
    component.password.setValue('');
    spyOnProperty(component.passwordForm, 'valid').and.returnValue(false);
    expect(component.run()).toBeUndefined();
  });

  it('should call to savePasswordForSilentEnrollment', () => {
    spyOnProperty(component, 'isSilentEnrollment').and.returnValue(true);
    component.password.setValue('1241');
    expect(component.run()).toBeUndefined();
  });
});
