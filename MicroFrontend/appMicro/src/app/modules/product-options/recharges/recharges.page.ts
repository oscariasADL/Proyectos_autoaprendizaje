import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { DeviceData } from '@app/commons/entities/device/device.interface';
import {
  PAYMENTS,
  TRANSFERS,
  WITHDRAW
} from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { removeSubscriptions } from '@commons/utils/util';
import {
  RECHARGES_EXIT_DATA,
  RECHARGES_STEPS,
  RechargesSlide
} from '@modules/product-options/recharges/constants/recharges.constants';
import {
  rechargesAccountValidators,
  rechargesAmountValidators,
  rechargesPhoneValidators
} from '@modules/product-options/recharges/helpers/recharges-validators.helpers';
import {
  mapRechargesConfirm,
  mapRechargesVoucher
} from '@modules/product-options/recharges/mappers/recharges-confirm.mapper';
import {
  mapCustomFacts,
  mapRechargesPayload
} from '@modules/product-options/recharges/mappers/recharges-payload.mapper';
import { mapRechargesSlides } from '@modules/product-options/recharges/mappers/recharges-slides.mapper';
import { RechargesFacade } from '@modules/product-options/recharges/recharges.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { CustomFacts } from './entities/recharges.interface';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';

@Component({
  selector: 'app-recharges',
  templateUrl: './recharges.page.html',
  styleUrls: ['./recharges.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: RechargesSlide.productOrigin,
    alternativeSlide: RechargesSlide.operator
  },
  {
    backUrl: (component: RechargesPage) => component.getBackUrl(),
    steps: RECHARGES_STEPS,
    exitData: RECHARGES_EXIT_DATA,
    data: (component: RechargesPage) =>
      mapRechargesSlides.bind(component)(component.form),
    confirmMapper: mapRechargesConfirm,
    voucherMapper: mapRechargesVoucher
  },
  { step: RechargesSlide.productOrigin }
)
export class RechargesPage
  extends GenericStepperBase
  implements OnInit, OnDestroy
{
  private subscriptions: Subscription[] = [];

  constructor(protected injector: Injector, private facade: RechargesFacade) {
    super(injector);
    facade.featureFlagsByKey(FeatureFlagsKey.SPIKeysMFE);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();

    this.subscriptions.push(
      this.form
        .get('phoneNumber')
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe((va) => this.form.get('displayName').setValue(null))
    );
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }
  public getBackUrl(): string[] {
    const isSPIKeysMFEEnabled = this.facade.featureFlagsByKey(
      FeatureFlagsKey.SPIKeysMFE
    );

    return isSPIKeysMFEEnabled ? PAYMENTS : WITHDRAW;
  }
  private initForm(): void {
    this.form = this.formBuilder.group({
      productOrigin: [
        this.productSelected(),
        [Validators.required, rechargesAccountValidators.bind(this)]
      ],
      amount: [
        null,
        [Validators.required, rechargesAmountValidators.bind(this)]
      ],
      phoneNumber: [
        null,
        [Validators.required, rechargesPhoneValidators.bind(this)]
      ],
      displayName: [null],
      mobileOperator: [null],
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('productOrigin').value;
    return {
      transactionId: TransactionCostIds.PhoneRecharge,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperGMFPayload
  public gmfPayload(): GMFPayload {
    const { productOrigin, amount } = this.form.value;

    return {
      productNumber: productOrigin.numberProduct,
      productType: productOrigin.type,
      amountTransaction: sanitizeCurrency(amount),
      availableBalance: productOrigin.availableBalance
    };
  }

  @GenericStepperAction
  public recharge(): void {
    if (this.form.valid) {
      this.facade.recharge(
        mapRechargesPayload({
          ...this.form.value
        }),
        this.alertStepData()
      );
    }
  }
}
