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
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { map, Observable } from 'rxjs';

import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { GroupedCreditMovements } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { directedPaymentAmountValidators } from '@modules/product-options/credit-movements/pages/directed-payment/helpers/directed-payment-validators.helpers';
import { LinkKey } from '@commons/entities/parameters/links.entities';

@Component({
  selector: 'app-directed-payment-list',
  templateUrl: './directed-payment-list.component.html',
  styleUrls: ['./directed-payment-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectedPaymentListComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() control: FormControl;
  @Input() informationText: string;
  @Input() movements: GroupedCreditMovements[];

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() showInformation: EventEmitter<void> = new EventEmitter<void>();

  public readonly MAX_SELECTION = 5;

  constructor(
    private formBuilder: FormBuilder,
    private facade: CreditMovementsFacade // Keep for helpers
  ) {}

  ngOnInit() {
    this.selectedMovements.clear();
  }

  public continueAction() {
    this.paymentsArray.controls.forEach((group, indexGroup) => {
      const valuesArray = group.get('values') as FormArray;
      valuesArray.controls.forEach((control, indexValue) => {
        if (control.value) {
          this.selectedMovements.push(
            this.createSelectedPaymentFormGroup(indexGroup, indexValue)
          );
        }
      });
    });
    this.continue.emit();
  }

  public getValuesArray(index: number): FormArray {
    const group = this.paymentsArray.at(index) as FormGroup;
    return group.get('values') as FormArray;
  }

  public getControl(i: number, j: number): AbstractControl {
    return (this.paymentsArray.at(i).get('values') as FormArray).at(j);
  }

  public checkPayment(): void {
    this.checkedCount.setValue(0);

    this.paymentsArray.controls.forEach((group) => {
      const valuesArray = group.get('values') as FormArray;
      this.checkedCount.setValue(
        this.checkedCount.value +
          valuesArray.controls.filter((control) => control.value === true)
            .length
      );
    });

    this.paymentsArray.controls.forEach((group) => {
      const valuesArray = group.get('values') as FormArray;

      if (this.checkedCount.value >= this.MAX_SELECTION) {
        valuesArray.controls.forEach((control) => {
          if (!control.value) {
            control.disable();
          }
        });
      } else {
        valuesArray.controls.forEach((control) => {
          control.enable();
        });
      }
    });
  }

  public openExternalLink(): void {
    const linkOpenAccount = this.facade.linkByKey(LinkKey.linkSavingsAccount);
    this.facade.openExternalLinks(linkOpenAccount);
  }

  private createSelectedPaymentFormGroup(indexGroup, indexValue): FormGroup {
    const payment: CreditMovement =
      this.movements[indexGroup].values[indexValue];
    const balance = Number(payment.balance);
    return this.formBuilder.group({
      ...payment,
      balance,
      valueToPay: [
        0, // Number(payment.balance),
        [
          Validators.required,
          directedPaymentAmountValidators(balance).bind(this)
        ]
      ],
      otherValue: [null, [directedPaymentAmountValidators(balance).bind(this)]],
      directedPaymentType: [null]
    });
  }

  get hasSavingsAccounts(): Observable<boolean> {
    return this.facade.products$.pipe(map((products) => products?.length > 0));
  }

  get paymentsArray(): FormArray {
    return this.form.get('paymentsArray') as FormArray;
  }

  get checkedCount(): AbstractControl {
    return this.form.get('checkedCount');
  }

  get selectedMovements(): FormArray {
    return this.form.get('selectedMovements') as FormArray;
  }
}
