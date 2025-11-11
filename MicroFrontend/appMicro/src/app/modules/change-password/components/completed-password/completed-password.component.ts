import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-completed-password',
  templateUrl: './completed-password.component.html',
  styleUrls: ['./completed-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedPasswordComponent {
  @Output() goToHome: EventEmitter<void> = new EventEmitter<void>();
}
