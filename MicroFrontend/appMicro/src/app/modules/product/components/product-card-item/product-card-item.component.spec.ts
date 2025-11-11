import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeProductType } from '@commons/entities/product/balance.interface';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';
import { TestingModule } from '@testing/testing.module';
import { ProductCardItemComponent } from './product-card-item.component';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';

describe('ProductCardItemComponent', () => {
  let component: ProductCardItemComponent;
  let fixture: ComponentFixture<ProductCardItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCardItemComponent,
        CurrencyFormatPipe,
        NumberFormatPipe
      ],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardItemComponent);
    component = fixture.componentInstance;
    component.productDetail = {
      type: HomeProductType.product,
      url: '',
      product: new ProductFactory().create(),
      balance: 0,
      description: '',
      productType: '',
      categoryName: ''
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
