import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { startOfMonth, format } from 'date-fns';

import * as NAVIGATE_ from '@commons/constants/navigate.constants';
import { Movement } from '@commons/entities/product/movement.interface';
import { removeSubscriptions } from '@commons/utils/util';
import { mapProductDetailPayAction } from '@modules/product-detail/mappers/product-detail.mapper';
import { ProductAction } from '@modules/product/entities/product-action.interface';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductDetailFacade } from './product-detail.facade';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { TypeAccount } from '@commons/entities/product/type-account';
import { filter, take, map } from 'rxjs/operators';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  PFMBalance,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';
import { ProductsFacade } from '@modules/products/products.facade';
import { Product } from '@commons/entities/product/product.interface';
import { actionSelectedFnHelper } from './helpers/product-detail.helpers';
import { DATE_FORMAT_3 } from '@commons/constants/date-format.constants';
import { showPFMInAccount } from '@modules/pfm/helpers/pfm.helpers';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import {
  Campaign,
  CampaignPlaces
} from '@modules/marketing-campaigns/entities/marketing-campaigns.interface';
import { CancelAccountFacade } from '../product-options/cancel-account/cancel-account.facade';
import { AlertService } from '@commons/services/alert.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailPage implements OnInit, OnDestroy {
  public tempProduct: ProductDetail = {};
  public readonly featureFlagsKey = FeatureFlagsKey;
  public accountTypesToBlockTemporarily = [TypeAccount.SDA, TypeAccount.DDA];
  public accountTypesToVirtualCreditCard = [TypeAccount.CCA];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private facade: ProductDetailFacade,
    private productsFacade: ProductsFacade,
    private cancelAccountFacade: CancelAccountFacade,
    private pfmFacade: PFMFacade
  ) {}

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const product: Product = this.product;
    this.tempProduct = {
      id: product?.id ?? this.route.snapshot.params.id,
      type: product?.type ?? this.route.snapshot.params.type
    };

    this.fetchPFMBalances();
    this.fetchPayrollAdvanceAccount();
  }

  ngOnDestroy(): void {
    this.facade.closeToast();
    removeSubscriptions(this.subscriptions);
  }

  public fetchProductDetail(): void {
    this.facade.fetchProductDetail(this.params.type, this.params.id);
  }

  public fetchPayrollAdvanceAccount(): void {
    this.facade.fetchProductPayrollAdvance(this.product.numberProduct);
  }

  public actionSelected(product: ProductDetail, action: ProductAction): void {
    const actionFn = actionSelectedFnHelper.bind(this)(product)[action.type];
    if (!isNullOrUndefined(actionFn)) {
      actionFn();
    }
  }

  public actionSelectedAlt(product: ProductDetail, actionType: string): void {
    const actionFn = actionSelectedFnHelper.bind(this)(product)[actionType];
    if (!isNullOrUndefined(actionFn)) {
      actionFn();
    }
  }

  public actionPay(product: ProductDetail): void {
    this.facade.setCreditSelected(
      mapProductDetailPayAction(product, this.params.id)
    );
    void Promise.resolve(this.navCtrl.navigateForward(NAVIGATE_.CREDITS_PAY))
      .then()
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }

  protected setProductSelected(product: ProductDetail): void {
    this.facade.setProductSelected({
      ...product,
      backUrl: `${NAVIGATE_.PRODUCT_DETAIL.toString()}/${
        this.route.snapshot.params.type
      }/${this.route.snapshot.params.id}`,
      id: this.route.snapshot.params.id
    });
  }

  public redirectToMovementsDetail(): void {
    this.navCtrl.navigateForward([
      `${NAVIGATE_.MOVEMENTS_DETAIL}/${this.route.snapshot.params.type}/${this.route.snapshot.params.id}`
    ]);
  }

  private fetchPFMBalances(): void {
    this.subscriptions.push(
      this.productDetail$
        .pipe(
          filter((data) => !isNullOrUndefined(data)),
          take(1)
        )
        .subscribe((productDetail) => {
          if (this.showPFM) {
            const startDate = format(startOfMonth(new Date()), DATE_FORMAT_3);
            const endDate = format(new Date(), DATE_FORMAT_3);
            this.pfmFacade.getBalancesSummary({
              accountId: productDetail.id,
              accountType: productDetail?.type as TypeAccount,
              startDate,
              endDate
            });
            const productType =
              productDetail?.type === TypeAccount.CCA
                ? PFMProductTypeEnum.TC
                : productDetail?.type === TypeAccount.DDA
                ? PFMProductTypeEnum.CC
                : PFMProductTypeEnum.CA;
            this.pfmFacade.fetchIncomeCategories(productType);
          }
        })
    );
  }

  get params(): Params {
    return this.route.snapshot.params;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get product(): Product {
    return this.productsFacade.getProduct(
      this.route.snapshot.params.type,
      this.route.snapshot.params.id
    );
  }

  public showPayrollAdvanceBtn(): boolean {
    const isSDA = this.product?.type === TypeAccount.SDA;
    const isPayrollAdvanceEnabled = this.facade.featureFlagsByKey(
      FeatureFlagsKey.EnablePayrollAdvance
    );

    return (
      isSDA &&
      this.productDetailPayrollAdvance$.currentValue()
        .payrollAdvanceIsPreApproved &&
      Boolean(isPayrollAdvanceEnabled)
    );
  }

  get accountType(): TypeAccount | null {
    return (
      (this.product?.type as TypeAccount) ??
      this.route.snapshot.params.type ??
      null
    );
  }

  get productDetail$(): Observable<ProductDetail> {
    return this.facade.productDetail$;
  }

  get productDetailPayrollAdvance$(): Observable<ProductDetail> {
    return this.facade.productDetailPayrollAdvance$;
  }

  get hasMovements$(): Observable<boolean> {
    return this.facade.hasMovements$;
  }

  get workingMovements$(): Observable<boolean> {
    return this.facade.workingMovements$;
  }

  get completedMovements$(): Observable<boolean> {
    return this.facade.completedMovements$;
  }

  get productMovements$(): Observable<Movement[]> {
    return this.facade.productMovements$;
  }

  get balancesSummary$(): Observable<PFMBalance[]> {
    return this.pfmFacade.balancesSummary$;
  }

  get balancesSummaryWorking$(): Observable<boolean> {
    return this.pfmFacade.balancesWorking$;
  }

  get balancesSummaryCompleted$(): Observable<boolean> {
    return this.pfmFacade.balancesCompleted$;
  }

  get viewSlider$(): boolean {
    return (
      this.accountType === TypeAccount.CCA ||
      this.accountType === TypeAccount.DDA ||
      this.accountType === TypeAccount.SDA
    );
  }

  get showPFM(): boolean {
    return showPFMInAccount(
      this.accountType,
      Boolean(this.pfmFacade.featureFlagsByKey(FeatureFlagsKey.PFM))
    );
  }

  get marketingCampaign$(): Observable<Campaign> {
    return this.facade.marketingCampaignsByPlace(
      CampaignPlaces.PRODUCT_DETAIL,
      this.accountType
    );
  }

  get currentRouteUrl(): string {
    return this.router.url;
  }
}
