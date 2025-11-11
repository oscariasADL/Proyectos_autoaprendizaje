import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TYPE_PRODUCT_CATEGORIES_TITLES } from '@modules/documents/pages/extracts/constants/extracts.constants';
import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { Product } from '@commons/entities/product/product.interface';

@Component({
  selector: 'app-extracts-select-subproduct',
  templateUrl: './extracts-select-subproduct.component.html',
  styleUrls: ['./extracts-select-subproduct.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtractsSelectSubproductComponent {
  constructor(private route: ActivatedRoute, private facade: ExtractsFacade) {}

  get products$(): Observable<Product[]> {
    return this.facade.products$.pipe(
      map((products: Product[]) =>
        products.filter(
          (product) =>
            product.typeProduct.toString() === this.params.typeProduct
        )
      )
    );
  }

  get params(): Params {
    return this.route.snapshot.params;
  }

  get typeProductCategoriesTitles(): typeof TYPE_PRODUCT_CATEGORIES_TITLES {
    return TYPE_PRODUCT_CATEGORIES_TITLES;
  }
}
