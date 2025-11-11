import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';

@Component({
  selector: 'app-notifications-transfiya',
  templateUrl: './notifications-transfiya.component.html',
  styleUrls: ['./notifications-transfiya.component.sass']
})
export class NotificationsTransfiyaComponent {
  @Input() transfiyaList: TransfiyaAuthorizationItem[] = [];

  @Output() redirect: EventEmitter<TransfiyaAuthorizationItem> =
    new EventEmitter<TransfiyaAuthorizationItem>();
}
