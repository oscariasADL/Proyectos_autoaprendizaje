import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';

import { QrPayProductsComponent } from './qr-pay-products.component';
import { TestingModule } from '@testing/testing.module';

describe('QrPayProductsComponent', () => {
  let component: QrPayProductsComponent;
  let fixture: ComponentFixture<QrPayProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QrPayProductsComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(QrPayProductsComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormBuilder().group({
      fromProduct: null,
      data: { totalTrxAmount: 1000 },
      isItBetweenAccounts: false,
      installments: null,
      isValidCommerce: false,
      amount: 0
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be selectProduct', () => {
    const prod = new ProductFactory().create();
    expect(component.selectProduct(prod)).toBeUndefined();
  });

  it('should be isItBetweenAccounts', () => {
    expect(component.isItBetweenAccounts).toBeDefined();
  });
});
