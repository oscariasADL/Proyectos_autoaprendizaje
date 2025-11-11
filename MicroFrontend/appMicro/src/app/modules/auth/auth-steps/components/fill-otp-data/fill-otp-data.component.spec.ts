import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { TestComponent } from '@testing/component/test.component';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { FillOtpDataComponent } from './fill-otp-data.component';
import { PluginListenerHandle } from '@capacitor/core';
import { OtpAutocompleteResponse } from '@commons/capacitor-web-plugins/otp-autocomplete';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { SafeHtmlPipe } from '@app/commons/pipes/safe-html.pipe';

describe('FillOtpDataComponent', () => {
  let component: FillOtpDataComponent;
  let fixture: ComponentFixture<FillOtpDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FillOtpDataComponent, ImageUrlPipe, SafeHtmlPipe],
      imports: [
        IonicModule,
        ReactiveFormsModule,
        TestingModule,

        RouterTestingModule.withRoutes([
          {
            path: 'auth/register/registering-device',
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

    fixture = TestBed.createComponent(FillOtpDataComponent);
    component = fixture.componentInstance;
    spyOnProperty(component, 'method').and.returnValue(() => true);
    spyOnProperty(component, 'OtpAutocomplete').and.returnValue({
      listenOtpOnAndroid: async () => ({ success: true }),
      addListener: (
        eventName,
        listenerCallback: (data: OtpAutocompleteResponse) => void
      ): Promise<PluginListenerHandle> => {
        listenerCallback({ success: true, msg: '', otp: '12345678' });
        return Promise.resolve({ remove: () => Promise.resolve() });
      }
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call requestNewOtp and onOtpAutocompleteInIOS', () => {
    component.requestNewOtp();
    fixture.ngZone.run(() =>
      expect(component.onOtpAutocompleteInIOS('12345678')).toBeUndefined()
    );
    expect(component).toBeTruthy();
  });

  it('should be call ngOnDestroy', () => {
    (component as any).otpListener = {
      remove: () => {
        return;
      }
    };
    expect(component.ngOnDestroy()).toBeUndefined();
  });
});
