import { Component, OnInit } from '@angular/core';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { AlertService } from '@commons/services/alert.service';
import { ProductsFacade } from '../../products.facade';
import {
  REQUEST_PRODUCTS_ALERT,
  REQUEST_PRODUCTS_SLIDERS,
  CREDIT_CARD_SLIDE_MFE,
  CREDIT_CARD_SLIDE,
  PERSONAL_LOAN_SLIDE_MFE,
  PERSONAL_LOAN_SLIDE,
  DIGITAL_DEBIT_CARD_SLIDE,
  DIGITAL_HOUSING_SLIDE_MFE
} from './constants/request-products.constants';
import { RequestProductSlide } from './entities/request-products.entities';
import { NavController } from '@ionic/angular';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-request-products',
  templateUrl: './request-products.page.html',
  styleUrls: ['./request-products.page.sass']
})
export class RequestProductsPage implements OnInit {
  public sliders: RequestProductSlide[] = REQUEST_PRODUCTS_SLIDERS;
  public userName: string;

  constructor(
    private facade: ProductsFacade,
    private alertService: AlertService,
    private navCtrl: NavController,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this.addProducts();
    this.getUserName();
  }

  public selectProduct(slide: RequestProductSlide): void {
    if (!slide.isExternal) {
      this.navCtrl.navigateForward(slide.url);
      return;
    }

    this.alertService.create(REQUEST_PRODUCTS_ALERT).then((confirm) => {
      if (!!confirm) {
        this.facade.logout();
        this.facade.redirectExternal(slide.url as LinkKey);
      }
    });
  }

  private addProducts(): void {
    this.addCreditCardSlide();
    this.addPersonalLoanSlide();
    this.addDigitalDebitCard();
    this.addRequestDigitalHousing();
  }

  private addCreditCardSlide(): void {
    const isMFEEnabled = this.facade.featureFlagsByKey(
      FeatureFlagsKey.CreditCardMFE
    );
    const isUserLoggedIn = this.facade.isLogged$.currentValue();

    const creditCardSlide =
      isMFEEnabled && isUserLoggedIn
        ? CREDIT_CARD_SLIDE_MFE
        : CREDIT_CARD_SLIDE;

    this.sliders = [creditCardSlide, ...this.sliders];
  }

  private addDigitalDebitCard(): void {
    const isUserLoggedIn = this.facade.isLogged$.currentValue();

    if (
      isUserLoggedIn &&
      this.facade.canRequestDigitalDebitCard().currentValue()
    ) {
      this.sliders = [...this.sliders, DIGITAL_DEBIT_CARD_SLIDE];
    }
  }

  private addPersonalLoanSlide(): void {
    const isMFEEnabled = this.facade.featureFlagsByKey(
      FeatureFlagsKey.PersonalLoanMFE
    );
    const isUserLoggedIn = this.facade.isLogged$.currentValue();

    const personalLoanSlide =
      isMFEEnabled && isUserLoggedIn
        ? PERSONAL_LOAN_SLIDE_MFE
        : PERSONAL_LOAN_SLIDE;

    this.sliders = [personalLoanSlide, ...this.sliders];
  }

  private addRequestDigitalHousing(): void {
    const featureFlag = this.facade.featureFlagsByKey(
      FeatureFlagsKey.DigitalHousingMFE
    );

    if (featureFlag && this.facade.isLogged$.currentValue()) {
      this.sliders = [...this.sliders, DIGITAL_HOUSING_SLIDE_MFE];
    }
  }

  private async getUserName(): Promise<void> {
    const db = await this.secureStorage.getAll();
    const basicData = getDBValue(db, SecureKeys.basicData);
    if (!isNullOrUndefinedOrEmpty(basicData)) {
      this.userName = (JSON.parse(basicData) as DataBasicClientDto)?.clientName;
    }
  }
}
