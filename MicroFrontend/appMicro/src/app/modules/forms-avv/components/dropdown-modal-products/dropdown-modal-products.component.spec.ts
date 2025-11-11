import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropdownModalProductsComponent } from './dropdown-modal-products.component';
import { TestingModule } from '@testing/testing.module';
import { FormControl } from '@angular/forms';

describe('DropdownModalProductsComponent', () => {
  let component: DropdownModalProductsComponent;
  let fixture: ComponentFixture<DropdownModalProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(DropdownModalProductsComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownModalProductsComponent);
    component = fixture.componentInstance;
    component.products = [];
    component.control = new FormControl();
    component.amountToPay = 300;
    component.selectedProduct = null;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be openModal', () => {
    const modalPresentSpy = spyOn(component.modal, 'present').and.returnValue(
      Promise.resolve()
    );
    component.openModal();
    expect(modalPresentSpy).toHaveBeenCalled();

    component.amountToPay = null;
    fixture.detectChanges();
    expect(component.openModal()).toBe(void 0);
  });

  it('should call be isDisabled', () => {
    expect(component.isDisabled(200)).toBeTrue();
  });

  it('should call be hasBalanceError', () => {
    component.selectedProduct = {
      value: 900
    };
    fixture.detectChanges();
    expect(component.hasBalanceError()).toBeFalse();
  });

  it('should call be selectProduct', () => {
    const modalPresentSpy = spyOn(component.modal, 'dismiss').and.callFake(() =>
      Promise.resolve(true)
    );
    component.products = [
      {
        label: '',
        productsCards: [
          {
            value: 500,
            product: {
              id: '1'
            }
          }
        ]
      }
    ];
    fixture.detectChanges();
    component.selectProduct(0, 0);
    expect(modalPresentSpy).toHaveBeenCalled();
  });
  it('should not execute product selection logic if the product is disabled', () => {
    const product = { id: '1' };
    component.products = [
      {
        label: 'Producto deshabilitado',
        productsCards: [
          {
            value: 200,
            product: product
          }
        ]
      }
    ];

    component.selectedProduct = null;
    const emitSpy = spyOn(component.selectedProductFn, 'emit');
    const dismissSpy = spyOn(component.modal, 'dismiss').and.callFake(() =>
      Promise.resolve(true)
    );
    component.selectProduct(0, 0);
    expect(component.selectedProduct).toBeNull();
    expect(emitSpy).not.toHaveBeenCalled();
    expect(dismissSpy).not.toHaveBeenCalled();
  });
});
