import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { LABELS_FOR_DEBIT_PURCHASE } from '@modules/product-options/credit-movements/pages/update-installments/constants/update-installments.constants';

@Component({
  selector: 'app-modify-installments',
  templateUrl: './modify-installments.component.html',
  styleUrls: ['./modify-installments.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyInstallmentsComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() control: UntypedFormControl;
  @Input() isDebitPurchaseControl: UntypedFormControl;
  @Input() validatorInstallment: (isDebitPurchase: boolean) => (
    control: UntypedFormControl
  ) => {
    [p: string]: boolean;
  };

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;
  public isDebitPurchaseFlag: boolean;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('installments', this.control);
    this.formGroup.addControl('isDebitPurchase', this.isDebitPurchaseControl);
    this.isDebitPurchaseFlag =
      LABELS_FOR_DEBIT_PURCHASE.includes(this.movement.companyDescription) &&
      LABELS_FOR_DEBIT_PURCHASE.includes(this.movement.purchaseDescription);
    this.installments.clearValidators();
    this.installments.addValidators([
      Validators.required,
      this.validatorInstallment(this.isDebitPurchaseFlag)
    ]);
    this.installments.updateValueAndValidity();
    this.isDebitPurchase.setValue(this.isDebitPurchaseFlag);
  }

  get movement(): CreditMovement {
    return this.form.get('movement').value;
  }

  get installments(): AbstractControl {
    return this.formGroup.get('installments');
  }

  get isDebitPurchase(): AbstractControl {
    return this.formGroup.get('isDebitPurchase');
  }
}
