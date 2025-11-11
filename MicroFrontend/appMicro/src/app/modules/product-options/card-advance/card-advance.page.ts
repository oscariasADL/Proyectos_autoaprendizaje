import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { HOME } from '@commons/constants/navigate.constants';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { CardAdvanceFacade } from '@modules/product-options/card-advance/card-advance.facade';
import {
  CARD_ADVANCE_AVAILABLE_FIELD,
  CARD_ADVANCE_EXIT_DATA,
  CARD_ADVANCE_STEPS,
  CardAdvanceSlide,
  CardAdvanceStep,
  DEFAULT_CARD_ADVANCE_INSTALLMENTS
} from '@modules/product-options/card-advance/constants/card-advance.constants';
import {
  cardAdvanceAccountValidators,
  cardAdvanceAmountValidators
} from '@modules/product-options/card-advance/helpers/card-advance-validators.helpers';
import {
  mapCardAdvanceConfirm,
  mapCardAdvanceVoucher
} from '@modules/product-options/card-advance/mappers/card-advance-confirm.mapper';
import { mapCardAdvancePayload } from '@modules/product-options/card-advance/mappers/card-advance-payload.mapper';
import { mapCardAdvanceSlides } from '@modules/product-options/card-advance/mappers/card-advance-slides.mapper';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

@Component({
  selector: 'app-card-advance',
  templateUrl: './card-advance.page.html',
  styleUrls: ['./card-advance.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: CardAdvanceSlide.toward,
    alternativeSlide: CardAdvanceSlide.toward,
    field: CARD_ADVANCE_AVAILABLE_FIELD
  },
  {
    backUrl: HOME,
    steps: CARD_ADVANCE_STEPS,
    exitData: CARD_ADVANCE_EXIT_DATA,
    data: (component: CardAdvancePage) => mapCardAdvanceSlides(component.form),
    confirmMapper: mapCardAdvanceConfirm,
    voucherMapper: mapCardAdvanceVoucher
  },
  { step: CardAdvanceSlide.toward, field: CARD_ADVANCE_AVAILABLE_FIELD }
)
export class CardAdvancePage extends GenericStepperBase implements OnInit {
  constructor(protected injector: Injector, private facade: CardAdvanceFacade) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  public stepSelected(step: Step) {
    if (step.id === CardAdvanceStep[CardAdvanceSlide.from]) return;
    super.stepSelected(step);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [
        this.productSelected(),
        [Validators.required, cardAdvanceAccountValidators.bind(this)]
      ],
      towardProduct: [null, [Validators.required]],
      amount: [
        null,
        [Validators.required, cardAdvanceAmountValidators.bind(this)]
      ],
      installments: [DEFAULT_CARD_ADVANCE_INSTALLMENTS, [Validators.required]],
      fee: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.CardAdvance,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperAction
  public cardAdvance(): void {
    if (this.form.valid) {
      this.facade.cardAdvance(
        mapCardAdvancePayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
