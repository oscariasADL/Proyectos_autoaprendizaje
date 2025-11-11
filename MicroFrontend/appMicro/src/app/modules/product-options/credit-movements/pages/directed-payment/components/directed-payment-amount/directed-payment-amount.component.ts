import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  UntypedFormControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';

import { DirectedPaymentType } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { MIN_PRODUCTS_QUANTITY_TO_GROUP } from '@modules/product/mappers/product-home.mapper';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { Product } from '@commons/entities/product/product.interface';
import {
  ModalProducts,
  ModalTypeProducts
} from '@modules/forms-avv/entities/dropdown-modal-products';
import { mapProductCardItem } from '@modules/product/mappers/product-card-item.mapper';
import { ProductStyleType } from '@modules/product/entities/product.interface';

@Component({
  selector: 'app-directed-payment-amount',
  templateUrl: './directed-payment-amount.component.html',
  styleUrls: ['./directed-payment-amount.component.sass']
})
export class DirectedPaymentAmountComponent implements OnInit {
  @ViewChild('stickyTotal', { static: false }) stickyTotal: ElementRef;

  @Input() form: FormGroup;
  @Input() control: FormControl;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public readonly MIN_PRODUCTS_QUANTITY_TO_GROUP =
    MIN_PRODUCTS_QUANTITY_TO_GROUP;
  public activeType: DirectedPaymentType;

  constructor(private facade: CreditMovementsFacade) {}

  ngOnInit(): void {
    this.fromProduct.addValidators([
      (control: UntypedFormControl): ValidationErrors => {
        const value: number = control.value?.availableBalance;
        if (!isNullOrUndefined(value)) {
          if (value < this.totalValueToPay) {
            return { transferValueToSendNotFunds: true };
          }
        }
        return null;
      }
    ]);
    this.form.markAsUntouched();
  }

  public getControl(control: AbstractControl): UntypedFormControl {
    return control as UntypedFormControl;
  }

  public continueAction(): void {
    if (this.selectedMovements.valid && this.fromProduct.valid) {
      this.selectedMovements.controls.forEach((control) => {
        const valueToPay = control.get('valueToPay');
        const otherValue = control.get('otherValue');

        if (!isNullOrUndefined(otherValue.value)) {
          otherValue.setValue(otherValue.value);
          valueToPay.setValue(otherValue.value);
        }
      });
      this.continue.emit();
    }
  }

  public setActiveType(
    type: DirectedPaymentType,
    control: AbstractControl
  ): void {
    this.activeType = type;
    const otherValueControl = control.get('otherValue');
    const valueToPayControl = control.get('valueToPay');

    control.get('directedPaymentType').setValue(this.activeType);
    control.markAsUntouched();

    if (this.activeType === this.directedPaymentType.totalValue) {
      otherValueControl.setValue(null);
      otherValueControl.removeValidators(Validators.required);
      if (!valueToPayControl.hasValidator(Validators.required)) {
        valueToPayControl.addValidators(Validators.required);
      }
    } else {
      if (!otherValueControl.hasValidator(Validators.required)) {
        otherValueControl.addValidators(Validators.required);
        valueToPayControl.removeValidators(Validators.required);
      }
    }
    otherValueControl.updateValueAndValidity();
  }

  public selectProduct(product: Product): void {
    this.fromProduct.setValue(product);
    this.fromProduct.updateValueAndValidity();
  }

  public modalProducts(products: Product[]): ModalProducts[] {
    return [
      {
        type: ModalTypeProducts.ACCOUNTS,
        label: 'Cuentas',
        productsCards: products?.map((product) =>
          mapProductCardItem(product, ProductStyleType.standard, false)
        )
      }
    ];
  }

  get selectedMovements(): FormArray {
    return this.form.get('selectedMovements') as FormArray;
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get directedPaymentType(): typeof DirectedPaymentType {
    return DirectedPaymentType;
  }

  get totalValueToPay(): number {
    return this.selectedMovements.value.reduce((accumulator, movement) => {
      const valueToPay = sanitizeCurrency(movement?.valueToPay) ?? 0;
      const otherValue = sanitizeCurrency(movement?.otherValue) ?? 0;

      return otherValue > 0
        ? accumulator + otherValue
        : accumulator + valueToPay;
    }, 0);
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$;
  }
}
