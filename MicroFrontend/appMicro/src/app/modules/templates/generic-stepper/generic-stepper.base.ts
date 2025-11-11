import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  Type
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { GMF_TRANSACTION_IS_NOT_ALLOWED } from '@app/modules/transfers/pages/bre-b-transfers/constants/bre-b-transfers.constants';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { Fee, FeePayload } from '@commons/entities/fee/fee.interface';
import { Product } from '@commons/entities/product/product.interface';
import { trackViewEvent } from '@commons/helpers/event.helpers';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { FeatureToggleService } from '@commons/services/feature-toggle.service';
import { FeeService } from '@commons/services/fee.service';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  AlertStepData,
  GenericStepperData,
  InitSlideI,
  VerifyFieldI
} from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperFacade } from '@modules/templates/generic-stepper/generic-stepper.facade';
import { TranslateService } from '@ngx-translate/core';
import { filter, Subscription, take, tap } from 'rxjs';

@Component({
  template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class GenericStepperBase implements OnDestroy {
  public steps: Step[] | ((component: GenericStepperBase) => Step[]);
  public form: UntypedFormGroup;
  public backUrl: string[] | ((component: GenericStepperBase) => string[]);
  public currentSlide: string;
  public voucher: VoucherItem[];
  public data: GenericStepperData;
  public exitData: AlertSheetProperties;

  protected fee: FeeService;
  protected imageUrl: ImageUrlPipe;
  protected cdRef: ChangeDetectorRef;
  protected formBuilder: UntypedFormBuilder;
  protected translate: TranslateService;
  protected currencyFormat: CurrencyFormatPipe;
  protected featureToggleService: FeatureToggleService;
  protected genericStepperFacade: GenericStepperFacade;

  private _dataFunction: any;
  private _feePayload: any;
  private _gmfPayload: any;

  private _confirmMapper: any;
  private _voucherMapper: any;
  private _stepperAction: any;
  private _initSlide: InitSlideI;
  private _verifyField: VerifyFieldI;

  private gmfSubscription: Subscription;

  public gmfTransactionIsNotAllowed = GMF_TRANSACTION_IS_NOT_ALLOWED;

  constructor(protected injector: Injector) {
    this.fee = this.injector.get<FeeService>(FeeService);
    this.imageUrl = this.injector.get<ImageUrlPipe>(ImageUrlPipe);
    this.formBuilder =
      this.injector.get<UntypedFormBuilder>(UntypedFormBuilder);
    this.translate = this.injector.get<TranslateService>(TranslateService);
    this.featureToggleService =
      this.injector.get<FeatureToggleService>(FeatureToggleService);
    this.cdRef = this.injector.get<ChangeDetectorRef>(
      ChangeDetectorRef as Type<ChangeDetectorRef>
    );
    this.currencyFormat =
      this.injector.get<CurrencyFormatPipe>(CurrencyFormatPipe);
    this.genericStepperFacade =
      this.injector.get<GenericStepperFacade>(GenericStepperFacade);
  }

  ngOnDestroy(): void {
    this.genericStepperFacade.resetProductSelected();
    this.gmfSubscription && this.gmfSubscription.unsubscribe();
  }

  public slideSelected(slide: string): void {
    this.nextStep(slide);
  }

  public stepSelected(step: Step): void {
    this.nextStep(
      Object.keys(this.data).find((key) => this.data[key].step === step.id)
    );
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide, value } = data;
    const keys = Object.keys(this.data);
    const index = keys.indexOf(slide);
    this.form.updateValueAndValidity();

    if (index < keys.length - 2) {
      this.nextStep(keys[index + 1]);
    } else if (index === keys.length - 2) {
      this.setConfirmationData(keys[index + 1].toString());
    } else {
      if (!isNullOrUndefined(value)) {
        this.nextStep(value);
      } else {
        this._stepperAction();
      }
    }
  }

  protected initStepper(): void {
    if (!!!this._stepperAction) {
      throw new Error(
        `You must call the decorator '@GenericStepperAction' to assign the final action`
      );
    }
    const { initSlide, alternativeSlide, field: initField } = this._initSlide;
    this.initSlide(initSlide, alternativeSlide, initField);
    this.setData(
      typeof this.backUrl === 'function' ? this.backUrl(this) : this.backUrl,
      typeof this.steps === 'function' ? this.steps(this) : this.steps,
      this.exitData,
      this._dataFunction(this),
      this._confirmMapper,
      this._voucherMapper,
      this._feePayload,
      this._stepperAction
    );
    if (!!this._verifyField) {
      const { step, field, activateField, title, description } =
        this._verifyField;
      this.verifyField(step, field, activateField, title, description);
    }
  }

  protected setData(
    backUrl: string[],
    steps: Step[],
    exitData: AlertSheetProperties,
    data: GenericStepperData,
    confirmMapper: any,
    voucherMapper: any,
    feePayload: any,
    stepperAction: any
  ): void {
    this.steps = steps;
    this.data = data;
    this.backUrl = this.mapBackUrl(backUrl);
    this.exitData = exitData;
    this._feePayload = feePayload;
    this._confirmMapper = confirmMapper;
    this._voucherMapper = voucherMapper;
    this._stepperAction = stepperAction;

    this.cdRef.detectChanges();
    this.trackEvent();
  }

  protected productSelected(): Product {
    return !isNullOrUndefined(
      this.genericStepperFacade.productSelected$.currentValue()
    )
      ? this.genericStepperFacade.productSelected$.currentValue()
      : null;
  }

  protected mapBackUrl(backUrl: string[]): string[] {
    return !isNullOrUndefined(this.productSelected())
      ? [this.productSelected().backUrl]
      : backUrl;
  }

  protected verifyField(
    step: string,
    field: string = 'availableBalance',
    activateField: boolean = true,
    title: string = this.translate.instant(
      'GENERIC_STEPPER.ACCOUNTS_ERROR.TITLE'
    ),
    description: string = this.translate.instant(
      'GENERIC_STEPPER.ACCOUNTS_ERROR.DESCRIPTION'
    )
  ): void {
    if (
      !isNullOrUndefined(this.productSelected()) &&
      this.productSelected()[field] === 0
    ) {
      this.data[step].data.hasException = true;
      this.data[step].data.accountException = { title, description };
    }
    if (activateField) {
      this.data[step].data.disabledField = field;
    }
    this.cdRef.detectChanges();
  }

  public alertStepData(): AlertStepData {
    return {
      voucher: this.voucher,
      backUrl:
        typeof this.backUrl === 'function' ? this.backUrl(this) : this.backUrl
    };
  }

  protected nextStep(slide: string): void {
    this.currentSlide = slide;
    this.form.updateValueAndValidity();
    this.cdRef.detectChanges();
    this.featureToggleService.checkPermissions();
    this.trackEvent();
  }

  protected initSlide(
    initSlide: string,
    alternativeSlide: string,
    field: string = 'availableBalance'
  ): void {
    const product = this.productSelected();
    this.setCurrentSlide(
      !isNullOrUndefined(this.productSelected()) && product[field] > 0
        ? alternativeSlide
        : initSlide
    );
  }

  protected setCurrentSlide(slide: string): void {
    this.currentSlide = slide;
  }

  protected async setConfirmationData(confirmationStep: string): Promise<void> {
    this.genericStepperFacade.enableLoading();
    this.fetchGMF();

    if (this._feePayload) {
      const fee = await this.getFee(this._feePayload());
      this.form.controls.fee.setValue(fee.amount);
    }

    this.genericStepperFacade.disableLoading();
    this.setGMFValue(confirmationStep);

    this.setConfirmationValue();

    if (this._voucherMapper) {
      this.voucher = this._voucherMapper.bind(this, this.form.value)();
    }
    this.nextStep(confirmationStep);
  }

  protected async getFee(payload: FeePayload): Promise<Fee> {
    return await this.fee.fetchCost(payload).toPromise();
  }

  private setGMFValue(confirmationStep: string) {
    if (this._gmfPayload) {
      this.gmfSubscription = this.genericStepperFacade.gmf
        .pipe(
          tap((this.data[confirmationStep].data.noticeError = null)),
          filter((gmf) => !!gmf),
          tap((gmf) => {
            this.form.controls.costGmf.setValue(gmf.costGmf);

            gmf.allowTransaction === this.gmfTransactionIsNotAllowed &&
              this.setInsufficientFundsError(confirmationStep);
            this.setConfirmationValue();

            this.cdRef.detectChanges();
          })
        )
        .subscribe();
    }
  }

  private setConfirmationValue() {
    this.form.controls.confirmation.setValue(
      this._confirmMapper.bind(this, this.form.value)()
    );
  }

  private setInsufficientFundsError(confirmationStep: string) {
    this.data[confirmationStep].data.noticeError = this.translate.instant(
      'GMF.INSUFFICIENT_FUNDS'
    );
  }

  private fetchGMF() {
    this.genericStepperFacade
      .isFeatureFlagEnabled(FeatureFlagsKey.FourPerThousandFee)
      .pipe(
        take(1),
        tap((isEnabled) => {
          if (this._gmfPayload && isEnabled) {
            const gmfPayload = this._gmfPayload();
            this.genericStepperFacade.fetchGMF(gmfPayload);
          }
        })
      )
      .subscribe();
  }

  private trackEvent(): void {
    const url = `/${this.exitData.id.split('-conf')[0]}/${
      this.currentSlide?.dashCase() ?? 1
    }`;
    trackViewEvent(url);
  }
}
