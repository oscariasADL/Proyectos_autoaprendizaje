import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ParameterType } from './../../../../store/state/parameter.state';
import { ProductFacade } from './../../product.facade';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  ProductDetailData,
  ProductDetailItem,
  ProductDetailItemType
} from '@modules/product/entities/product-detail.interface';
import { mapProductDetail } from '@modules/product/mappers/product-detail.mapper';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '@commons/components/popover/popover.component';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TranslateService } from '@ngx-translate/core';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import {
  isAvalTag,
  isAvalTagPresent,
  keysWithoutRegister,
  showTagAvalPopover
} from '../../helpers/product.helper';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { SPI_MF } from '@app/commons/constants/navigate.constants';
import { ViewMoreKeysType } from '../product-card/view-more-keys-button/view-more-keys-button.component';
import { ProductSpiUserKey } from '../../entities/product-spi-user-key';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { select, Store } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { sortUserKeysByAccountTypeAndPriority } from '../../mappers/product-home.mapper';
import { spiUserKeysSelector } from '../../store/product.selector';

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailCardComponent implements OnInit {
  @Input() product: ProductDetail;

  @Output() action: EventEmitter<void> = new EventEmitter<void>();

  public data: ProductDetailData;
  public codeBanks: any[] = [];
  public isDropdownOpen: boolean = false;
  public filteredSpiKeys$: Observable<ProductSpiUserKey[]>;
  public hasMoreKeys$: Observable<boolean>;
  constructor(
    private popoverCtrl: PopoverController,
    private productFacade: ProductFacade,
    private translateService: TranslateService,
    private navController: NavController,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.data = mapProductDetail.bind(this)(this.product);
    const accountIds = [
      ...(Array.isArray(this.product?.avalTagKey)
        ? this.product.avalTagKey
        : []),
      ...(Array.isArray(this.product?.breBUserKeys)
        ? this.product.breBUserKeys
        : [])
    ].map((k) => k.accountId);

    this.filteredSpiKeys$ = this.store.pipe(
      select(spiUserKeysSelector),
      map((keys: ProductSpiUserKey[]) => {
        if (Array.isArray(keys) && keys.length > 0 && accountIds.length > 0) {
          const accountIdSet = new Set(accountIds);
          const filtered = keys.filter((item) =>
            accountIdSet.has(item.accountId)
          );

          this.hasMoreKeys$ = of(
            filtered.length > 0 &&
              this.isSPIEnabled() &&
              this.nonRegisteredKeys().length > 1
          );

          return sortUserKeysByAccountTypeAndPriority(filtered);
        }
        return [];
      })
    );
  }

  ionViewWillLeave() {
    this.productFacade.closeToast();
  }
  public hasAvalTag() {
    const hasAvalTag =
      this.isAvalTagEnabled() && isAvalTagPresent(this.product);

    return hasAvalTag;
  }

  public hasBreBKeys() {
    const hasBreBKeys =
      this.isBreBKeyEnabled() &&
      this.product.breBUserKeys &&
      this.product.breBUserKeys.length >= 1;
    return hasBreBKeys;
  }

  public hasMoreThanOneKey(): boolean {
    const brebCount = this.product.breBUserKeys?.length || 0;
    const avalTagCount = this.product.avalTagKey?.length || 0;

    return brebCount + avalTagCount >= 2;
  }

  public isSPIEnabled() {
    return Boolean(
      this.productFacade.featureFlagsByKey(FeatureFlagsKey.SPIKeysMFE)
    );
  }

  public isAvalTagEnabled() {
    return Boolean(
      this.productFacade.featureFlagsByKey(FeatureFlagsKey.TagAval)
    );
  }

  public isBreBKeyEnabled() {
    return Boolean(
      this.productFacade.featureFlagsByKey(FeatureFlagsKey.BreBKey)
    );
  }

  public async goToBreB() {
    await this.navController.navigateForward(SPI_MF);
  }
  public nonRegisteredKeys(): ProductSpiUserKey[] {
    return keysWithoutRegister(this.product.avalTagKey);
  }

  public async showPopover(
    ev: Event,
    text: string,
    id: string,
    title: string = null
  ): Promise<void> {
    const popover = await this.popoverCtrl.create({
      id: 'popover-product-detail-' + id,
      component: PopoverComponent,
      componentProps: {
        title: title && this.translateService.instant(title),
        text: this.translateService.instant(text)
      },
      cssClass: 'avv-popover',
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }

  public async showTagAvalPopover(
    ev: Event,
    id: string,
    productSpiUserKey: ProductSpiUserKey
  ): Promise<void> {
    const popoverId = `popover-product-detail-${id}`;

    await showTagAvalPopover(
      ev,
      this.popoverCtrl,
      popoverId,
      productSpiUserKey.keyId,
      isAvalTag(productSpiUserKey)
    );
  }
  public isSDAOrDDAAccount() {
    return (
      this.product.type === TypeAccount.SDA ||
      this.product.type === TypeAccount.DDA
    );
  }
  public async copySpiUserKey(infoToCopyText: string): Promise<void> {
    this.productFacade.closeToast();
    this.productFacade.showToast({
      type: ToastType.success,
      title: this.translateService.instant('PRODUCT.SPI_KEYS.HOME_COPIED_TEXT')
    });
    if (!Capacitor.isNativePlatform()) {
      await navigator.clipboard.writeText(infoToCopyText);
      return;
    }

    await Clipboard.write({
      string: infoToCopyText
    });
  }

  public getBankLabel(bankCode: string): DropdownList | undefined {
    const data = this.productFacade
      .parameterByKey(ParameterType.codeBanks)
      .currentValue();
    return data.find((item) => item.codigo === bankCode);
  }

  public cromalineLoadingError(e: Event): void {
    const imageUrlPipe = new ImageUrlPipe();
    const imgTarget = e.target as HTMLImageElement;
    imgTarget.src = imageUrlPipe.transform(
      'cromalinesV2/avvillas-td-classic.svg'
    );
  }

  get productDetailItemType(): typeof ProductDetailItemType {
    return ProductDetailItemType;
  }

  get buttonActions(): ProductDetailItem[] {
    return (
      this.data?.quickList?.filter(
        (item) => item.type === ProductDetailItemType.Button
      ) || []
    );
  }

  get viewMoreKeysType(): typeof ViewMoreKeysType {
    return ViewMoreKeysType;
  }
}
