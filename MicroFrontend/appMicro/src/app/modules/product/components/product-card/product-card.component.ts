import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import {
  HomeProduct,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { mapProductCard } from '@modules/product/mappers/product-card.mapper';
import { TypeAccount } from '@commons/entities/product/type-account';
import { TranslateService } from '@ngx-translate/core';
import { AppFacade } from '@app/app.facade';
import { CapacitorUtilitiesService } from '@app/commons/services/capacitor-utilities-service.service';
import { Router } from '@angular/router';
import {
  isAvalTag,
  isAvalTagPresent,
  isNotBreBKeyRegistered,
  keysWithoutRegister,
  showTagAvalPopover
} from '../../helpers/product.helper';
import {
  TAG_AVAL_COPY_EVENT,
  TAG_AVAL_CUTOMIZATION_FROM_ICON_EVENT
} from '../../constants/product.constants';

import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { SPI_MF } from '@app/commons/constants/navigate.constants';
import { ProductSpiUserKey } from '../../entities/product-spi-user-key';
import { ViewMoreKeysType } from './view-more-keys-button/view-more-keys-button.component';
import { sortUserKeysByAccountTypeAndPriority } from '../../mappers/product-home.mapper';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { spiUserKeysSelector } from '../../store/product.selector';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() index: number;
  @Input() productDetail: HomeProduct;
  @Input() disabled: boolean = false;
  @Input() style: ProductStyleType = ProductStyleType.standard;
  @Input() balanceTypeProduct: TypeProduct;
  @Output() clickAction: EventEmitter<void> = new EventEmitter<void>();

  public data: ProductCard;
  public spiKeys$: Observable<ProductSpiUserKey[]>;
  public filteredSpiKeys$: Observable<ProductSpiUserKey[]>;
  public hasMoreKeys: boolean;
  public userHasNotKeys: boolean;
  public avalKeys: ProductSpiUserKey[];
  public readonly utagForCopyKey: UtagEvent = TAG_AVAL_COPY_EVENT;
  public readonly utagForModifyKey: UtagEvent =
    TAG_AVAL_CUTOMIZATION_FROM_ICON_EVENT;

  constructor(
    private popoverCtrl: PopoverController,
    public capacitorUtilities: CapacitorUtilitiesService,
    private facade: AppFacade,
    private router: Router,
    private navController: NavController,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.data = mapProductCard(
      this.productDetail.product,
      this.style,
      this.disabled
    );

    if (this.data?.avalTagKey && Array.isArray(this.data.avalTagKey)) {
      this.avalKeys = sortUserKeysByAccountTypeAndPriority([
        ...this.data.avalTagKey
      ]);
    } else {
      this.avalKeys = [];
    }

    const accountIds = [
      ...(Array.isArray(this.data?.avalTagKey) ? this.data.avalTagKey : []),
      ...(Array.isArray(this.data?.breBUserKeys) ? this.data.breBUserKeys : [])
    ].map((k) => k.accountId);

    this.filteredSpiKeys$ = this.store.pipe(
      select(spiUserKeysSelector),
      map((keys: ProductSpiUserKey[]) => {
        if (Array.isArray(keys) && keys.length > 0 && accountIds.length > 0) {
          const accountIdSet = new Set(accountIds);
          const filtered = keys.filter((item) =>
            accountIdSet.has(item.accountId)
          );

          this.hasMoreKeys = filtered.length > 0;
          return sortUserKeysByAccountTypeAndPriority(filtered);
        }
        return [];
      })
    );
  }

  public async goToBreB() {
    await this.navController.navigateForward(SPI_MF);
  }

  public isSPIEnabled() {
    return Boolean(this.facade.featureFlagsByKey(FeatureFlagsKey.SPIKeysMFE));
  }

  public isAvalTagEnabled() {
    return Boolean(this.facade.featureFlagsByKey(FeatureFlagsKey.TagAval));
  }

  public isBreBKeyEnabled() {
    return Boolean(this.facade.featureFlagsByKey(FeatureFlagsKey.BreBKey));
  }

  public hasBreBKeys() {
    const hasBreBKeys =
      this.isBreBKeyEnabled() &&
      this.productDetail.product.breBUserKeys &&
      this.productDetail.product.breBUserKeys.length >= 1;

    return hasBreBKeys;
  }

  public hasMoreThanOneKey(): boolean {
    const brebCount = this.productDetail.product.breBUserKeys?.length || 0;
    const avalTagCount = this.productDetail.product.avalTagKey?.length || 0;

    return brebCount + avalTagCount >= 2;
  }

  public hasAvalTag() {
    const hasAvalTag =
      this.isAvalTagEnabled() && isAvalTagPresent(this.productDetail.product);

    return hasAvalTag;
  }
  public hasBreBKeyNotregistered(): boolean {
    return isNotBreBKeyRegistered(this.data.avalTagKey);
  }
  public nonRegisteredKeys(): ProductSpiUserKey[] {
    return keysWithoutRegister(this.data.avalTagKey);
  }

  public async showTagAvalPopover(
    $event: Event,
    item?: ProductSpiUserKey
  ): Promise<void> {
    const popoverId = `popover-product-card-${this.index}`;
    await showTagAvalPopover(
      $event,
      this.popoverCtrl,
      popoverId,
      item?.keyId,
      isAvalTag(item)
    );
  }

  public redirectToModifyTagAval(item: ProductSpiUserKey) {
    this.router.navigateByUrl(`/customize-aval-tag/${item.keyId}`);
  }

  public isSDAOrDDAAccount() {
    return (
      this.productDetail.product.type === TypeAccount.SDA ||
      this.productDetail.product.type === TypeAccount.DDA
    );
  }

  public isEnabledRegisterBreB() {
    return (
      this.balanceTypeProduct &&
      this.balanceTypeProduct === TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS
    );
  }

  get productStyleType(): typeof ProductStyleType {
    return ProductStyleType;
  }

  get typeAccount(): typeof TypeAccount {
    return TypeAccount;
  }

  get viewMoreKeysType(): typeof ViewMoreKeysType {
    return ViewMoreKeysType;
  }
  get footerCanBeShown(): boolean {
    return !this.data.valueIsText;
  }
}
