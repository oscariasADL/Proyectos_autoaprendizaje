import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { BlockAccountTypeIds } from '@modules/product-options/block-account/constants/block-account.constants';
import { Observable } from 'rxjs';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';

@Component({
  selector: 'app-block-account',
  templateUrl: './block-account.page.html',
  styleUrls: ['./block-account.page.sass']
})
export class BlockAccountPage implements OnInit, OnDestroy {
  constructor(
    private blockAccountFacade: BlockAccountFacade,
    private productDetailFacade: ProductDetailFacade
  ) {}

  ngOnInit(): void {
    this.setBlockAccountSelectedProduct({
      ...this.productDetail$.currentValue(),
      productType: this.productDetail$.currentValue()?.type
    });
    this.setBlockAccountForm(
      this.productDetail$.currentValue()?.id,
      BlockAccountTypeIds.Stole
    );
  }

  ngOnDestroy(): void {
    this.setBlockAccountSelectedProduct(null);
    this.setBlockAccountProductMedias(null);
    this.setBlockAccountForm(null, BlockAccountTypeIds.LostNotebook);
  }

  get productDetail$(): Observable<ProductDetail> {
    return this.productDetailFacade.productDetail$;
  }

  public setProductDetail(productDetail: ProductDetail): void {
    this.productDetailFacade.setProductSelected(productDetail);
  }

  public setBlockAccountSelectedProduct(productDetail: ProductDetail): void {
    this.blockAccountFacade.setBlockAccountSelectedProduct(productDetail);
  }

  public setBlockAccountProductMedias(
    medias: ActivationProduct[] | null
  ): void {
    this.blockAccountFacade.setBlockAccountProductMedias(medias);
  }

  public setBlockAccountForm(relativeId: string, lockId: string): void {
    this.blockAccountFacade.setBlockAccountForm(relativeId, lockId);
  }
}
