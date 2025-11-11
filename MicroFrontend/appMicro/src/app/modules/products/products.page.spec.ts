import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';
import { ProductsFacadeMock } from '@testing/mocks/facade/products.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ProductsFacade } from './products.facade';
import { ProductsPage } from './products.page';
import { ProductStyleType } from '../product/entities/product.interface';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    TestBed.configureTestingModule({
      declarations: [ProductsPage],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: ProductsFacade, useClass: ProductsFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ionViewWillEnter', () => {
    component.content = {
      scrollToTop: jasmine
        .createSpy('scrollToTop')
        .and.returnValue(Promise.resolve())
    } as any;

    component.ionViewWillEnter();

    expect(component.content.scrollToTop).toHaveBeenCalledWith(0);
  });

  it('should call setProductFilter', () => {
    expect(component.setProductFilter('')).toBeUndefined();
  });

  it('should call productDetail', () => {
    component.forceViewAvalProducts$.subscribe();

    fixture.ngZone.run(() => {
      const product = new ProductFactory().create();
      product.style = ProductStyleType.digitalDebitCard;
      expect(component.productDetail(product)).toBeUndefined();
    });
  });
});
