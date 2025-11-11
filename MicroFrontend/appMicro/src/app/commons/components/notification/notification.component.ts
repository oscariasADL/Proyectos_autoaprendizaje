import { Component, Input } from '@angular/core';
import { NotificationTypeEnum } from './constants/notification.constants';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() description: string;
  @Input() type?: NotificationTypeEnum = NotificationTypeEnum.info;

  get alertClass(): string {
    return `avv-alert-${this.type}`;
  }
}
