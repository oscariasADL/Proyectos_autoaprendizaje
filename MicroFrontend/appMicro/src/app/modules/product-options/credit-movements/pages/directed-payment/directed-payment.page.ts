import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AbstractControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
import { InformationService } from '@commons/services/information.service';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import {
  DirectedPaymentSlide,
  DIRECTED_PAYMENT_EXIT_DATA,
  DIRECTED_PAYMENT_INFO_ALERT,
  DIRECTED_PAYMENT_STEPS
} from '@modules/product-options/credit-movements/pages/directed-payment/constants/directed-payment.constants';
import { directedPaymentAmountValidators } from '@modules/product-options/credit-movements/pages/directed-payment/helpers/directed-payment-validators.helpers';
import {
  mapDirectedPaymentConfirm,
  mapDirectedPaymentVoucher
} from '@modules/product-options/credit-movements/pages/directed-payment/mappers/directed-payment-confirm.mapper';
import { mapDirectedPaymentPayload } from '@modules/product-options/credit-movements/pages/directed-payment/mappers/directed-payment-payload.mapper';
import { mapDirectedPaymentSlides } from '@modules/product-options/credit-movements/pages/directed-payment/mappers/directed-payment-slides.mapper';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { GroupedCreditMovements } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { groupMovements } from '@modules/product-options/credit-movements/pipes/group-movements';

@Component({
  selector: 'app-directed-payment',
  templateUrl: './directed-payment.page.html',
  styleUrls: ['./directed-payment.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: DirectedPaymentSlide.movement.toString(),
    alternativeSlide: DirectedPaymentSlide.movement.toString()
  },
  {
    backUrl: HOME,
    steps: DIRECTED_PAYMENT_STEPS,
    exitData: DIRECTED_PAYMENT_EXIT_DATA,
    data: (component: DirectedPaymentPage) =>
      mapDirectedPaymentSlides(component.form),
    confirmMapper: mapDirectedPaymentConfirm,
    voucherMapper: mapDirectedPaymentVoucher
  }
)
export class DirectedPaymentPage extends GenericStepperBase implements OnInit {
  protected readonly StepperTypes = StepperTypes;
  public readonly creditMovements$: Observable<GroupedCreditMovements[]> =
    this.facade.creditMovements$.pipe(groupMovements());

  constructor(
    protected injector: Injector,
    private facade: CreditMovementsFacade,
    private informationService: InformationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService.showPanelIfNecessary(DIRECTED_PAYMENT_INFO_ALERT);
    const stepperBody = this.document.querySelector(
      '.generic-stepper-body'
    ) as HTMLElement;
    if (!isNullOrUndefined(stepperBody)) {
      stepperBody.style.paddingBottom = '0px';
    }
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.DirectedPayment,
      accountId: product.id,
      accountType: product.type
    };
  }

  public async setNextStep(data: any): Promise<void> {
    const { value } = data;
    if (value === StepperTypes.informationPanel.toString()) {
      await this.informationService.showPanel(DIRECTED_PAYMENT_INFO_ALERT);
    } else {
      await super.setNextStep(data);
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      amount: [null],
      fromProduct: [null, [Validators.required]],
      towardProduct: [this.productSelected(), [Validators.required]],
      movement: [null],
      selectedMovements: this.formBuilder.array([]),
      paymentsArray: this.formBuilder.array([]),
      fee: [null],
      confirmation: [null],
      checkedCount: [0]
    });
    this.creditMovements$
      .subscribe((movements) => {
        movements.forEach((itemGroup) => {
          const group = this.formBuilder.group({
            date: itemGroup.date,
            values: this.formBuilder.array([])
          });

          const values = group.get('values') as FormArray;

          itemGroup.values.forEach((creditMovement: CreditMovement) => {
            values.push(this.formBuilder.control(false));
          });

          this.paymentsArray.push(group);
        });
      })
      .unsubscribe();
  }

  @GenericStepperAction
  public directedPayment(): void {
    if (this.form.valid) {
      this.facade.directedPayment(
        mapDirectedPaymentPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get movement(): AbstractControl {
    return this.form.get('movement');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get paymentsArray(): FormArray {
    return this.form.get('paymentsArray') as FormArray;
  }
}
