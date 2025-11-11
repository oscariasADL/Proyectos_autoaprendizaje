import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FindOtherFeaturesProducts,
  FindOtherFeaturesType
} from '@commons/components/find-other-features/find-other-features.constants';
import { FindOtherFeaturesFacade } from '@commons/components/find-other-features/find-other-features.facade';
import { SecureKeys } from '@commons/constants/keys.constants';
import { PRODUCT_DETAIL } from '@commons/constants/navigate.constants';
import { OTHER_FEATURES_ALERT } from '@commons/constants/other-features.constants';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { NavController } from '@ionic/angular';
import { fetchProductDetailSuccessAction } from '@modules/product-detail/store/product-detail.actions';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import { Actions, ofType } from '@ngrx/effects';
import orderBy from 'lodash/orderBy';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-find-other-features',
  templateUrl: './find-other-features.component.html',
  styleUrls: ['./find-other-features.component.sass']
})
export class FindOtherFeaturesComponent implements OnInit {
  @Input() type: FindOtherFeaturesType;

  public isMigrated: boolean = false;

  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private alertService: AlertService,
    private facade: FindOtherFeaturesFacade,
    private secureStorage: AdlSecureStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.checkMigrated();
  }

  public showMessage(): void {
    const buttons: string[] = [
      ...(this.productsByType(TypeAccount.CCA).length > 0
        ? ['Tarjeta de crédito']
        : []),
      ...(this.productsByType(TypeAccount.LOC).length > 0
        ? ['Crédito Rotativo']
        : [])
    ];

    this.alertService
      .create({ ...OTHER_FEATURES_ALERT[this.type], buttons })
      .then((option) => {
        switch (option) {
          case 0:
            this.redirectProduct(
              orderBy(
                this.productsByType(TypeAccount.CCA),
                ['availablePurchasesBalance'],
                ['desc']
              )[0]
            );
            break;

          case 1:
            this.redirectProduct(this.productsByType(TypeAccount.LOC)[0]);
            break;
        }
      });
  }

  private redirectProduct(product: Product): void {
    this.navCtrl.navigateForward(
      `${PRODUCT_DETAIL.toString()}/${product.type}/${product.id}`
    );
    this.clickTourButtonOnLoaded(`product-actions-tour-${product.id}`);
  }

  private clickTourButtonOnLoaded(productActionsTourId: string): void {
    this.actions$
      .pipe(ofType(fetchProductDetailSuccessAction), take(1))
      .subscribe((action) => {
        setTimeout(() => {
          const tourButton = document.getElementById(productActionsTourId);
          if (!isNullOrUndefined(tourButton)) {
            tourButton.click();
          }
        }, 0);
      });
  }

  private productsByType(type: TypeAccount): Product[] {
    return this.products$
      .currentValue()
      .filter((product) => product.type === type);
  }

  private async checkMigrated(): Promise<void> {
    const db = await this.secureStorage.getAll();
    this.isMigrated = !isNullOrUndefined(getDBValue(db, SecureKeys.isMigrated));
    this.cdRef.detectChanges();
  }

  get shouldShow$(): Observable<boolean> {
    return this.products$.pipe(
      map((products: Product[]) => this.isMigrated && products?.length > 0)
    );
  }

  get products$(): Observable<Product[]> {
    return this.facade.balance$.pipe(
      map((balance) => mapProductsByFilter(balance, FindOtherFeaturesProducts))
    );
  }

  get findOtherFeaturesType(): typeof FindOtherFeaturesType {
    return FindOtherFeaturesType;
  }
}
