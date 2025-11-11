import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { FillOtpComponent } from './fill-otp.component';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { SafeHtmlPipe } from '@app/commons/pipes/safe-html.pipe';

describe('FillOtpComponent', () => {
  let component: FillOtpComponent;
  let fixture: ComponentFixture<FillOtpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FillOtpComponent, ImageUrlPipe, SafeHtmlPipe],
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
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FillOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call run', () => {
    component.otp.setValue('12345678');
    component.terms.setValue(true);
    const formSpy = spyOnProperty(component.form, 'valid');

    formSpy.and.returnValue(true);
    expect(component.method).toBeDefined();
    expect(component.run()).toBeTruthy();

    formSpy.and.returnValue(false);
    expect(component.run()).toBeTruthy();
  });

  it('should call requestNewOtp', () => {
    spyOnProperty(component, 'method').and.returnValue(() => {
      return;
    });
    expect(component.requestNewOtp()).toBeUndefined();
  });
});
