import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { HomeProduct } from '@commons/entities/product/balance.interface';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { mapProductCardItem } from '@modules/product/mappers/product-card-item.mapper';

@Component({
  selector: 'app-product-card-item',
  templateUrl: './product-card-item.component.html',
  styleUrls: ['./product-card-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardItemComponent implements OnInit {
  @Input() productDetail: HomeProduct;
  @Input() disabled: boolean = false;
  @Input() style: ProductStyleType = ProductStyleType.standard;
  @Input() showSubtitle: boolean = true;

  public data: ProductCard;

  ngOnInit(): void {
    this.data = mapProductCardItem(
      this.productDetail.product,
      this.style,
      this.disabled
    );
  }

  get productStyleType(): typeof ProductStyleType {
    return ProductStyleType;
  }
}
