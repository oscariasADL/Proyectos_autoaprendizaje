import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { groupBy, map, mergeMap, reduce, take, toArray } from 'rxjs/operators';

import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { Product } from '@commons/entities/product/product.interface';
import { GroupedProducts } from '@modules/documents/pages/extracts/entities/extracts.interface';
import {
  SELECT_SUB_PRODUCT_URL,
  SELECTED_PRODUCT_URL,
  TYPE_PRODUCT_CATEGORIES
} from '@modules/documents/pages/extracts/constants/extracts.constants';
import { NavController } from '@ionic/angular';
import { TypeProduct } from '@commons/entities/product/balance.interface';

@Component({
  selector: 'app-extracts-select-product',
  templateUrl: './extracts-select-product.component.html',
  styleUrls: ['./extracts-select-product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtractsSelectProductComponent {
  public limit = 5;

  constructor(
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private facade: ExtractsFacade
  ) {}

  public async navigateTo(item: GroupedProducts): Promise<void> {
    if (item?.values.length === 1) {
      const [product] = item.values as Product[];
      await this.navCtrl.navigateForward(
        `/${SELECTED_PRODUCT_URL}/${product.type}/${product.id}`
      );
      return;
    }
    const itemTypeProduct = item.typeProduct as string;
    await this.navCtrl.navigateForward(
      `/${SELECT_SUB_PRODUCT_URL}/${itemTypeProduct}`
    );
  }

  public loadMoreProducts(): void {
    const products: Product[] = this.products$.currentValue();
    this.limit = products?.length;
    this.cdRef.detectChanges();
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$;
  }

  get groupedProducts$(): Observable<GroupedProducts[]> {
    return this.facade.products$.pipe(
      take(1),
      mergeMap((product: Product[]) => product),
      map((p: Product) => {
        if (p.typeProduct === TypeProduct.ROTATING_CREDITS) {
          p.typeProduct = TypeProduct.MY_CREDITS;
          return p;
        }
        return p;
      }),
      groupBy((p: Product) => p.typeProduct),
      mergeMap((group$) =>
        group$.pipe(
          reduce((acc, cur) => [...acc, cur], [group$.key.toString()])
        )
      ),
      map((arr) => ({ typeProduct: arr[0], values: arr.slice(1) })),
      toArray()
    );
  }

  get typeProductCategories(): typeof TYPE_PRODUCT_CATEGORIES {
    return TYPE_PRODUCT_CATEGORIES;
  }
}
