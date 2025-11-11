import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PocketConfigurationFormGroup } from '../../entities/create-pocket.interface';
import { FormGroup, AbstractControl } from '@angular/forms';
import { PERIODICITY } from '@app/modules/pockets/entities/pockets.interface';
import { RATES_URL } from '../../constants/pocket-create-with-returns.constants';
import { valueNotGreaterThanProduct } from '../../validators/productValidator.validator';
import { PocketsFacade } from '@app/modules/pockets/pockets.facade';
import { RENTABILITY_POCKET_CONTINUE_CONFIRMATION } from '@app/modules/pockets/constants/create.constants';
@Component({
  selector: 'app-configuration-step',
  templateUrl: './configuration-step.component.html',
  styleUrls: ['./configuration-step.component.sass']
})
export class ConfigurationStepComponent implements OnInit {
  @Input() form: FormGroup<PocketConfigurationFormGroup>;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  ratesURL = RATES_URL;

  constructor(private facade: PocketsFacade) {}

  periodicityItems = PERIODICITY;
  toggleValues = [
    { label: 'Sí', value: true },
    { label: 'No', value: false }
  ];
  public readonly RENTABILITY_POCKET_CONTINUE_CONFIRMATION =
    RENTABILITY_POCKET_CONTINUE_CONFIRMATION;
  ngOnInit() {
    const accountControl = this.form.get('product') as AbstractControl<any>;
    const account = accountControl.value;
    this.form.patchValue({
      periodicity: this.periodicityItems[0] as unknown as string
    });
    this.form.get('openAmount')?.valueChanges.subscribe(() => {
      if (account && account.availableBalance) {
        this.form.get('openAmount').addValidators([
          valueNotGreaterThanProduct('product', 'openAmount', {
            openAmountExceedsBalance: true
          })
        ]);
      }
    });
    this.form.get('quota')?.valueChanges.subscribe(() => {
      if (account && account.availableBalance) {
        this.form.get('quota').addValidators([
          valueNotGreaterThanProduct('product', 'quota', {
            quotaExceedsBalance: true
          })
        ]);
      }
    });

    this.form.get('renewPocket')?.valueChanges.subscribe((value) => {
      if (!value) {
        this.form.get('renewWithProfits')?.setValue(false);
      }
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.continue.emit();
    }
  }

  public openUrl(url: string) {
    this.facade.openExternalLinks(url);
  }

  get renewal() {
    return this.form.get('renewal');
  }

  get goal() {
    return this.form.get('goal');
  }

  get openAmount() {
    return this.form.get('openAmount');
  }

  get period() {
    return this.form.get('period');
  }

  get periodicity() {
    return this.form.get('periodicity');
  }

  get quota() {
    return this.form.get('quota');
  }

  get renewPocket() {
    return this.form.get('renewPocket');
  }

  get renewWithProfits() {
    return this.form.get('renewWithProfits');
  }
}
