import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { POCKETS_DETAIL } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { Product } from '@commons/entities/product/product.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import {
  PERIODICITY,
  PERIODICITY_LABEL,
  Pocket
} from '@modules/pockets/entities/pockets.interface';
import { mapPocketDetailPayload } from '@modules/pockets/helpers/pocket.helpers';
import {
  PocketEditSlide,
  POCKET_EDIT_EXIT_DATA,
  POCKET_EDIT_STEPS
} from '@modules/pockets/pages/pocket-edit/constants/pocket-edit.constants';
import {
  pocketEditGoalValidators,
  pocketEditNameValidators,
  pocketEditQuotaValidators
} from '@modules/pockets/pages/pocket-edit/helpers/pocket-edit-validator.helpers';
import { mapPocketEditPayload } from '@modules/pockets/pages/pocket-edit/mappers/pocket-edit-payload.mapper';
import { mapPocketEditSlides } from '@modules/pockets/pages/pocket-edit/mappers/pocket-edit-slides.mapper';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapPocketEditConfirm } from '@modules/pockets/pages/pocket-edit/mappers/pocket-edit-confirm.mapper';
import { PocketCreateSlide } from '@modules/pockets/pages/pocket-create/constants/pocket-create.constants';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  POCKET_EDIT_T_CONFIRM,
  POCKET_EDIT_T_CONTINUE
} from '../../constants/edit.constants';

@Component({
  selector: 'app-pocket-edit',
  templateUrl: './pocket-edit.page.html',
  styleUrls: ['./pocket-edit.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: PocketEditSlide.update,
    alternativeSlide: PocketEditSlide.update
  },
  {
    backUrl: (component: PocketEditPage) => component.backUrl$.currentValue(),
    steps: POCKET_EDIT_STEPS,
    exitData: POCKET_EDIT_EXIT_DATA,
    data: (component: PocketEditPage) => mapPocketEditSlides(component.form),
    confirmMapper: mapPocketEditConfirm,
    voucherMapper: null
  }
)
export class PocketEditPage extends GenericStepperBase implements OnInit {
  constructor(protected injector: Injector, private facade: PocketsFacade) {
    super(injector);
  }
  public readonly POCKET_EDIT_T_CONFIRM = POCKET_EDIT_T_CONFIRM;
  public readonly POCKET_EDIT_T_CONTINUE = POCKET_EDIT_T_CONTINUE;

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  protected async setConfirmationData(): Promise<void> {
    this.form.controls.confirmation.setValue(
      mapPocketEditConfirm.bind(this, this.form.value)()
    );
    this.data[PocketCreateSlide.confirmation].data.advertisement =
      PERIODICITY_LABEL[this.form.get('period')?.value?.value];
    this.nextStep(SlideType.confirmation);
  }

  private initForm(): void {
    const pocket: Pocket = this.pocket$.currentValue();
    const pocketCategories = this.pocketCategories$.currentValue();
    const pocketCategory =
      pocketCategories.find(
        (item) => item.value.toString() === pocket?.pocketCategory.toString()
      ) || pocketCategories[0];
    const period = this.periodicity.find(
      (item) =>
        item.label.toString().toLowerCase() ===
        pocket?.period.toString().toLowerCase()
    );

    this.form = this.formBuilder.group({
      name: [
        pocket?.description,
        [Validators.required, pocketEditNameValidators.bind(this)]
      ],
      quota: [
        pocket?.instalmentAmount,
        [Validators.required, pocketEditQuotaValidators.bind(this)]
      ],
      goal: [
        pocket?.goal,
        [Validators.required, pocketEditGoalValidators.bind(this)]
      ],
      category: [pocketCategory, [Validators.required]],
      period: [period, [Validators.required]],
      pocket: [this.pocket$.currentValue()],
      product: [this.product$.currentValue()],
      amountSaved: [pocket.amountSaved],
      confirmation: [null]
    });
  }

  @GenericStepperAction
  public editPocket(): void {
    if (this.form.valid) {
      this.facade.updatePocket(
        mapPocketEditPayload(this.form.value),
        mapPocketDetailPayload(this.pocket$.currentValue()),
        this.backUrl$.currentValue()
      );
    }
  }

  get backUrl$(): Observable<string[]> {
    return this.pocket$.pipe(
      map((pocket: Pocket) => [
        POCKETS_DETAIL.toString(),
        pocket?.productTypeParent,
        pocket?.productIdParent,
        pocket?.type,
        pocket?.numberProduct
      ])
    );
  }

  get pocket$(): Observable<Pocket> {
    return this.facade.pocket$;
  }

  get product$(): Observable<Product> {
    return this.facade.product$;
  }

  get pockets$(): Observable<Pocket[]> {
    return this.facade.pockets$.pipe(map((data) => data.pockets));
  }

  get pocketCategories$(): Observable<DropdownList[]> {
    return this.facade.parameterByKey(ParameterType.categoriesPockets);
  }

  get periodicity(): any {
    return PERIODICITY;
  }
}
