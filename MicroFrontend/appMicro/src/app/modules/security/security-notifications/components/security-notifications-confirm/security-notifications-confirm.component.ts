import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-security-notifications-confirm',
  templateUrl: './security-notifications-confirm.component.html',
  styleUrls: ['./security-notifications-confirm.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityNotificationsConfirmComponent {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() disableNotifications: EventEmitter<void> = new EventEmitter<void>();
}
