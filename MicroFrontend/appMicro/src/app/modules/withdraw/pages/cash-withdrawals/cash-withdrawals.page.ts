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
  CASH_WITHDRAWALS_EXIT_DATA,
  CASH_WITHDRAWALS_STEPS,
  CashWithdrawalsSlide
} from '@modules/withdraw/pages/cash-withdrawals/constants/cash-withdrawals.constants';
import {
  cashWithdrawalsAccountValidators,
  cashWithdrawalsAmountValidators
} from '@modules/withdraw/pages/cash-withdrawals/helpers/cash-withdrawals-validators.helpers';
import {
  mapCashWithdrawalConfirm,
  mapCashWithdrawalVoucher
} from '@modules/withdraw/pages/cash-withdrawals/mappers/cash-withdrawals-confirm.mapper';
import { mapCashWithdrawalsPayload } from '@modules/withdraw/pages/cash-withdrawals/mappers/cash-withdrawals-payload.mapper';
import { mapCashWithdrawalsSlides } from '@modules/withdraw/pages/cash-withdrawals/mappers/cash-withdrawals-slides.mapper';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

@Component({
  selector: 'app-cash-withdrawals',
  templateUrl: './cash-withdrawals.page.html',
  styleUrls: ['./cash-withdrawals.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: CashWithdrawalsSlide.productOrigin,
    alternativeSlide: CashWithdrawalsSlide.cashWithdrawalChannel
  },
  {
    backUrl: (component: CashWithdrawalsPage) => component.getBackUrl(),
    steps: CASH_WITHDRAWALS_STEPS,
    exitData: CASH_WITHDRAWALS_EXIT_DATA,
    data: (component: CashWithdrawalsPage) =>
      mapCashWithdrawalsSlides.bind(component)(component.form),
    confirmMapper: mapCashWithdrawalConfirm,
    voucherMapper: mapCashWithdrawalVoucher
  },
  { step: CashWithdrawalsSlide.productOrigin }
)
export class CashWithdrawalsPage extends GenericStepperBase implements OnInit {
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
  public async setNextStep(data: any): Promise<void> {
    return await super.setNextStep(data);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      productOrigin: [
        this.productSelected(),
        [Validators.required, cashWithdrawalsAccountValidators.bind(this)]
      ],
      amount: [
        null,
        [Validators.required, cashWithdrawalsAmountValidators.bind(this)]
      ],
      cashWithdrawalChannel: [null],
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
    this.form.controls.cashWithdrawalChannel.valueChanges.subscribe((value) => {
      this.data[CashWithdrawalsSlide.amount].data.description =
        value === ChannelType.ATM.toString()
          ? 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.DESCRIPTION_ATM'
          : 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.DESCRIPTION';
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('productOrigin').value;
    return {
      transactionId: TransactionCostIds.WithdrawalWithoutCard,
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
      amountTransaction: amount,
      availableBalance: productOrigin.availableBalance
    };
  }

  @GenericStepperAction
  public cashWithdrawal(): void {
    if (this.form.valid) {
      this.facade.withdraw(
        mapCashWithdrawalsPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
