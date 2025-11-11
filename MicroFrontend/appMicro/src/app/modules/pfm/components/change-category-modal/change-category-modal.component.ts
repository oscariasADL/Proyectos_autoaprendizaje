import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import {
  PFMCategory,
  PFMCategoryType
} from '@modules/pfm/entities/pfm.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { mapCategoryOptions } from '@modules/pfm/helpers/pfm.helpers';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-pfm-change-category-modal',
  templateUrl: './change-category-modal.component.html',
  styleUrls: ['./change-category-modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeCategoryModalComponent implements OnInit {
  @Input() categories: PFMCategory[];
  @Input() categoryType: PFMCategoryType;
  @Input() categoryCode: string;

  public formGroup: UntypedFormGroup;
  public categoryOptions: DropdownList[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public async changeCategory(): Promise<void> {
    await this.modalCtrl.dismiss(this.newCategoryCode.value);
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      newCategoryCode: [null, Validators.required]
    });
  }

  private initValues(): void {
    this.categoryOptions = mapCategoryOptions(
      this.categories,
      this.categoryType,
      this.categoryCode
    );
  }

  get newCategoryCode(): AbstractControl {
    return this.formGroup.get('newCategoryCode');
  }

  get pfmCategoryType(): typeof PFMCategoryType {
    return PFMCategoryType;
  }
}
