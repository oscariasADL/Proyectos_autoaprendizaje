import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  ACTIVATE_VIRTUAL_CREDIT_CARD_EXIT_DATA,
  ACTIVATE_VIRTUAL_CREDIT_CARD_STEP,
  ACTIVATE_VIRTUAL_CREDIT_CARD_STEPS,
  ActivateVirtualCreditCardSlide
} from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/constants/activate-virtual-credit-card.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { ActivateDigitalDebitCardPage } from '@modules/digital-debit-card/pages/activate-digital-debit-card/activate-digital-debit-card.page';
import {
  mapActivateDigitalDebitCardSlides,
  mapVirtualCreditCardCreatePayload
} from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/mappers/activate-virtual-credit-card.mapper';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { virtualCreditCardAmountValidator } from '@modules/virtual-credit-card/helpers/virtual-credit-card.helper';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

@Component({
  selector: 'app-activate-virtual-credit-card',
  templateUrl: './activate-virtual-credit-card.page.html',
  styleUrls: ['./activate-virtual-credit-card.page.sass']
})
@GenericStepperInit(
  {
    initSlide: ActivateVirtualCreditCardSlide.config,
    alternativeSlide: ActivateVirtualCreditCardSlide.config
  },
  {
    backUrl: HOME,
    steps: ACTIVATE_VIRTUAL_CREDIT_CARD_STEPS,
    exitData: ACTIVATE_VIRTUAL_CREDIT_CARD_EXIT_DATA,
    data: (component: ActivateDigitalDebitCardPage) =>
      mapActivateDigitalDebitCardSlides(component.form),
    confirmMapper: () => [],
    voucherMapper: () => []
  }
)
export class ActivateVirtualCreditCardPage
  extends GenericStepperBase
  implements OnInit, OnDestroy
{
  protected readonly activateDigitalDebitCardSlide =
    ActivateVirtualCreditCardSlide;

  constructor(
    protected injector: Injector,
    private facade: VirtualCreditCardFacade
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.initStepper();
  }

  ngOnDestroy() {
    this.facade.setActivateUrlBackTo(null);
    this.facade.setProductSelected(null);
    super.ngOnDestroy();
  }

  public stepSelected(step: Step) {
    if (
      step.id ===
      ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[ActivateVirtualCreditCardSlide.from]
    )
      return;
    super.stepSelected(step);
  }

  @GenericStepperAction
  public activateVirtualCreditCard(): void {
    this.facade.createVirtualCreditCard(
      mapVirtualCreditCardCreatePayload(this.form)
    );
  }

  private initForm(): void {
    const productOrigin: ProductDetail =
      this.productSelected$.currentValue() ?? null;
    const homeProduct = this.facade.getProduct(
      TypeAccount.CCA,
      productOrigin.id
    );
    const fromProduct = {
      ...productOrigin,
      numberProduct: homeProduct.idUM
    };
    this.form = this.formBuilder.group({
      fromProduct: [fromProduct, Validators.required],
      amount: [
        null,
        [Validators.required, virtualCreditCardAmountValidator.bind(this)]
      ],
      confirmation: [null]
    });
  }

  get activateUrlBackTo$(): Observable<string> {
    return this.facade.activateUrlBackTo$ ?? of('/');
  }

  get productSelected$(): Observable<ProductDetail> {
    return this.facade.productSelected$;
  }
}
