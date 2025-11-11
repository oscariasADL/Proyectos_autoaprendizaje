import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ModalProducts } from '@modules/forms-avv/entities/dropdown-modal-products';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { mapProductCardItem } from '@modules/product/mappers/product-card-item.mapper';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

@Component({
  selector: 'app-dropdown-modal-products',
  templateUrl: './dropdown-modal-products.component.html',
  styleUrls: ['./dropdown-modal-products.component.sass'],
  standalone: true,
  imports: [CommonModule, IonicModule, GlobalPipesModule]
})
export class DropdownModalProductsComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  @Input() label: string = 'Seleccione una opción';
  @Input() modalTitle: string = 'Selecciona una opción';
  @Input() control: AbstractControl;
  @Input() products: ModalProducts[];
  @Input() amountToPay: number = null;
  @Input() showGroupLabel: boolean = true;

  @Output() selectedProductFn: EventEmitter<Product> =
    new EventEmitter<Product>();

  public selectedProduct: ProductCard;

  ngOnInit() {
    if (!isNullOrUndefined(this.control.value)) {
      const mapProduct = mapProductCardItem(
        this.control.value,
        ProductStyleType.standard,
        false
      );
      this.selectedProduct = {
        ...mapProduct,
        ...([TypeAccount.SDA, TypeAccount.DDA].includes(
          this.control.value?.type as TypeAccount
        ) && this.control.value?.paymentType === 'debit'
          ? {
              title: `Tarjeta Débito ${mapProduct?.title.slice(
                mapProduct?.title.indexOf('No.'),
                mapProduct?.title.length
              )}`,
              icon: 'icon-tarjeta'
            }
          : {})
      };
    }
  }

  public openModal() {
    if (isNullOrUndefined(this.amountToPay)) return;
    void this.modal.present();
  }

  public isDisabled(value: number): boolean {
    return this.amountToPay > value;
  }

  public hasBalanceError(): boolean {
    if (isNullOrUndefined(this.selectedProduct)) return false;
    return this.isDisabled(this.selectedProduct.value);
  }

  public selectProduct(indexGroup: number, index: number): void {
    const productGroup = this.products[indexGroup] as ModalProducts;
    const productCard = productGroup.productsCards[index];
    const product = productCard.product;
    if (this.isDisabled(productCard.value)) return;
    this.selectedProduct = productCard;
    this.selectedProductFn.emit(product as Product);
    void this.modal.dismiss();
  }
}
