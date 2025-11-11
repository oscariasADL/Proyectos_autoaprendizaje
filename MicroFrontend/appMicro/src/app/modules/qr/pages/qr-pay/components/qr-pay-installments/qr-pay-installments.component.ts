import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-qr-pay-installments',
  templateUrl: './qr-pay-installments.component.html',
  styleUrls: ['./qr-pay-installments.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrPayInstallmentsComponent {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  get installments(): AbstractControl {
    return this.form.get('installments');
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }
}
