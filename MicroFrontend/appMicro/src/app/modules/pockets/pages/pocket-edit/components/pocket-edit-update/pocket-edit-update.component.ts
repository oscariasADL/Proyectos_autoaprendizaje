import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ParameterType } from '@store/state/parameter.state';
import {
  PERIODICITY,
  Pocket
} from '@modules/pockets/entities/pockets.interface';
import { calculateInstallmentsPocket } from '@modules/pockets/pages/pocket-edit/helpers/pocket-edit.helpers';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { POCKET_EDIT_T_CONFIRM } from '@app/modules/pockets/constants/edit.constants';

@Component({
  selector: 'app-pocket-edit-update',
  templateUrl: './pocket-edit-update.component.html',
  styleUrls: ['./pocket-edit-update.component.sass']
})
export class PocketEditUpdateComponent {
  @Input() form: FormGroup;
  @Input() pocket: Pocket;
  @Input() utag: UtagEvent = POCKET_EDIT_T_CONFIRM;

  @Output() continue: EventEmitter<void> = new EventEmitter();

  constructor(private facade: PocketsFacade) {}

  get installments(): number {
    return (this.goal as FormControl).currencyValue() > 0 &&
      this.goal.valid &&
      (this.quota as FormControl).currencyValue() > 0 &&
      this.quota.valid
      ? calculateInstallmentsPocket(
          (this.goal as FormControl).currencyValue(),
          (this.quota as FormControl).currencyValue(),
          this.pocket.amountSaved
        )
      : 0;
  }

  get periodicity(): any {
    return PERIODICITY;
  }

  get pocketCategories$(): Observable<DropdownList[]> {
    return this.facade.parameterByKey(ParameterType.categoriesPockets);
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get goal(): AbstractControl {
    return this.form.get('goal');
  }

  get period(): AbstractControl {
    return this.form.get('period');
  }

  get quota(): AbstractControl {
    return this.form.get('quota');
  }
}
