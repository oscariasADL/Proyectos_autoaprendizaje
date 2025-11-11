import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { QrPayDataComponent } from './qr-pay-data.component';
import { QRType } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { Product } from '@commons/entities/product/product.interface';
import { QrPaymentMethod } from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';

describe('QrPayDataComponent', () => {
  let component: QrPayDataComponent;
  let fixture: ComponentFixture<QrPayDataComponent>;
  let formBuilder: UntypedFormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QrPayDataComponent, CurrencyFormatPipe],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    formBuilder = new UntypedFormBuilder();
    fixture = TestBed.createComponent(QrPayDataComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      data: [{ totalTrxAmount: '900' }],
      qrType: QRType.dynamic,
      amount: 0,
      installments: null,
      fromProduct: null,
      isItBetweenAccounts: false,
      isValidCommerce: true
    });
    component.spiUserKey = {
      bankName: '',
      fullName: '',
      key: '',
      name: 'Harry Potter'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selectedProduct', () => {
    it('should set the selected product in the form', () => {
      const testProduct: Product = {
        id: '123',
        type: 'SDA',
        paymentType: 'debit'
      } as Product;
      component.selectedProduct(testProduct);
      expect(component.fromProduct.value).toEqual(testProduct);
    });
  });

  describe('modalProducts initialization', () => {
    it('should initialize modalProducts with debit cards when isItBetweenAccounts is false', () => {
      const mockDebitAccount: Product = {
        id: '123',
        type: 'SDA',
        paymentType: 'debit',
        title: 'Cuenta No. 1234'
      } as Product;

      const paymentMethod: QrPaymentMethod = {
        debitAccounts: [mockDebitAccount],
        creditCards: []
      };

      component.paymentMethod = paymentMethod;
      component.form.get('isItBetweenAccounts').setValue(false);
      component.ngOnInit();
      expect(component.modalProducts[0].type).toBe('debitCards');
      expect(component.modalProducts[0].label).toBe('Tarjetas Débito');
      expect(component.modalProducts[0].productsCards.length).toBe(1);
      expect(component.modalProducts[0].productsCards[0].icon).toBe(
        'icon-tarjeta'
      );
    });

    it('should initialize modalProducts with accounts when isItBetweenAccounts is true', () => {
      const mockProduct: Product = {
        id: '123',
        type: 'SDA'
      } as Product;

      component.products = [mockProduct];
      component.form.get('isItBetweenAccounts').setValue(true);

      component.ngOnInit();

      expect(component.modalProducts[0].type).toBe('accounts');
      expect(component.modalProducts[0].label).toBe('Cuentas');
      expect(component.modalProducts[0].productsCards.length).toBe(1);
    });
    it('should initialize modalProducts with credit cards when isItBetweenAccounts is false', () => {
      const mockDebitAccount: Product = {
        id: '123',
        type: 'CCA',
        paymentType: 'debit',
        title: 'Cuenta No. 1234'
      } as Product;

      const paymentMethod: QrPaymentMethod = {
        debitAccounts: [],
        creditCards: [mockDebitAccount]
      };

      component.paymentMethod = paymentMethod;
      component.form.get('isItBetweenAccounts').setValue(false);
      component.ngOnInit();
      expect(component.modalProducts[0].type).toBe('creditCards');
      expect(component.modalProducts[0].label).toBe('Tarjetas Crédito');
      expect(component.modalProducts[0].productsCards.length).toBe(1);
      expect(component.modalProducts[0].productsCards[0].icon).toBe(null);
    });
  });
});
