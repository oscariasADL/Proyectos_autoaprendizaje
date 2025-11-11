import {
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PaymentCreditsFacade } from '@modules/payments/payment-credits/payment-credits.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { PaymentCreditsFacadeMock } from '@testing/mocks/facade/payment-credits.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';

import { PaymentCreditsPayPage } from './payment-credits-pay.page';

describe('PaymentCreditsPayPage', () => {
  let component: PaymentCreditsPayPage;
  let fixture: ComponentFixture<PaymentCreditsPayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCreditsPayPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: PaymentCreditsFacade,
          useClass: PaymentCreditsFacadeMock
        },
        Injector
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCreditsPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });

  it('should to call tto payLoan, public payLoan(): void', () => {
    const mockData = {
      fromProduct: {
        type: 'SDA',
        id: '3',
        numberProduct: '8942786',
        availableBalance: 1.85481776e8,
        currency: 'COP',
        typeName: 'Cuenta de Ahorros',
        accountType: 1,
        notEmpty: true,
        description: 'Saldo total',
        nickname: 'Nickname'
      },
      credit: {
        loanName: 'Tarjeta de Crédito',
        productType: 'CCA',
        productTypeDesc: 'Tarjeta de Crédito',
        numberProduct: '****6691',
        relativeId: '8',
        minPaymentAmount: 500000,
        minPaymentReducedAmount: 100000,
        franchise: 'VISA',
        cardType: 'Platinum',
        bankName: 'AV Villas',
        maxPaymentDate: '20-08-2019',
        bankCode: '0052',
        totalPaymentAmount: 2000000,
        typePayment: 'tarjeta-villas'
      },
      amount: 100000,
      activeType: 'minReduced',
      paymentType: null,
      currencyType: null,
      fee: 707,
      confirmation: [
        {
          id: 'amount',
          label: 'Valor',
          fields: ['$ 100.000'],
          edit: 'amount'
        },
        {
          id: 'toward',
          label: 'Hacia',
          fields: ['Tarjeta de Crédito', '****6691', 'AV Villas']
        },
        {
          id: 'from',
          label: 'Desde',
          fields: [
            'Ahorros No. 8942786',
            'Disponible $ 185.481.776,<span class="decimal-numbers-format">40</span>'
          ],
          edit: 'from'
        },
        {
          id: 'cost',
          label: 'Costo',
          fields: ['$ 707']
        }
      ]
    };
    component.form.patchValue(mockData);
    const formSpy = spyOnProperty(component.form, 'valid');
    formSpy.and.returnValue(true);
    spyOn(component, 'payLoan').and.callThrough();
    component.payLoan();
    expect(component.payLoan).toHaveBeenCalled();

    formSpy.and.returnValue(false);
    component.payLoan();
    expect(component.payLoan).toHaveBeenCalled();
  });

  it('should toBeDefined, get amount()', () => {
    expect(component.amount).toBeDefined();
  });

  it('should toBeDefined, get paymentType()', () => {
    expect(component.paymentType).toBeDefined();
  });
});
