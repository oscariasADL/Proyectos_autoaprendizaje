import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';

import { ProductSquareCardComponent } from './product-square-card.component';

describe('ProductSquareCardComponent', () => {
  let component: ProductSquareCardComponent;
  let fixture: ComponentFixture<ProductSquareCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSquareCardComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSquareCardComponent);
    component = fixture.componentInstance;
    component.product = new ProductFactory().create();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
