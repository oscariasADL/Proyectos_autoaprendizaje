import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPasswordComponent {
  @Input() form: UntypedFormGroup;

  @Output() changePassword: EventEmitter<void> = new EventEmitter<void>();
}
