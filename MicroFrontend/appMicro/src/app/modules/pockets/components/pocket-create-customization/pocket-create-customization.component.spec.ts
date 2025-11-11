import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PocketCreateCustomizationComponent } from './pocket-create-customization.component';
import { TestingModule } from '@testing/testing.module';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ProductFactory } from '@testing/factories/product.factory';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { DropdownModalProductsComponent } from '@modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';

const pocketCategories: DropdownList[] = [
  {
    label: 'Viajes',
    value: '1'
  },
  {
    label: 'Ahorro',
    value: '2'
  }
];

describe('PocketCreateCustomizationComponent', () => {
  let component: PocketCreateCustomizationComponent;
  let fixture: ComponentFixture<PocketCreateCustomizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(PocketCreateCustomizationComponent, {
      add: {
        imports: [TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [FormsAvvModule, DropdownModalProductsComponent]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(PocketCreateCustomizationComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl(''),
      pocketCategories: new FormControl(pocketCategories),
      category: new FormControl({
        label: 'Viajes',
        value: '1'
      }),
      product: new FormControl(new ProductFactory().create())
    });
    component.products = new ProductFactory().createBulk(3);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to selectCategory', () => {
    const [, secondCategory] = pocketCategories;
    component.selectCategory(secondCategory);
    fixture.detectChanges();
    expect(component.category.value).toEqual(secondCategory);
  });

  it('should call to selectedProduct', () => {
    const [, secondProduct] = component.products;
    component.selectedProduct(secondProduct);
    fixture.detectChanges();
    expect(component.product.value).toEqual(secondProduct);
  });

  it('should be defined name', () => {
    expect(component.name).toBeDefined();
  });

  it('should be defined pocketCategories', () => {
    expect(component.pocketCategories).toBeDefined();
  });

  it('should be defined category', () => {
    expect(component.category).toBeDefined();
  });

  it('should be defined product', () => {
    expect(component.product).toBeDefined();
  });
});
