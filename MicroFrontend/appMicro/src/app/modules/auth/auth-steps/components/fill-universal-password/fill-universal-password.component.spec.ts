import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { FillUniversalPasswordComponent } from './fill-universal-password.component';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { SafeHtmlPipe } from '@app/commons/pipes/safe-html.pipe';

describe('FillUniversalPasswordComponent', () => {
  let component: FillUniversalPasswordComponent;
  let fixture: ComponentFixture<FillUniversalPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FillUniversalPasswordComponent,
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

    fixture = TestBed.createComponent(FillUniversalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to run', () => {
    component.newPassword.setValue('1254');
    component.confirmPassword.setValue('1254');
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    expect(component.run()).toBeTruthy();
  });

  it('should return any, get method(): any', () => {
    expect(component.method).toBeDefined();
  });
});
