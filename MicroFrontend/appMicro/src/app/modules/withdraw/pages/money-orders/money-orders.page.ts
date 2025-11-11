import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { TRANSFERS, WITHDRAW } from '@commons/constants/navigate.constants';
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
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  MONEY_ORDERS_EXIT_DATA,
  MONEY_ORDERS_STEPS,
  MoneyOrdersSlide
} from '@modules/withdraw/pages/money-orders/constants/money-orders.constants';
import {
  moneyOrdersAccountValidators,
  moneyOrdersAmountValidators,
  moneyOrdersWhoValidators
} from '@modules/withdraw/pages/money-orders/helpers/money-orders-validators.helpers';
import {
  mapMoneyOrdersConfirm,
  mapMoneyOrdersVoucher
} from '@modules/withdraw/pages/money-orders/mappers/money-orders-confirm.mapper';
import { mapMoneyOrdersPayload } from '@modules/withdraw/pages/money-orders/mappers/money-orders-payload.mapper';
import { mapMoneyOrdersSlides } from '@modules/withdraw/pages/money-orders/mappers/money-orders-slides.mapper';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';

@Component({
  selector: 'app-money-orders',
  templateUrl: './money-orders.page.html',
  styleUrls: ['./money-orders.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: MoneyOrdersSlide.productOrigin,
    alternativeSlide: MoneyOrdersSlide.who
  },
  {
    backUrl: (component: MoneyOrdersPage) => component.getBackUrl(),
    steps: MONEY_ORDERS_STEPS,
    exitData: MONEY_ORDERS_EXIT_DATA,
    data: (component: MoneyOrdersPage) =>
      mapMoneyOrdersSlides.bind(component)(component.form),
    confirmMapper: mapMoneyOrdersConfirm,
    voucherMapper: mapMoneyOrdersVoucher
  },
  { step: MoneyOrdersSlide.productOrigin }
)
export class MoneyOrdersPage extends GenericStepperBase implements OnInit {
  private spiConsentService = inject(SpiConsentService);

  constructor(protected injector: Injector, private facade: WithdrawFacade) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.spiConsentService.fetchSpiConsent();
  }
  public getBackUrl(): string[] {
    const isSPIKeysMFEEnabled = this.facade.featureFlagsByKey(
      FeatureFlagsKey.SPIKeysMFE
    );

    return isSPIKeysMFEEnabled ? TRANSFERS : WITHDRAW;
  }
  private initForm(): void {
    this.form = this.formBuilder.group({
      productOrigin: [
        this.productSelected(),
        [Validators.required, moneyOrdersAccountValidators.bind(this)]
      ],
      who: [null, [Validators.required, moneyOrdersWhoValidators.bind(this)]],
      moneyOrderChannel: [null],
      amount: [
        null,
        [Validators.required, moneyOrdersAmountValidators.bind(this)]
      ],
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
    this.form.controls.moneyOrderChannel.valueChanges.subscribe((value) => {
      this.data[MoneyOrdersSlide.amount].data.description =
        value === ChannelType.ATM.toString()
          ? 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.DESCRIPTION_ATM'
          : 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.DESCRIPTION';
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('productOrigin').value;
    return {
      transactionId: TransactionCostIds.WithdrawalMoneyOrder,
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
  public moneyOrder(): void {
    if (this.form.valid) {
      this.facade.withdraw(
        mapMoneyOrdersPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
