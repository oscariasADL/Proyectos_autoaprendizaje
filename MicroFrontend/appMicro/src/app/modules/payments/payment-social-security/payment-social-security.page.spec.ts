import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PaymentSocialSecurityFacade } from '@modules/payments/payment-social-security/payment-social-security.facade';
import { PaymentSocialSecurityFacadeMock } from '@testing/mocks/facade/payment-social-security.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';

import { PaymentSocialSecurityPage } from './payment-social-security.page';

describe('PaymentSocialSecurityPage', () => {
  let component: PaymentSocialSecurityPage;
  let fixture: ComponentFixture<PaymentSocialSecurityPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSocialSecurityPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: PaymentSocialSecurityFacade,
          useClass: PaymentSocialSecurityFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSocialSecurityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be feePayload', () => {
    const prod = { id: '1', type: 'CCA' };
    component.form.get('productOrigin').patchValue(prod);
    component.contributors$.subscribe();
    component.workingContributors$.subscribe();
    component.socialSecurityOperator$.subscribe();
    component.date$.subscribe();
    expect(component.feePayload().accountId).toEqual(prod.id);
  });

  it('should call paySocialSecurity', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.paySocialSecurity()).toBeUndefined();
  });
});
