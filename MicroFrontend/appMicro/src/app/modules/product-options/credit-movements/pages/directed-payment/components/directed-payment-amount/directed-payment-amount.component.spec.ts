import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';

import { DirectedPaymentAmountComponent } from './directed-payment-amount.component';
import { TestingModule } from '@testing/testing.module';
import { ProductFactory } from '@testing/factories/product.factory';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { CreditMovementsFacadeMock } from '@testing/mocks/facade/credit-movements.facade.mock';
import { DirectedPaymentType } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';

describe('DirectedPaymentAmountComponent', () => {
  let component: DirectedPaymentAmountComponent;
  let fixture: ComponentFixture<DirectedPaymentAmountComponent>;
  const fromProduct = new ProductFactory().create();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DirectedPaymentAmountComponent],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: CreditMovementsFacade,
          useClass: CreditMovementsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectedPaymentAmountComponent);
    component = fixture.componentInstance;
    component.form = new FormBuilder().group({
      selectedMovements: new FormArray([]),
      fromProduct: new FormControl(fromProduct)
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an UntypedFormControl for an AbstractControl', () => {
    const control = new UntypedFormControl() as AbstractControl;

    const untypedControl = component.getControl(control);

    expect(untypedControl).toBeInstanceOf(UntypedFormControl);
  });

  it('should be update values in selectedMovements if otherValue is not null', () => {
    component.selectedMovements.push(
      new FormGroup({
        valueToPay: new FormControl(100),
        otherValue: new FormControl('100'),
        balance: new FormControl(200)
      })
    );
    component.selectedMovements.push(
      new FormGroup({
        valueToPay: new FormControl(200),
        otherValue: new FormControl(null),
        balance: new FormControl(200)
      })
    );
    spyOn(component.continue, 'emit');

    component.continueAction();

    expect(component.selectedMovements.at(0).get('valueToPay').value).toBe(
      '100'
    );
    expect(component.selectedMovements.at(1).get('valueToPay').value).toBe(200);
    expect(
      component.selectedMovements.at(1).get('otherValue').value
    ).toBeNull();
    expect(component.continue.emit).toHaveBeenCalled();
  });

  it('should update the controls based on the active type (otherValue)', () => {
    const control = new FormBuilder().group({
      directedPaymentType: null,
      otherValue: null,
      valueToPay: null
    });

    component.setActiveType(DirectedPaymentType.otherValue, control);

    expect(component.activeType).toBe(DirectedPaymentType.otherValue);
    expect(control.get('directedPaymentType').value).toBe(
      DirectedPaymentType.otherValue
    );
    expect(control.get('otherValue').value).toBe(null);
    expect(control.get('valueToPay').value).toBe(null);
    expect(
      control.get('otherValue').hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      control.get('valueToPay').hasValidator(Validators.required)
    ).toBeFalse();
  });

  it('should update the controls based on the active type (totalValue)', () => {
    const control = new FormBuilder().group({
      directedPaymentType: null,
      otherValue: null,
      valueToPay: 10
    });

    component.setActiveType(DirectedPaymentType.totalValue, control);

    expect(component.activeType).toBe(DirectedPaymentType.totalValue);
    expect(control.get('directedPaymentType').value).toBe(
      DirectedPaymentType.totalValue
    );
    expect(control.get('otherValue').value).toBe(null);
    expect(control.get('valueToPay').value).toBe(10);
    expect(
      control.get('otherValue').hasValidator(Validators.required)
    ).toBeFalse();
    expect(
      control.get('valueToPay').hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('should update the fromProduct form control', () => {
    const product = new ProductFactory().create();

    component.selectProduct(product);

    expect(component.fromProduct.value).toEqual(product);
    expect(component.fromProduct.valid).toBe(true);
  });

  it('should return modalProducts', () => {
    const products = new ProductFactory().createBulk(3);
    const modalProducts = component.modalProducts(products);

    expect(modalProducts.length).toEqual(1);
  });
  it('should return validation error if available balance is less than total value to pay', () => {
    const control = new UntypedFormControl({ availableBalance: 50 });
    spyOnProperty(component, 'totalValueToPay', 'get').and.returnValue(100);

    const validationResult = component.fromProduct.validator(control);

    expect(validationResult).toEqual({ transferValueToSendNotFunds: true });
  });
  it('should return 0 if selectedMovements is empty', () => {
    component.form = new FormBuilder().group({
      selectedMovements: new FormArray([])
    });

    const totalValueToPay = component.totalValueToPay;

    expect(totalValueToPay).toBe(0);
  });

  it('should return the sum of valueToPay if otherValue is null or 0', () => {
    component.form = new FormBuilder().group({
      selectedMovements: new FormArray([
        new FormGroup({
          valueToPay: new FormControl('100'),
          otherValue: new FormControl(null)
        }),
        new FormGroup({
          valueToPay: new FormControl('200'),
          otherValue: new FormControl(0)
        })
      ])
    });

    const totalValueToPay = component.totalValueToPay;

    expect(totalValueToPay).toBe(300);
  });

  it('should return the sum of otherValue if otherValue is greater than 0', () => {
    component.form = new FormBuilder().group({
      selectedMovements: new FormArray([
        new FormGroup({
          valueToPay: new FormControl('100'),
          otherValue: new FormControl('150')
        }),
        new FormGroup({
          valueToPay: new FormControl('200'),
          otherValue: new FormControl('250')
        })
      ])
    });

    const totalValueToPay = component.totalValueToPay;

    expect(totalValueToPay).toBe(400);
  });
});
