import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Product } from '@commons/entities/product/product.interface';
import { ActivateDigitalDebitCardForm } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { MIN_PRODUCTS_QUANTITY_TO_GROUP } from '@modules/digital-debit-card/pages/activate-digital-debit-card/constants/activate-digital-debit-card.constants';

@Component({
  selector: 'app-activate-digital-debit-card-config',
  templateUrl: './activate-digital-debit-card-config.component.html',
  styleUrls: ['./activate-digital-debit-card-config.component.sass']
})
export class ActivateDigitalDebitCardConfigComponent {
  @Input() form: FormGroup<ActivateDigitalDebitCardForm>;
  @Input() products: Product[];
  @Output() activate: EventEmitter<void> = new EventEmitter<void>();

  public readonly minProductsQuantityToGroup: number =
    MIN_PRODUCTS_QUANTITY_TO_GROUP;

  public selectProduct(product: Product): void {
    this.form.controls.productOrigin.setValue(product);
  }

  get productOrigin(): AbstractControl<Product> {
    return this.form.get('productOrigin');
  }

  get nickName(): AbstractControl<string> {
    return this.form.get('nickName');
  }

  get amount(): AbstractControl<string> {
    return this.form.get('amount');
  }
}
