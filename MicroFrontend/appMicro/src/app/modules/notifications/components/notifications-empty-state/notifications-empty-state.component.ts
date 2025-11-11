import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { CommonsModule } from '@app/commons/commons.module';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notifications-empty-state',
  templateUrl: './notifications-empty-state.component.html',
  styleUrls: ['./notifications-empty-state.component.sass'],
  imports: [GlobalPipesModule, IonicModule, CommonsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsEmptyStateComponent {
  @Output() notificationsUpdated: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateBack: EventEmitter<void> = new EventEmitter<void>();

  public updateNotifications(): void {
    this.notificationsUpdated.emit();
  }

  public goBack(): void {
    this.navigateBack.emit();
  }
}
