import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  filter,
  withLatestFrom,
  map,
  takeUntil,
  take,
  tap,
  Subscription
} from 'rxjs';

import {
  GenericStepperAction,
  GenericStepperInit
} from '@app/commons/decorators/generic-stepper.decorator';
import {
  BRE_B_TRANSFER_EXIT_DATA,
  BRE_B_TRANSFER_IS_FAVORITE_CONTACT_QUERY_PARAM,
  BRE_B_TRANSFER_IS_SAVED_CONTACT_QUERY_PARAM,
  BRE_B_TRANSFER_SPI_KEY_QUERY_PARAM,
  BREB_TRANSFERS_STEPS,
  BreBTransfersSlide,
  GMF_TRANSACTION_IS_NOT_ALLOWED
} from './constants/bre-b-transfers.constants';
import { GenericStepperBase } from '@app/modules/templates/generic-stepper/generic-stepper.base';
import {
  mapBreBTransferSlides,
  mapBreBTransferVoucher
} from './mappers/bre-b-transfer-slides.mapper';
import { TRANSFERS } from '@app/commons/constants/navigate.constants';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import {
  transferNoteValidators,
  transfersBreBAmountValidators
} from '../../helpers/transfer-form.helper';
import { Product } from '@app/commons/entities/product/product.interface';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';
import { BreBTransfersFacade } from './bre-b-transfers.facade';
import { HeaderType } from '@app/commons/entities/header/header.interface';
import { mapTransferPayload } from '../../mappers/transfers-payload.mapper';
import { TransferType } from '../../entities/transfers.interface';
import {
  sanitizeCurrency,
  stringToBoolean
} from '@commons/helpers/text.helpers';
import { TowardAccount } from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { mapTargetAccountFromSpiUserKey } from '@modules/transfers/pages/bre-b-transfers/mappers/bre-b-transfer.mapper';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { ALPHANUMERIC_PATTERN } from '@app/commons/constants/regex.constants';

