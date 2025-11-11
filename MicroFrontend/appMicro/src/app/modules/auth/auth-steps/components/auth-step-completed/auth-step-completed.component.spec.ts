import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { AuthStepCompletedComponent } from './auth-step-completed.component';
import { TestComponent } from '@testing/component/test.component';
import { AuthStepType } from '../../entities/auth-steps.interface';

describe('AuthStepCompletedComponent', () => {
  let component: AuthStepCompletedComponent;
  let fixture: ComponentFixture<AuthStepCompletedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthStepCompletedComponent, ImageUrlPipe],
      imports: [
        IonicModule,
        TestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth/login',
            component: TestComponent
          },
          {
            path: 'auth/register',
            component: TestComponent
          }
        ])
      ],
      providers: [
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { data: { data: { type: '' } } }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthStepCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    spyOnProperty(component, 'isSilentEnrollment').and.returnValue(true);
    expect(component.method).toBeUndefined();
    expect(component.ngOnDestroy()).toBeUndefined();
  });

  it('should call redirectLogin', async () => {
    spyOnProperty(component, 'isSilentEnrollment').and.returnValue(true);
    try {
      expect(await component.redirectLogin()).toBeUndefined();
    } catch (error) {
      fail(`redirectLogin threw an error: ${error}`);
    }
  });

  it('should call redirectLogin forgotPassword', async () => {
    spyOnProperty(component, 'isSilentEnrollment').and.returnValue(false);
    spyOnProperty(component, 'type').and.returnValue(
      AuthStepType.forgotPassword
    );
    try {
      expect(await component.redirectLogin()).toBeUndefined();
    } catch (error) {
      fail(`redirectLogin forgotPassword threw an error: ${error}`);
    }
  });
});
