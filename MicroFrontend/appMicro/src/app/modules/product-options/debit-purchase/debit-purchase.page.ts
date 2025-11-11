import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { HOME } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  isNullOrUndefinedOrEmpty,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { DebitPurchaseService } from '@modules/product-options/debit-purchase/service/debit-purchase.service';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  DEBIT_PURCHASE_AVAILABLE_FIELD,
  DEBIT_PURCHASE_EXIT_DATA,
  DEBIT_PURCHASE_ROTATING_AVAILABLE_FIELD,
  DEBIT_PURCHASE_ROTATING_STEPS,
  DEBIT_PURCHASE_STEPS,
  DebitPurchaseSlide,
  DEFAULT_DEBIT_PURCHASE_INSTALLMENTS,
  MIN_LOC_INSTALLMENTS
} from './constants/debit-purchase.constants';
import { DebitPurchaseFacade } from './debit-purchase.facade';
import { DebtPurchasePayload } from './entities/debit-purchase.interface';
import {
  debitPurchaseAccountValidators,
  debitPurchaseAmountValidators,
  debtPurchaseInstallmentsValidators
} from './helpers/debit-purchase-validators.helpers';
import {
  mapDebitPurchaseConfirm,
  mapDebitPurchaseVoucher
} from './mappers/debit-purchase-confirm.mapper';
import {
  mapDebitPurchaseRotatingSlides,
  mapDebitPurchaseSlides
} from './mappers/debit-purchase-slides.mapper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debit-purchase',
  templateUrl: './debit-purchase.page.html',
  styleUrls: ['./debit-purchase.page.sass']
})
@GenericStepperInit(
  {
    initSlide: DebitPurchaseSlide.toward,
    alternativeSlide: DebitPurchaseSlide.toward
  },
  {
    backUrl: HOME,
    steps: (component: DebitPurchasePage) =>
      component.isLOC ? DEBIT_PURCHASE_ROTATING_STEPS : DEBIT_PURCHASE_STEPS,
    exitData: DEBIT_PURCHASE_EXIT_DATA,
    data: (component: DebitPurchasePage) =>
      component.isLOC
        ? mapDebitPurchaseRotatingSlides(component.form)
        : mapDebitPurchaseSlides.bind(component)(component.form),
    confirmMapper: mapDebitPurchaseConfirm,
    voucherMapper: mapDebitPurchaseVoucher
  }
)
export class DebitPurchasePage extends GenericStepperBase implements OnInit {
  constructor(
    protected injector: Injector,
    protected facade: DebitPurchaseFacade,
    private debitPurchaseService: DebitPurchaseService,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams?.idProduct) {
      const product =
        this.facade
          .findProductByProductId(this.route.snapshot.queryParams?.idProduct)
          .currentValue() ?? null;
      this.facade.setProductSelected(product);
    }
    this.initForm();
    this.initStepper();
    if (this.isLOC) {
      this.setCurrentSlide(DebitPurchaseSlide.toward);
    } else {
      this.initSlide(
        DebitPurchaseSlide.from,
        DebitPurchaseSlide.toward,
        DEBIT_PURCHASE_AVAILABLE_FIELD
      );
    }
    if (!this.isLOC) {
      this.verifyField(DebitPurchaseSlide.from, DEBIT_PURCHASE_AVAILABLE_FIELD);
      this.checkDebtPurchaseRate();
    } else {
      this.verifyField(
        DebitPurchaseSlide.toward,
        DEBIT_PURCHASE_ROTATING_AVAILABLE_FIELD
      );
    }
  }

  protected async setConfirmationData(confirmationStep: string): Promise<void> {
    this.genericStepperFacade.enableLoading();
    if (this.isLOC) {
      try {
        const { installments } = await this.debitPurchaseService
          .getLOCInstallments(this.productSelected().id.toString())
          .toPromise();

        this.form.controls.installments.setValue(installments);
      } catch (e) {
        this.form.controls.installments.setValue(
          DEFAULT_DEBIT_PURCHASE_INSTALLMENTS
        );
      }
    }
    this.genericStepperFacade.disableLoading();

    await super.setConfirmationData(confirmationStep);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      bank: [null, [Validators.required]],
      account: [
        null,
        [Validators.required, debitPurchaseAccountValidators.bind(this)]
      ],
      banksList: [
        this.isLOC
          ? this.facade.codeBanks$
              .currentValue()
              .filter(({ grupo }) => grupo !== BANK_GROUP.AVAL)
          : this.facade.codeBanks$.currentValue()
      ],
      amount: [
        null,
        [Validators.required, debitPurchaseAmountValidators.bind(this)]
      ],
      installments: [
        this.isLOC ? MIN_LOC_INSTALLMENTS : null,
        this.isLOC
          ? []
          : [Validators.required, debtPurchaseInstallmentsValidators.bind(this)]
      ],
      rates: [null],
      fee: [null],
      confirmation: [null]
    });

    this.form.controls.bank.valueChanges.subscribe(() =>
      this.form.markAsDirty()
    );

    this.form.controls.account.valueChanges.subscribe((value) => {
      if (!isNullOrUndefinedOrEmpty(value)) {
        this.form.markAsDirty();
      }
    });

    this.form.controls.fromProduct.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.checkDebtPurchaseRate());
  }

  private checkDebtPurchaseRate(): void {
    try {
      this.form.controls.rates.setValue(null);
      this.debitPurchaseService
        .getRates(this.form.controls.fromProduct.value.id.toString())
        .toPromise()
        .then((response) => this.form.controls.rates.setValue(response));
    } catch (e) {}
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.DebtPurchase,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperAction
  public sendDebitPurchase(): void {
    if (this.form.valid) {
      const { account, bank, amount, installments } = this.form.value;

      const payload: DebtPurchasePayload = {
        productOrigin: {
          accountType: this.productSelected().type,
          accountId: this.productSelected().id.toString()
        },
        productTarget: {
          accountType: TypeAccount.CCA,
          accountId: account.split(' ').join(''),
          bankId: bank.value
        },
        amount: sanitizeCurrency(amount),
        installments
      };
      this.facade.sendDebitPurchase(payload, this.alertStepData());
    }
  }

  get isLOC(): boolean {
    return (
      !!this.productSelected().type &&
      this.productSelected().type === TypeAccount.LOC
    );
  }
}
