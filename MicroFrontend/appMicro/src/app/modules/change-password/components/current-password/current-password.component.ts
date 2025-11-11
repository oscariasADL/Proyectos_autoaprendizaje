import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-current-password',
  templateUrl: './current-password.component.html',
  styleUrls: ['./current-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentPasswordComponent {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
}
