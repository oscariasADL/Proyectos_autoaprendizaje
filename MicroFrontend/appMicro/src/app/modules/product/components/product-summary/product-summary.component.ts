import { Component, Input, OnInit } from '@angular/core';
import {
  POCKETS,
  PRODUCTS,
  REMITTANCES
} from '@commons/constants/navigate.constants';
import { fetchProductSpiUserKeysAction } from '../../store/product.actions';

import {
  HomeProduct,
  HomeProductType,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { NavController } from '@ionic/angular';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { MIN_PRODUCTS_QUANTITY_TO_GROUP } from '@modules/product/mappers/product-home.mapper';
import { ProductFacade } from '@modules/product/product.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';
import { CustomEventService } from '@commons/services/custom-events.service';
import { filter, take } from 'rxjs';
import { MICROFRONTEND_TOPICS } from '@commons/constants/microfrontend-events.constants';
import { Router } from '@angular/router';
import { TypeDocument } from '@app/commons/entities/product/type-document';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.sass']
})
export class ProductSummaryComponent implements OnInit {
  @Input() isAvailableProducts: boolean;
  @Input() hasCreditProductError: boolean;
  @Input() homeProduct: HomeProduct[];
  @Input() digitalDebitCards: DigitalDebitCard[];
  public readonly REMITTANCES = REMITTANCES;
  public typeProduct: typeof TypeProduct = TypeProduct;
  public homeProductType: typeof HomeProductType = HomeProductType;
  public productStyleType: typeof ProductStyleType = ProductStyleType;
  public minProductsQuantityToGroup: number = MIN_PRODUCTS_QUANTITY_TO_GROUP;
  public readonly featureFlagsKey = FeatureFlagsKey;
  public readonly denyDocuments: TypeDocument[] = [
    TypeDocument.CE,
    TypeDocument.TI
  ];
  public userData: DataBasicClientDto;
  currentRoute: string;
  constructor(
    private facade: ProductFacade,
    private navCtrl: NavController,
    private secureStorage: AdlSecureStorageService,
    private customEventService: CustomEventService,
    private router: Router
  ) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.getUserData();
    this.sendProductsToMFE();
    this.saveFirstTag();
  }
  private sendProductsToMFE() {
    this.facade.products$
      .pipe(
        filter((products) => !isNullOrUndefined(products)),
        take(1)
      )
      .subscribe((products) => {
        this.customEventService.publishCustomEvent(
          MICROFRONTEND_TOPICS.BASIC_CUSTOMER_ACCOUNTS,
          {
            value: products
          }
        );
      });
  }

  private async getUserData(): Promise<void> {
    const db = await this.secureStorage.getAll();
    this.userData = JSON.parse(getDBValue(db, SecureKeys.basicData));
  }

  public setProductFilter(productFilter: number = 0): void {
    this.facade.setProductFilter(productFilter);
    this.navCtrl.navigateForward(PRODUCTS);
  }

  public redirectProductDetail(url: string): void {
    this.navCtrl.navigateForward(url);
  }

  public navigateToPockets(): void {
    this.navCtrl.navigateForward(POCKETS, {
      queryParams: { showMessage: !this.isAvailableProducts }
    });
  }

  public digitalDebitCardDetail(product: DigitalDebitCard): void {
    this.facade.fetchDigitalDebitCardDetail(product.relativeParentId);
  }

  private saveFirstTag(): void {
    this.secureStorage.contains(SecureKeys.tagAval).then((key) => {
      if (!key) {
        this.facade.dispatch([fetchProductSpiUserKeysAction()]);
      }
    });
  }
}
