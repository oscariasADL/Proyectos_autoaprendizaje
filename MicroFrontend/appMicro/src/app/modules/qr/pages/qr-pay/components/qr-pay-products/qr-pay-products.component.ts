import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';
import { QrPaymentMethod } from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';

@Component({
  selector: 'app-qr-pay-products',
  templateUrl: './qr-pay-products.component.html',
  styleUrls: ['./qr-pay-products.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrPayProductsComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() paymentMethod: QrPaymentMethod;
  @Input() products: Product[];

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.installments.reset(null);
  }

  public selectProduct(product: Product): void {
    if (!this.isDisabled(product)) {
      this.fromProduct.setValue(product);
      this.fromProduct.markAsDirty();
      this.continue.emit();
    }
  }

  public isDisabled(product: Product): boolean {
    return this.amount.currencyValue() > Number(product.availableBalance);
  }

  get data(): AbstractControl {
    return this.form.get('data');
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get isItBetweenAccounts(): AbstractControl {
    return this.form.get('isItBetweenAccounts');
  }

  get amount(): AbstractControl<number> {
    return this.form.get('amount');
  }

  get isValidCommerce(): AbstractControl<boolean> {
    return this.form.get('isValidCommerce');
  }

  get installments(): AbstractControl {
    return this.form.get('installments');
  }
}
