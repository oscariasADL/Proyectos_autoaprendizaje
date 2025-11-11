import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { POCKETS } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  PERIODICITY_LABEL,
  Pocket
} from '@modules/pockets/entities/pockets.interface';
import { POCKET_CREATE_EXIT_DATA } from '@modules/pockets/pages/pocket-create/constants/pocket-create.constants';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { ParameterType } from '@store/state/parameter.state';

import {
  POCKET_CREATE_WITH_RETURNS_STEPS,
  PocketCreateWithReturnsSlide
} from './constants/pocket-create-with-returns.constants';
import { mapPocketWithReturnsCreateSlides } from './mappers/pocket-create-slides.mapper';
import { Product } from '@commons/entities/product/product.interface';
import { isLessThan } from './validators/IsLessThan.validator';
import { mapCreatePocketWithReturnsPayload } from './mappers/create-pocket-with-returns.mapper';
import { valueNotGreaterThan } from './validators/openAmountNotGreaterThanGoal.validator';
import { noSpecialCharactersValidator } from './validators/noSpecialChars.validator';
import { minCurrencyValue } from './validators/minCurrencyValue.validator';
import { isMoreThan } from './validators/maxGoal.validator';
import { mapPocketWithReturnsCreateVoucher } from '@modules/pockets/pages/pocket-create-with-returns/mappers/create-pocket-with-returns-confirm.mapper';
import { mapProductsToPockets } from '@modules/pockets/helpers/pocket.helpers';
import { RENTABILITY_POCKET_CONTINUE_CONFIG } from '../../constants/create.constants';

@Component({
  selector: 'app-pocket-create-with-returns',
  templateUrl: './pocket-create-with-returns.page.html',
  styleUrls: []
})
@GenericStepperInit(
  {
    initSlide: PocketCreateWithReturnsSlide.customization,
    alternativeSlide: PocketCreateWithReturnsSlide.customization
  },
  {
    backUrl: POCKETS,
    steps: POCKET_CREATE_WITH_RETURNS_STEPS,
    exitData: POCKET_CREATE_EXIT_DATA,
    data: (component: PocketCreateWithReturnsPage) =>
      mapPocketWithReturnsCreateSlides(component.form),
    confirmMapper: () => [],
    voucherMapper: mapPocketWithReturnsCreateVoucher
  }
)
export class PocketCreateWithReturnsPage
  extends GenericStepperBase
  implements OnInit
{
  constructor(protected injector: Injector, private facade: PocketsFacade) {
    super(injector);
  }
  public readonly RENTABILITY_POCKET_CONTINUE_CONFIG =
    RENTABILITY_POCKET_CONTINUE_CONFIG;
  public accounts: Product[];
  currentPockets = this.facade.pockets$
    .pipe(map((data) => data.pockets))
    .currentValue();

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  protected async setConfirmationData(): Promise<void> {
    this.genericStepperFacade.enableLoading();
    this.genericStepperFacade.disableLoading();

    this.data[PocketCreateWithReturnsSlide.confirmation].data.advertisement =
      PERIODICITY_LABEL[this.form.get('periodicity')?.value?.value];
    this.voucher = mapPocketWithReturnsCreateVoucher.bind(
      this,
      this.form.value
    )();
    this.nextStep(SlideType.confirmation);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(15),
          noSpecialCharactersValidator()
        ]
      ],
      category: [
        this.facade
          .parameterByKey(ParameterType.categoriesPockets)
          .currentValue()[0],
        [Validators.required]
      ],
      pocketCategories: [
        this.facade
          .parameterByKey(ParameterType.categoriesPockets)
          .currentValue()
      ],
      accounts: [
        this.facade.products$.pipe(map(mapProductsToPockets)).currentValue()
      ],
      product: [null, [Validators.required]],
      goal: [
        null,
        [
          Validators.required,
          isLessThan(500000, { pocketWithReturnMinGoal: true }),
          isMoreThan.bind(this)
        ]
      ],
      openAmount: [
        null,
        [
          Validators.required,
          isLessThan(500000, { pocketWithReturnsCreateOpenAmountMin: true }),
          valueNotGreaterThan('goal', 'openAmount', {
            openAmountExceedsGoal: true
          })
        ]
      ],
      period: [
        null,
        [Validators.required, Validators.min(31), Validators.max(720)]
      ],
      periodicity: [null, Validators.required],

      quota: [
        null,
        [
          Validators.required,
          valueNotGreaterThan('goal', 'quota', { quotaExceedsGoal: true }),
          minCurrencyValue(5000)
        ]
      ],
      renewPocket: [null, Validators.required],
      renewWithProfits: [false]
    });
    this.facade.products$
      .pipe(map(mapProductsToPockets))
      .subscribe({
        next: (products) => {
          this.form.patchValue({ product: products[0] });
        }
      })
      .unsubscribe();
  }

  @GenericStepperAction
  public createPocket(): void {
    if (this.form.valid) {
      this.facade.createPocketWithReturns(
        mapCreatePocketWithReturnsPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get pockets$(): Observable<Pocket[]> {
    return this.facade.pockets$.pipe(map((data) => data.pockets));
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$.pipe(map(mapProductsToPockets));
  }
}
