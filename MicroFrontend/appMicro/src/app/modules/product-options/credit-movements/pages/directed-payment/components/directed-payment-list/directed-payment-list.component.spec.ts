import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DirectedPaymentListComponent } from './directed-payment-list.component';

import { TestingModule } from '@testing/testing.module';
import { DirectedPaymentFactory } from '@testing/factories/directed-payment.factory';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { CreditMovementsFacadeMock } from '@testing/mocks/facade/credit-movements.facade.mock';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';

describe('DirectedPaymentListComponent', () => {
  let component: DirectedPaymentListComponent;
  let fixture: ComponentFixture<DirectedPaymentListComponent>;
  const creditMovementsFacadeMock = new CreditMovementsFacadeMock();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DirectedPaymentListComponent],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: CreditMovementsFacade,
          useValue: creditMovementsFacadeMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectedPaymentListComponent);
    component = fixture.componentInstance;
    component.form = new FormBuilder().group({
      paymentsArray: new FormArray([]),
      selectedMovements: new FormArray([]),
      checkedCount: [0]
    });
    component.movements = new DirectedPaymentFactory().createBulk(3);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call getValuesArray', () => {
    const index = 0;
    const formArray = new FormArray([
      new FormControl('Value 1'),
      new FormControl('Value 2'),
      new FormControl('Value 3')
    ]);
    const group = new FormGroup({
      values: formArray
    });
    component.paymentsArray.push(group);

    const result = component.getValuesArray(index);

    expect(result).toBe(formArray);
  });

  it('should be call getControl', () => {
    const i = 0;
    const j = 1;
    const controlValue = 'Value';
    const formArray = new FormArray([
      new FormControl('Value 1'),
      new FormControl(controlValue),
      new FormControl('Value 3')
    ]);
    const group = new FormGroup({
      values: formArray
    });
    component.paymentsArray.push(group);

    const result: AbstractControl = component.getControl(i, j);

    expect(result).toBeTruthy();
    expect(result.value).toBe(controlValue);
  });

  it('should be call checkPayment, when checkedCount exceeds MAX_SELECTION', () => {
    component.paymentsArray.push(
      new FormGroup({
        values: new FormArray([
          new FormControl(true),
          new FormControl(true),
          new FormControl(false)
        ])
      })
    );
    component.paymentsArray.push(
      new FormGroup({
        values: new FormArray([
          new FormControl(true),
          new FormControl(true),
          new FormControl(false),
          new FormControl(true)
        ])
      })
    );

    component.checkPayment();

    component.paymentsArray.controls.forEach((group) => {
      const valuesArray = group.get('values') as FormArray;
      valuesArray.controls.forEach((control) => {
        if (!control.value) {
          expect(control.disabled).toBeTruthy();
        } else {
          expect(control.disabled).toBeFalsy();
        }
      });
    });
  });

  it('should be call checkPayment, when checkedCount does not exceed MAX_SELECTION', () => {
    component.paymentsArray.push(
      new FormGroup({
        values: new FormArray([
          new FormControl(true),
          new FormControl(true),
          new FormControl(false)
        ])
      })
    );
    component.paymentsArray.push(
      new FormGroup({
        values: new FormArray([
          new FormControl(true),
          new FormControl(false),
          new FormControl(false)
        ])
      })
    );

    component.checkPayment();

    component.paymentsArray.controls.forEach((group) => {
      const valuesArray = group.get('values') as FormArray;
      valuesArray.controls.forEach((control) => {
        expect(control.disabled).toBeFalsy();
      });
    });
  });

  it('should add selected payments to selectedMovements', () => {
    const indexGroup = 0;
    const indexValue = 1;
    const payment: CreditMovement =
      component.movements[indexGroup].values[indexValue];
    component.paymentsArray.push(
      new FormGroup({
        values: new FormArray([new FormControl(false), new FormControl(true)])
      })
    );

    component.continueAction();

    expect(component.selectedMovements.length).toBe(1);

    const selectedFormGroup = component.selectedMovements.at(0) as FormGroup;
    expect(selectedFormGroup.value.balance).toEqual(
      sanitizeCurrency(payment.balance)
    );
  });

  it('should emit the continue event', () => {
    spyOn(component.continue, 'emit');

    component.continueAction();

    expect(component.continue.emit).toHaveBeenCalled();
  });

  it('should call openExternalLink', () => {
    const linkByKeySpy = spyOn(creditMovementsFacadeMock, 'linkByKey');
    const openExternalLinksSpy = spyOn(
      creditMovementsFacadeMock,
      'openExternalLinks'
    );
    component.openExternalLink();
    expect(linkByKeySpy).toHaveBeenCalled();
    expect(openExternalLinksSpy).toHaveBeenCalled();
  });
});
