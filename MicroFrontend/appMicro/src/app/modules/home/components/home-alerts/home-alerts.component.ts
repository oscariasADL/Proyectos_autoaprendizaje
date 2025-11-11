import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  HomeAlertIds,
  HomeAlertProperties
} from '../../entities/home-alert.entities';

@Component({
  selector: 'app-home-alerts',
  templateUrl: './home-alerts.component.html',
  styleUrls: ['./home-alerts.component.sass']
})
export class HomeAlertsComponent {
  @Input()
  alerts: HomeAlertProperties[];
  @Output()
  goAction: EventEmitter<HomeAlertIds> = new EventEmitter<HomeAlertIds>();

  public onAction(id: HomeAlertIds): void {
    this.goAction.emit(id);
  }
}
