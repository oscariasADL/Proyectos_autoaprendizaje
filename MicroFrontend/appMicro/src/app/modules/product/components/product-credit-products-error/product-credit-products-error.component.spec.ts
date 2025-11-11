import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductCreditProductsErrorComponent } from './product-credit-products-error.component';
import { TestingModule } from '@testing/testing.module';
import { ProductFacade } from '@modules/product/product.facade';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { of } from 'rxjs';

describe('ProductCreditProductsErrorComponent', () => {
  let component: ProductCreditProductsErrorComponent;
  let fixture: ComponentFixture<ProductCreditProductsErrorComponent>;
  let facade: ProductFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCreditProductsErrorComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ProductFacade,
          useClass: ProductFacadeMock
        },
        {
          provide: HomeFacade,
          useClass: HomeFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    facade = TestBed.inject(ProductFacade);

    fixture = TestBed.createComponent(ProductCreditProductsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get credit card product without reload', () => {
    spyOn(facade, 'fetchProductsWithoutReload');
    component.retryGetProducts();
    expect(facade.fetchProductsWithoutReload).toHaveBeenCalled();
  });

  it('should not get credit card product without reload', () => {
    Object.defineProperty(facade, 'firstCallTC$', { value: of(true) });
    spyOn(facade, 'fetchProductsWithoutReload');
    component.retryGetProducts();
    expect(facade.fetchProductsWithoutReload).not.toHaveBeenCalled();
  });

  it('should return false in workingTC$', (done) => {
    component.workingTC$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should return false in completedTC$', (done) => {
    component.completedTC$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });
});
