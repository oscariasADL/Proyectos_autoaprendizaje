import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ActivateDigitalDebitCardBase } from '@modules/digital-debit-card/pages/activate-digital-debit-card/activate-digital-debit-card.base';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { Product } from '@commons/entities/product/product.interface';
import {
  ACTIVATE_DIGITAL_DEBIT_CARD_EXIT_DATA,
  ACTIVATE_DIGITAL_DEBIT_CARD_STEPS,
  ActivateDigitalDebitCardSlide
} from '@modules/digital-debit-card/pages/activate-digital-debit-card/constants/activate-digital-debit-card.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { mapActivateDigitalDebitCardSlides } from '@modules/digital-debit-card/pages/activate-digital-debit-card/mappers/activate-digital-debit-card.mapper';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { ALPHANUMERIC_PATTERN } from '@commons/constants/regex.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { digitalDebitCardAmountValidator } from '@modules/digital-debit-card/helpers/digital-debit-card-validators.helper';
import { digitalDebitCardCreatePayloadMapper } from '@modules/digital-debit-card/mappers/digital-debit-card-payload.mapper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-digital-debit-card',
  templateUrl: './activate-digital-debit-card.page.html',
  styleUrls: ['./activate-digital-debit-card.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: ActivateDigitalDebitCardSlide.info,
    alternativeSlide: ActivateDigitalDebitCardSlide.info
  },
  {
    backUrl: HOME,
    steps: ACTIVATE_DIGITAL_DEBIT_CARD_STEPS,
    exitData: ACTIVATE_DIGITAL_DEBIT_CARD_EXIT_DATA,
    data: (component: ActivateDigitalDebitCardPage) =>
      mapActivateDigitalDebitCardSlides(component.form),
    confirmMapper: () => [],
    voucherMapper: () => []
  }
)
export class ActivateDigitalDebitCardPage
  extends ActivateDigitalDebitCardBase
  implements OnInit, OnDestroy
{
  public readonly activateDigitalDebitCardSlide = ActivateDigitalDebitCardSlide;

  constructor(
    protected injector: Injector,
    private facade: DigitalDebitCardFacade,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.facade.closeToast();
    this.initForm();
    this.initStepper();
    if (this.route.snapshot.queryParams?.idProduct) {
      const product =
        this.facade
          .findProductByProductId(this.route.snapshot.queryParams?.idProduct)
          .currentValue() ?? null;
      this.form.get('productOrigin').setValue(product);
    }
  }

  ngOnDestroy() {
    this.facade.setActivateUrlBackTo(null);
    this.facade.setProductSelected(null);
    super.ngOnDestroy();
  }

  @GenericStepperAction
  public activateDigitalDebitCard(): void {
    if (this.form.valid) {
      this.facade.createDigitalDebitCard(
        digitalDebitCardCreatePayloadMapper(this.form.value)
      );
    }
  }

  public showFrequentQuestions(): void {
    this.facade.showFrequentQuestions();
  }

  private initForm(): void {
    const productOrigin = this.productSelected$.currentValue() ?? null;
    this.form = this.formBuilder.group({
      productOrigin: [productOrigin, [Validators.required]],
      nickName: [
        '',
        [
          Validators.required,
          Validators.pattern(ALPHANUMERIC_PATTERN),
          Validators.maxLength(
            this.facade.boundsByKey(ParameterKey.tddMaxNicknameLength)
          )
        ]
      ],
      amount: [
        '',
        [Validators.required, digitalDebitCardAmountValidator.bind(this)]
      ],
      confirmation: [null]
    });
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$;
  }

  get activateUrlBackTo$(): Observable<string> {
    return this.facade.activateUrlBackTo$ ?? of('/');
  }

  get productSelected$(): Observable<Product> {
    return this.facade.productSelected$;
  }
}
