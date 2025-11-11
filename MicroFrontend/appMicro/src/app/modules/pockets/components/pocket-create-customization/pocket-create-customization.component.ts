import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import {
  ModalProducts,
  ModalTypeProducts
} from '@modules/forms-avv/entities/dropdown-modal-products';
import { mapProductCardItem } from '@modules/product/mappers/product-card-item.mapper';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { Product } from '@commons/entities/product/product.interface';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { DropdownModalProductsComponent } from '@modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';
import { UpperCasePipe } from '@angular/common';
import { PocketCategoryPipe } from '@modules/pockets/pipes/pocket-category.pipe';

@Component({
  selector: 'app-pocket-create-customization',
  templateUrl: './pocket-create-customization.component.html',
  styleUrls: ['./pocket-create-customization.component.sass'],
  standalone: true,
  imports: [
    GlobalPipesModule,
    FormsAvvModule,
    DropdownModalProductsComponent,
    UpperCasePipe,
    PocketCategoryPipe
  ]
})
export class PocketCreateCustomizationComponent implements OnInit {
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() products!: Product[] | null;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public modalProducts: ModalProducts[] = null;

  ngOnInit() {
    this.modalProducts = [
      {
        type: ModalTypeProducts.ACCOUNTS,
        label: '',
        productsCards: this.products?.map((product) =>
          mapProductCardItem(product, ProductStyleType.standard, false)
        )
      }
    ];
  }

  public selectCategory(category: DropdownList) {
    this.category.setValue(category);
  }

  public selectedProduct(product: Product) {
    this.product.setValue(product);
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get pocketCategories(): AbstractControl {
    return this.form.get('pocketCategories');
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get product(): AbstractControl {
    return this.form.get('product');
  }
}
