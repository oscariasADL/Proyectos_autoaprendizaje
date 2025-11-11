import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { ProductActionType } from '@modules/product/entities/product-action.interface';
import { ProductDetailFactory } from '@testing/factories/product-detail.factory';
import { ProductDetailFacadeMock } from '@testing/mocks/facade/product-detail.facade.mock';
import { ProductDetailPage } from './product-detail.page';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { PFMFacadeMock } from '@testing/mocks/facade/pfm.facade.mock';
import { ProductsFacade } from '@modules/products/products.facade';
import { ProductsFacadeMock } from '@testing/mocks/facade/products.facade.mock';
import { AlertService } from '@commons/services/alert.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { CancelAccountFacade } from '@modules/product-options/cancel-account/cancel-account.facade';
import { CancelAccountFacadeMock } from '@testing/mocks/facade/cancel-account.facade.mock';

describe('ProductDetailPage', () => {
  let component: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;
  let navControlSpy;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);
  const modalCtrlCreateMethodSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);

  const product = new ProductDetailFactory().create();

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj<NavController>('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    TestBed.configureTestingModule({
      declarations: [ProductDetailPage, ImageUrlPipe],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: ModalController, useValue: modalCtrlCreateMethodSpy },
        { provide: ProductDetailFacade, useClass: ProductDetailFacadeMock },
        { provide: ProductsFacade, useClass: ProductsFacadeMock },
        { provide: PFMFacade, useClass: PFMFacadeMock },
        { provide: CancelAccountFacade, useClass: CancelAccountFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call fetchProductDetail', () => {
    component.fetchProductDetail();
    spyOn(component, 'fetchProductDetail').and.callThrough();
    expect(component.fetchProductDetail).toBeDefined();
  });

  it('should be call actionPay', () => {
    component.actionPay(product);
    expect(navControlSpy.navigateForward).toHaveBeenCalled();
  });

  it('should be call redirectToMovementsDetail and call gets', () => {
    component.hasMovements$.currentValue();
    component.productMovements$.currentValue();
    component.workingMovements$.currentValue();
    component.completedMovements$.currentValue();
    component.balancesSummary$.currentValue();
    component.balancesSummaryWorking$.currentValue();
    component.balancesSummaryCompleted$.currentValue();
    fixture.ngZone.run(() =>
      expect(component.redirectToMovementsDetail()).toBeUndefined()
    );
  });

  it('should be call actionSelected', () => {
    Object.keys(ProductActionType).forEach((key) => {
      component.actionSelected(product, {
        type: ProductActionType[key],
        label: '',
        icon: '',
        id: ''
      });
    });
    spyOn(component, 'actionSelected').and.callThrough();
    expect(component.actionSelected).toBeDefined();
  });

  it('should be get accountType', () => {
    expect(component.accountType).toBeDefined();
    expect(component.accountType).toBeNull();
  });
  it('should call actionSelectedAlt and not execute any function if actionType is null or undefined', () => {
    const actionTypeUndefined = undefined;
    const actionTypeNull = null;
    const actionFnSpy = spyOn(component, 'actionPay');

    component.actionSelectedAlt(product, actionTypeUndefined);
    component.actionSelectedAlt(product, actionTypeNull);

    expect(actionFnSpy).not.toHaveBeenCalled();
  });

  it('should call actionSelectedAlt and not execute any function if actionType does not exist', () => {
    const actionTypeInvalid = 'INVALID_ACTION';
    const actionFnSpy = spyOn(component, 'actionPay');

    component.actionSelectedAlt(product, actionTypeInvalid);

    expect(actionFnSpy).not.toHaveBeenCalled();
  });
});
