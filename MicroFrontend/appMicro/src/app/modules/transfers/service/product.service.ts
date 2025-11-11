// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '@app/commons/entities/product/product.interface';
import { Balance } from '@app/commons/entities/product/balance.interface';
import { mapProductsByFilter } from '@app/modules/product/mappers/product-filter.mapper';
import { ProductFilterSelector } from '@app/commons/entities/product/product-types.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public filterProducts(
    balance: Balance[],
    filters: ProductFilterSelector
  ): Product[] {
    return mapProductsByFilter(balance, filters).map((product) =>
      product.type === TypeAccount.DDA ? { ...product } : product
    );
  }
}
