import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SecureQuestionPipe } from '@commons/pipes/secure-question.pipe';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { FillSecureDataComponent } from './fill-secure-data.component';

describe('FillSecureDataComponent', () => {
  let component: FillSecureDataComponent;
  let fixture: ComponentFixture<FillSecureDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FillSecureDataComponent, SecureQuestionPipe],
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
                  data: {
                    secureDataBriefQuestion: { length: 8, question: 2 }
                  },
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

    fixture = TestBed.createComponent(FillSecureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run toward next step', () => {
    component.secureDataSecret.setValue('question');
    component.terms.setValue(true);
    expect(component.run()).toBeUndefined();
    expect(component.icon === component.label).toBeFalse();
  });

  it('should icon', () => {
    expect(component.icon).toEqual('icon-tarjeta');
    component.data.secureDataBriefQuestion.productType = 'CREDIT_CARD';
    expect(component.icon).toEqual('icon-seguridad2');
  });
});
