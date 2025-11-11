import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ToggleSecurityNotificationsResponse } from '@modules/security/security-notifications/entities/security-notifications.interface';

@Component({
  selector: 'app-security-notifications-result',
  templateUrl: './security-notifications-result.component.html',
  styleUrls: ['./security-notifications-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityNotificationsResultComponent {
  @Input() data: ToggleSecurityNotificationsResponse;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();
}
