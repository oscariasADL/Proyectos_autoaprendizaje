import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import {
  POCKETS_DETAIL,
  POCKETS_WITH_RETURNS_DETAIL
} from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  Pocket,
  PocketTypeEnum,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import {
  PocketPaySlide,
  POCKET_PAY_EXIT_DATA,
  POCKET_PAY_STEPS
} from '@modules/pockets/pages/pocket-pay/constants/pocket-pay.constants';
import { pocketPayAmountValidators } from '@modules/pockets/pages/pocket-pay/helpers/pocket-pay-validator.helpers';
import { mapPocketPayConfirm } from '@modules/pockets/pages/pocket-pay/mappers/pocket-pay-confirm.mapper';
import { mapPocketPayPayload } from '@modules/pockets/pages/pocket-pay/mappers/pocket-pay-payload.mapper';
import { mapPocketPaySlides } from '@modules/pockets/pages/pocket-pay/mappers/pocket-pay-slides.mapper';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { POCKET_TYPE_PARAM } from '@modules/pockets/constants/pockets.constants';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import {
  ADD_CASH_TO_R_POCKETS,
  ADD_CASH_TO_T_POCKETS
} from '../../constants/add.constants';

@Component({
  selector: 'app-pocket-pay',
  templateUrl: './pocket-pay.page.html',
  styleUrls: ['./pocket-pay.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: PocketPaySlide.pay,
    alternativeSlide: PocketPaySlide.pay
  },
  {
    backUrl: (component: PocketPayPage) => component.backUrl$.currentValue(),
    steps: POCKET_PAY_STEPS,
    exitData: POCKET_PAY_EXIT_DATA,
    data: (component: PocketPayPage) => mapPocketPaySlides(component.form),
    confirmMapper: mapPocketPayConfirm,
    voucherMapper: null
  }
)
export class PocketPayPage extends GenericStepperBase implements OnInit {
  public pocketTypeParam!: PocketTypeEnum;
  public readonly utagEvent: UtagEvent;
  constructor(
    protected injector: Injector,
    private route: ActivatedRoute,
    private facade: PocketsFacade
  ) {
    super(injector);
    this.pocketTypeParam = this.route.snapshot.paramMap.get(
      POCKET_TYPE_PARAM
    ) as PocketTypeEnum;
    this.utagEvent =
      this.pocketTypeParam === PocketTypeEnum.PocketWithReturns
        ? ADD_CASH_TO_R_POCKETS
        : ADD_CASH_TO_T_POCKETS;
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  protected async setConfirmationData(): Promise<void> {
    const pocket: Pocket = this.pocket$.currentValue();
    this.form.controls.confirmation.setValue(
      mapPocketPayConfirm.bind(this, this.form.value)()
    );

    if (
      sanitizeCurrency(this.amount.value) + pocket.amountSaved ===
      pocket.goal
    ) {
      this.data[PocketPaySlide.confirmation].data.noticeInfo =
        this.translate.instant('POCKETS.PAY.NOTICE');
    } else {
      this.data[PocketPaySlide.confirmation].data.noticeInfo = null;
    }

    this.nextStep(SlideType.confirmation);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      amount: [
        null,
        [Validators.required, pocketPayAmountValidators.bind(this)]
      ],
      targetPocket: [null],
      pocket: [this.pocket$.currentValue()],
      product: [this.product$.currentValue()],
      confirmation: [null]
    });
  }

  @GenericStepperAction
  public payPocket(): void {
    if (this.form.valid) {
      this.facade.payPocket(
        mapPocketPayPayload(this.form.value),
        this.pocket$.currentValue(),
        this.backUrl$.currentValue()
      );
    }
  }

  get backUrl$(): Observable<string[]> {
    const pathToRedirect =
      this.pocketTypeParam === PocketTypeEnum.PocketWithReturns
        ? POCKETS_WITH_RETURNS_DETAIL.toString()
        : POCKETS_DETAIL.toString();
    return this.pocket$.pipe(
      map((pocket: Pocket) => [
        pathToRedirect,
        pocket.productTypeParent,
        pocket.productIdParent,
        pocket.type,
        pocket.numberProduct
      ])
    );
  }

  get pocket$(): Observable<Pocket | PocketWithReturns> {
    return this.pocketTypeParam === PocketTypeEnum.TraditionalPocket
      ? this.facade.pocket$
      : this.facade.pocketWithReturns$;
  }

  get product$(): Observable<Product> {
    return this.facade.products$.pipe(
      withLatestFrom(this.pocket$),
      map(([products, pocket]) =>
        products?.find(
          (product: Product) =>
            product.id.toString() === pocket.productIdParent.toString()
        )
      )
    );
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
