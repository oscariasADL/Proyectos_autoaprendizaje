import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { PaymentServicesPayMultiplePage } from './payment-services-pay-multiple.page';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { ProductFactory } from '@testing/factories/product.factory';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { InformationService } from '@app/commons/services/information.service';
import { InformationServiceMock } from '@testing/mocks/services/information.service.mock';
import { StepperTypes } from '@app/modules/templates/generic-stepper/entities/generic-stepper.entity';
import { SERVICES_PAY_MULTIPLE_INFO_ALERT } from './constants/services-pay-multiple.constants';

describe('PaymentServicesPayMultiplePage', () => {
  let facade: PaymentServicesFacade;
  let component: PaymentServicesPayMultiplePage;
  let fixture: ComponentFixture<PaymentServicesPayMultiplePage>;
  let document: Document;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentServicesPayMultiplePage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        CurrencyFormatPipe,
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        },
        { provide: InformationService, useClass: InformationServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentServicesPayMultiplePage);
    facade = TestBed.inject(PaymentServicesFacade);
    document = TestBed.inject(DOCUMENT);
    facade.services$ = of({
      biller: new PaymentBillFactory().createBulk(2),
      noBiller: []
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call payBill', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.payBills()).toBe(void 0);
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });

  it('should call toast alert in last step', () => {
    spyOn(facade, 'showToastMaxAmountWarning');
    component.nextStep('confirmation');
    expect(facade.showToastMaxAmountWarning).toHaveBeenCalled();
  });

  it('should get destroy if not in the last step', () => {
    spyOn(facade, 'destroyToast');
    component.nextStep('form');
    expect(facade.destroyToast).toHaveBeenCalled();
  });

  describe('ngOnInit stepperBody', () => {
    beforeEach(() => {
      jasmine.getEnv().allowRespy(true);
    });

    it('should set padding bottom to 0px when stepperBody exists', () => {
      const mockElement = document.createElement('div');
      spyOn(document, 'querySelector').and.returnValue(mockElement);

      component.ngOnInit();

      expect(document.querySelector).toHaveBeenCalledWith(
        '.generic-stepper-body'
      );
      expect(mockElement.style.paddingBottom).toBe('0px');
    });

    it('should handle case when stepperBody does not exist', () => {
      spyOn(document, 'querySelector').and.returnValue(null);

      component.ngOnInit();

      expect(document.querySelector).toHaveBeenCalledWith(
        '.generic-stepper-body'
      );
    });
  });
  describe('setNextStep', () => {
    beforeEach(() => {
      jasmine.getEnv().allowRespy(true);
    });

    it('should call informationService.showPanel when value is information panel', async () => {
      const data = { value: StepperTypes.informationPanel.toString() };
      const informationService = TestBed.inject(InformationService);
      spyOn(informationService, 'showPanel').and.resolveTo();

      await component.setNextStep(data);

      expect(informationService.showPanel).toHaveBeenCalledWith(
        SERVICES_PAY_MULTIPLE_INFO_ALERT
      );
    });

    it('should call super.setNextStep when value is not information panel', async () => {
      const data = { value: 'otherValue' };
      spyOn(component as any, 'setNextStep').and.callThrough();

      const superSetNextStepSpy = spyOn(
        Object.getPrototypeOf(Object.getPrototypeOf(component)),
        'setNextStep'
      ).and.resolveTo();

      await component.setNextStep(data);

      expect(superSetNextStepSpy).toHaveBeenCalledWith(data);
    });
  });
});
