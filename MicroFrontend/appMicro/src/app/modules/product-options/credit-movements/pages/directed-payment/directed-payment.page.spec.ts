import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { CreditMovementsFacadeMock } from '@testing/mocks/facade/credit-movements.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';
import { DirectedPaymentPage } from './directed-payment.page';

describe('DirectedPaymentPage', () => {
  let component: DirectedPaymentPage;
  let fixture: ComponentFixture<DirectedPaymentPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectedPaymentPage],
      imports: [IonicModule, GenericStepperMockModule, TestingModule],
      providers: [
        {
          provide: CreditMovementsFacade,
          useClass: CreditMovementsFacadeMock
        },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectedPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call all gets', () => {
    expect(component.movement.value).toEqual(null);
    expect(component.amount.value).toEqual(null);
  });

  it('should be feePayload', () => {
    const prod = { id: '1', type: 'CCA' };
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId).toEqual(prod.id);
  });

  it('should be call setNextStep', () => {
    expect(component.setNextStep({ value: null })).toBeTruthy();
    expect(
      component.setNextStep({ value: StepperTypes.informationPanel })
    ).toBeTruthy();
  });
});
