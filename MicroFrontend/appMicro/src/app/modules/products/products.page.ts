import { Component, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  Balance,
  PRODUCT_TYPE_CATEGORIES,
  SHOW_AVAL_PRODUCTS,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { IonContent, NavController } from '@ionic/angular';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { mapProductDetailUrl } from '@modules/product/mappers/product-home.mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsFacade } from './products.facade';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.sass']
})
export class ProductsPage implements OnDestroy {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public productCategory: UntypedFormControl = new UntypedFormControl(
    this.filter$
  );
  public productStyleType: typeof ProductStyleType = ProductStyleType;
  storedTagAval = '';
  constructor(private navCtrl: NavController, private facade: ProductsFacade) {}
  ngOnDestroy(): void {
    this.facade.closeToast();
  }
  ionViewWillLeave() {
    this.facade.closeToast();
  }

  ionViewWillEnter(): void {
    this.setCurrentProductFilter();
    this.content.scrollToTop(0).then();
  }

  public setProductFilter(filter: string): void {
    this.facade.setProductFilter(parseInt(filter, 10));
  }

  public productDetail(product: Product): void {
    if (product?.style === ProductStyleType.digitalDebitCard) {
      const digitalDebitCard = product as DigitalDebitCard;
      this.facade.fetchDigitalDebitCardDetail(
        digitalDebitCard.relativeParentId
      );
    } else {
      void this.navCtrl.navigateForward(mapProductDetailUrl(product));
    }
  }

  private setCurrentProductFilter(): void {
    this.productCategory.setValue(this.productFilter$.currentValue());
  }

  get productFilter$(): Observable<DropdownList> {
    return this.filter$.pipe(
      map((filter: number) =>
        this.productTypeCategories.find(
          (item) => item.value === filter.toString()
        )
      )
    );
  }

  get showAvalProducts$(): Observable<boolean> {
    return this.filter$.pipe(
      map((filter: number) => SHOW_AVAL_PRODUCTS.includes(filter))
    );
  }

  get forceViewAvalProducts$(): Observable<boolean> {
    return this.filter$.pipe(
      map((filter: number) => filter === TypeProduct.AVAL)
    );
  }

  get balances$(): Observable<Balance[]> {
    return this.facade.balances$;
  }

  get filter$(): Observable<number> {
    return this.facade.filter$;
  }

  get productTypeCategories$(): Observable<DropdownList[]> {
    return this.facade.productTypeCategories$;
  }

  get productTypeCategories(): DropdownList[] {
    return PRODUCT_TYPE_CATEGORIES;
  }
}
