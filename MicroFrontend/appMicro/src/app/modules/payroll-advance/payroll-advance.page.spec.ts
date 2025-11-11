import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PayrollAdvancePage } from './payroll-advance.page';
import { TestingModule } from '@testing/testing.module';
import { AlertService } from '@app/commons/services/alert.service';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { AlertSheetType } from '@commons/entities/alert/alert-sheet.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

describe('PayrollAdvancePage', () => {
  let component: PayrollAdvancePage;
  let fixture: ComponentFixture<PayrollAdvancePage>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let productFacadeSpy: jasmine.SpyObj<ProductDetailFacade>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let currencyFormatPipeSpy: jasmine.SpyObj<CurrencyFormatPipe>;
  let productDetailSubject: Subject<ProductDetail>;

  const mockProductDetail: ProductDetail = {
    id: '12345',
    type: 'SDA',
    numberProduct: '1234567890',
    nickname: 'Cuenta de Ahorros',
    payrollAdvanceAmount: 500000,
    payrollAdvanceAuthorizationNumber: 'AUTH123456',
    balance: 1000000,
    availableBalance: 800000
  };

  beforeEach(async () => {
    const alertSpy = jasmine.createSpyObj('AlertService', ['create']);
    const facadeSpy = jasmine.createSpyObj('ProductDetailFacade', [
      'fetchProductPayrollAdvanceConfirm'
    ]);
    const modalSpy = jasmine.createSpyObj('ModalController', ['create']);
    const navSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    const currencySpy = jasmine.createSpyObj('CurrencyFormatPipe', [
      'transform'
    ]);

    productDetailSubject = new Subject<ProductDetail>();

    facadeSpy.productDetail$ = productDetailSubject.asObservable();
    currencySpy.transform.and.returnValue('$500,000.00');

    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [PayrollAdvancePage, CurrencyFormatPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AlertService, useValue: alertSpy },
        { provide: ProductDetailFacade, useValue: facadeSpy },
        { provide: ModalController, useValue: modalSpy },
        { provide: NavController, useValue: navSpy },
        { provide: CurrencyFormatPipe, useValue: currencySpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollAdvancePage);
    component = fixture.componentInstance;
    alertServiceSpy = TestBed.inject(
      AlertService
    ) as jasmine.SpyObj<AlertService>;
    productFacadeSpy = TestBed.inject(
      ProductDetailFacade
    ) as jasmine.SpyObj<ProductDetailFacade>;
    modalCtrlSpy = TestBed.inject(
      ModalController
    ) as jasmine.SpyObj<ModalController>;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
    currencyFormatPipeSpy = TestBed.inject(
      CurrencyFormatPipe
    ) as jasmine.SpyObj<CurrencyFormatPipe>;

    productDetailSubject.next(mockProductDetail);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to productDetail$ and set productDetail', () => {
      productDetailSubject.next(mockProductDetail);

      expect(component.productDetail).toEqual(mockProductDetail);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      spyOn(component['subscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(component['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('declined', () => {
    it('should navigate to product detail when productDetail exists', () => {
      component.productDetail = mockProductDetail;

      component.declined();

      expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith([
        `/product-detail/${mockProductDetail.type}/${mockProductDetail.id}`
      ]);
    });

    it('should navigate to home when productDetail is null', () => {
      component.productDetail = null;

      component.declined();

      expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('getVoucherFields', () => {
    beforeEach(() => {
      component.productDetail = mockProductDetail;
      jasmine.clock().install();
      const fixedDate = new Date('2024-01-15T10:30:00');
      jasmine.clock().mockDate(fixedDate);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });
  });

  describe('showTermsCond', () => {
    it('should call showTermsModal', () => {
      spyOn(component, 'showTermsModal');

      component.showTermsCond();

      expect(component.showTermsModal).toHaveBeenCalled();
    });
  });

  describe('showTermsModal', () => {
    it('should create and present modal', async () => {
      const mockModal = {
        present: jasmine.createSpy('present').and.returnValue(Promise.resolve())
      };
      modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModal as any));

      await component.showTermsModal();

      expect(modalCtrlSpy.create).toHaveBeenCalledWith({
        id: 'block-card-temporarily-confirmation-modal',
        component: jasmine.any(Function),
        componentProps: {},
        mode: 'md',
        cssClass: 'avv-custom-modal'
      });
      expect(mockModal.present).toHaveBeenCalled();
    });
  });

  describe('productDetail$ getter', () => {
    it('should return productDetail$ from facade', () => {
      const result = component.productDetail$;

      expect(result).toBe(productFacadeSpy.productDetail$);
    });
  });
});
