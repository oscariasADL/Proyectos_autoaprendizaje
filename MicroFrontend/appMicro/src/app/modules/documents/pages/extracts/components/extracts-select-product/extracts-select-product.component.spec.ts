import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

import { ExtractsSelectProductComponent } from './extracts-select-product.component';
import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { ExtractsFacadeMock } from '@testing/mocks/facade/extracts.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { GroupedProducts } from '@modules/documents/pages/extracts/entities/extracts.interface';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeProduct } from '@app/commons/entities/product/balance.interface';
import { of } from 'rxjs';

describe('ExtractsSelectProductComponent', () => {
  let component: ExtractsSelectProductComponent;
  let fixture: ComponentFixture<ExtractsSelectProductComponent>;
  const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
  const products: Product[] = [
    {
      type: 'SDA',
      id: '3',
      numberProduct: '8942786',
      availableBalance: 185481776.4,
      currency: 'COP',
      typeName: 'Cuenta de Ahorros',
      accountType: 1,
      productTypeDetailKey: ProductTypeDetail.BAJ,
      productTypeDetailValue: 'BAJO-MONTO',
      notEmpty: true,
      description: 'Saldo total',
      nickname: 'Nickname'
    },
    {
      type: 'SDA',
      id: '4',
      numberProduct: '894278622',
      availableBalance: 185481.4,
      currency: 'COP',
      typeName: 'Cuenta de Ahorros',
      accountType: 1,
      productTypeDetailKey: ProductTypeDetail.BAJ,
      productTypeDetailValue: 'BAJO-MONTO',
      notEmpty: true,
      description: 'Saldo total',
      nickname: 'Cuenta joven'
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractsSelectProductComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: ExtractsFacade, useClass: ExtractsFacadeMock },
        {
          provide: NavController,
          useValue: navCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtractsSelectProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call navigateTo', async () => {
    const item: GroupedProducts = {
      typeProduct: '1',
      values: [products[0]]
    };
    expect(await component.navigateTo(item)).toBe(void 0);

    item.values.push(...products);
    expect(await component.navigateTo(item)).toBe(void 0);
  });

  it('should be call loadMoreProducts', () => {
    component.limit = 5;
    expect(component.loadMoreProducts()).toBe(void 0);
  });

  it('should be defined products$', () => {
    expect(component.products$).toBeDefined();
  });

  it('should be defined groupedProducts$', () => {
    expect(component.groupedProducts$).toBeDefined();
  });

  it('should be defined typeProductCategories', () => {
    expect(component.typeProductCategories).toBeDefined();
  });
  it('should modify typeProduct to MY_CREDITS for rotating credits', () => {
    const rotatingCreditProduct: Product = {
      type: 'SDA',
      id: '5',
      numberProduct: '8942787',
      availableBalance: 100000,
      currency: 'COP',
      typeName: 'Crédito Rotatorio',
      accountType: 1,
      productTypeDetailKey: ProductTypeDetail.BAJ,
      productTypeDetailValue: 'BAJO-MONTO',
      notEmpty: true,
      description: 'Saldo disponible',
      nickname: 'Crédito rotatorio',
      typeProduct: TypeProduct.ROTATING_CREDITS
    };

    const otherProduct: Product = {
      type: 'SDA',
      id: '6',
      numberProduct: '8942788',
      availableBalance: 200000,
      currency: 'COP',
      typeName: 'Cuenta de Ahorros',
      accountType: 1,
      productTypeDetailKey: ProductTypeDetail.BAJ,
      productTypeDetailValue: 'BAJO-MONTO',
      notEmpty: true,
      description: 'Saldo total',
      nickname: 'Cuenta joven',
      typeProduct: TypeProduct.MY_CREDITS
    };

    const facadeSpy = jasmine.createSpyObj('ExtractsFacade', ['products$']);
    facadeSpy.products$ = of([rotatingCreditProduct, otherProduct]);
    component['facade'] = facadeSpy;

    component.groupedProducts$.subscribe((groupedProducts) => {
      const modifiedProduct = groupedProducts[0].values.find(
        (product: Product) => product.id === '5'
      );
      expect(modifiedProduct).toBeDefined();
      expect(modifiedProduct).toBe(rotatingCreditProduct);
    });
  });
});