@Component({
  selector: 'app-bre-b-transfers',
  templateUrl: './bre-b-transfers.page.html',
  styleUrls: []
})
@GenericStepperInit(
  {
    initSlide: BreBTransfersSlide.key,
    alternativeSlide: BreBTransfersSlide.key
  },
  {
    backUrl: TRANSFERS,
    steps: BREB_TRANSFERS_STEPS,
    exitData: BRE_B_TRANSFER_EXIT_DATA,
    data: (component: BreBTransfersPage) =>
      mapBreBTransferSlides(component.form),
    confirmMapper: () => [],
    voucherMapper: () => []
  }
)
export class BreBTransfersPage
  extends GenericStepperBase
  implements OnInit, OnDestroy
{
  public readonly headerType: HeaderType = HeaderType.redHeadingSix;
  public readonly destroy$ = new Subject<void>();
  private readonly featureFlagsKey = FeatureFlagsKey;
  private subscription: Subscription;

  public gmfTransactionIsNotAllowed = GMF_TRANSACTION_IS_NOT_ALLOWED;
  constructor(
    protected injector: Injector,
    private route: ActivatedRoute,
    private facade: BreBTransfersFacade
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.initStepper();
    this.listenQueryParams();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
    this.facade.setAddSpiContactPayload(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @GenericStepperAction
  public transfer(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  public nextStep(slide: BreBTransfersSlide): void {
    if (slide === BreBTransfersSlide.key) {
      this.isFavoriteContactControl.setValue(null);
      this.isSavedContactControl.setValue(null);
    }
    super.nextStep(slide);
  }

  public modifySpiKeyTransfer(): void {
    this.nextStep(BreBTransfersSlide.key);
  }

  public modifyDataTransfer(): void {
    this.nextStep(BreBTransfersSlide.data);
  }

  protected async setConfirmationData(): Promise<void> {
    const gmfPayload: GMFPayload = {
      productNumber: this.form.value.fromProduct.numberProduct,
      productType: this.form.value.fromProduct.type,
      amountTransaction: sanitizeCurrency(this.form.value.amount),
      availableBalance: this.form.value.fromProduct.availableBalance
    };
    this.getGMF(gmfPayload);

    this.voucher = mapBreBTransferVoucher.bind(this, this.form.value)();

    this.nextStep(BreBTransfersSlide.confirmation);
  }

  private getGMF(gmfPayload: GMFPayload) {
    this.genericStepperFacade
      .isFeatureFlagEnabled(FeatureFlagsKey.FourPerThousandFee)
      .pipe(
        take(1),
        tap((isEnabled) => {
          if (isEnabled) {
            this.facade.fetchGMF(gmfPayload);
            this.setGMF();
          }
        })
      )
      .subscribe();
  }

  private setGMF() {
    this.subscription = this.facade.gmf$
      .pipe(
        filter((gmf) => !!gmf),
        tap((gmf) => this.gmfDataControl.setValue(gmf))
      )
      .subscribe();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      towardAvalKey: new FormControl<string>(null, Validators.required),
      towardProduct: [null],
      isFavoriteContact: [null],
      isSavedContact: [null],
      shouldSaveSpiContact: [false],
      contactName: [null],
      amount: new FormControl<string>('', [
        Validators.required,
        transfersBreBAmountValidators.bind(this)
      ]),
      fromProduct: new FormControl<Product>({}, Validators.required),
      transferType: [TransferType.SEND_BRE_B],
      breBTransfer: [true],
      addenda: this.formBuilder.group({
        note: [
          null,
          [
            Validators.pattern(ALPHANUMERIC_PATTERN),
            transferNoteValidators.bind(this),
            Validators.minLength(
              this.facade.boundsByKey(ParameterKey.transferNoteMinLength)
            )
          ]
        ]
      }),
      fee: new FormControl<string>('Gratis'),
      gmfData: [],
      confirmation: []
    });
  }

  private listenQueryParams(): void {
    this.route.queryParamMap
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(
          this.facade.isFeatureFlagEnabled(this.featureFlagsKey.SPIContactBook)
        )
      )
      .subscribe(([params, isSpiContactBookEnabled]) => {
        if (params.has(BRE_B_TRANSFER_SPI_KEY_QUERY_PARAM)) {
          const spiKey = params.get(BRE_B_TRANSFER_SPI_KEY_QUERY_PARAM);
          this.towardAvalKeyControl.setValue(spiKey);
          this.querySpiKeyData(spiKey)
            .pipe(take(1))
            .subscribe((spiKeyData) => {
              this.towardProductControl.setValue(spiKeyData);
              this.contactNameControl.setValue(spiKeyData.name);
              this.nextStep(BreBTransfersSlide.data);
            });
        }
        if (!isSpiContactBookEnabled) return;
        if (params.has(BRE_B_TRANSFER_IS_FAVORITE_CONTACT_QUERY_PARAM)) {
          this.isFavoriteContactControl.setValue(
            stringToBoolean(
              params.get(BRE_B_TRANSFER_IS_FAVORITE_CONTACT_QUERY_PARAM)
            )
          );
          this.isSavedContactControl.setValue(true);
        }
        if (params.has(BRE_B_TRANSFER_IS_SAVED_CONTACT_QUERY_PARAM)) {
          this.isSavedContactControl.setValue(
            stringToBoolean(
              params.get(BRE_B_TRANSFER_IS_SAVED_CONTACT_QUERY_PARAM)
            )
          );
        }
      });
  }

  private querySpiKeyData(spiKey: string): Observable<TowardAccount> {
    this.facade.fetchAccount(spiKey);
    return this.facade.breBSpiKeyData$.pipe(
      withLatestFrom(this.facade.brebBAccountKeyCompleted$),
      filter(([accountSpiKey, completed]) => completed && !!accountSpiKey),
      map(([accountSpiKey]) => mapTargetAccountFromSpiUserKey(accountSpiKey))
    );
  }

  get towardAvalKeyControl(): AbstractControl<string> {
    return this.form.get('towardAvalKey');
  }

  get towardProductControl(): AbstractControl {
    return this.form.get('towardProduct');
  }

  get isFavoriteContactControl(): AbstractControl {
    return this.form.get('isFavoriteContact');
  }

  get isSavedContactControl(): AbstractControl {
    return this.form.get('isSavedContact');
  }

  get gmfDataControl(): AbstractControl {
    return this.form.get('gmfData');
  }

  get contactNameControl(): AbstractControl {
    return this.form.get('contactName');
  }
}
