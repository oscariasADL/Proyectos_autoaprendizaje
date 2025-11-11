import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeProductType } from '@commons/entities/product/balance.interface';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { HiddenFormatPipe } from '../../pipes/hidden-format.pipe';
import { ProductFacade } from '../../product.facade';
import { ProductGroupCardComponent } from './product-group-card.component';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { StripTagsPipe } from '@commons/pipes/strip-tags.pipe';

describe('ProductGroupCardComponent', () => {
  let component: ProductGroupCardComponent;
  let fixture: ComponentFixture<ProductGroupCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductGroupCardComponent,
        HiddenFormatPipe,
        CurrencyFormatPipe,
        NumberFormatPipe,
        StripTagsPipe
      ],
      imports: [TestingModule, IonicModule],
      providers: [{ provide: ProductFacade, useClass: ProductFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductGroupCardComponent);
    component = fixture.componentInstance;
    component.product = {
      type: HomeProductType.product,
      description: 'Saldo total en 8 cuentas',
      balance: 89012988.48,
      url: '/products/1',
      productType: 'SDA',
      categoryName: 'Mis Cuentas'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
