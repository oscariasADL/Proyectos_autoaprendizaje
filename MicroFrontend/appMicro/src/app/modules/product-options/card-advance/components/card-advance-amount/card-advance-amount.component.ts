import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-advance-amount',
  templateUrl: './card-advance-amount.component.html',
  styleUrls: ['./card-advance-amount.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAdvanceAmountComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('amount', this.form.get('amount'));
    this.formGroup.addControl('installments', this.form.get('installments'));
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get installments(): AbstractControl | FormControl {
    return this.form.get('installments');
  }
}
