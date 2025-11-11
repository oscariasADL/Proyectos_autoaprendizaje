import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import {
  QrData,
  QRType
} from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { QrPaymentMethod } from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import { Product } from '@commons/entities/product/product.interface';
import {
  ModalProducts,
  ModalTypeProducts
} from '@modules/forms-avv/entities/dropdown-modal-products';
import { mapProductCardItem } from '@modules/product/mappers/product-card-item.mapper';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

@Component({
  selector: 'app-qr-pay-data',
  templateUrl: './qr-pay-data.component.html',
  styleUrls: ['./qr-pay-data.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrPayDataComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() date: string;
  @Input() paymentMethod: QrPaymentMethod;
  @Input() products: Product[];
  @Input() spiUserKey: TransferSpiUserKey;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() reScanQR: EventEmitter<void> = new EventEmitter<void>();

  public modalProducts: ModalProducts[] = null;

  ngOnInit() {
    this.installments.reset(null);
    if (this.isQrDynamic) {
      this.amount.clearValidators();
      this.amount.updateValueAndValidity();
      this.amount.setValue(Number(this.qrData.totalTrxAmount));
    }
    this.modalProducts = [
      ...(this.paymentMethod?.debitAccounts?.length > 0 &&
      !this.isItBetweenAccounts.value
        ? [
            {
              type: ModalTypeProducts.DEBIT_CARDS,
              label: 'Tarjetas Débito',
              productsCards: this.paymentMethod?.debitAccounts
                ?.map((product) =>
                  mapProductCardItem(product, ProductStyleType.standard, false)
                )
                ?.map((product) => ({
                  ...product,
                  title: `Tarjeta Débito ${product?.title.slice(
                    product?.title.indexOf('No.'),
                    product?.title.length
                  )}`,
                  icon: 'icon-tarjeta'
                }))
            }
          ]
        : []),
      ...(this.paymentMethod?.creditCards?.length > 0 &&
      !this.isItBetweenAccounts.value
        ? [
            {
              type: ModalTypeProducts.CREDIT_CARDS,
              label: 'Tarjetas Crédito',
              productsCards: this.paymentMethod?.creditCards?.map((product) =>
                mapProductCardItem(product, ProductStyleType.standard, false)
              )
            }
          ]
        : []),
      {
        type: ModalTypeProducts.ACCOUNTS,
        label: 'Cuentas',
        productsCards: this.products?.map((product) =>
          mapProductCardItem(product, ProductStyleType.standard, false)
        )
      }
    ];
  }

  public selectedProduct(product: Product) {
    this.fromProduct.setValue(product);
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get qrData(): QrData {
    return this.data?.value as QrData;
  }

  get isQrDynamic(): boolean {
    return this.qrType.value.toString() === QRType.dynamic.toString();
  }

  get merchantName(): string {
    return this.spiUserKey.name;
  }

  get data(): AbstractControl {
    return this.form.get('data');
  }

  get amount(): AbstractControl<number> {
    return this.form.get('amount');
  }

  get qrType(): AbstractControl<QRType> {
    return this.form.get('qrType');
  }

  get installments(): AbstractControl {
    return this.form.get('installments');
  }

  get isItBetweenAccounts(): AbstractControl {
    return this.form.get('isItBetweenAccounts');
  }
}
