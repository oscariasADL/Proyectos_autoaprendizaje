import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-enable-notifications',
  templateUrl: './enable-notifications.component.html',
  styleUrls: ['./enable-notifications.component.sass'],
  imports: [GlobalPipesModule, IonicModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnableNotificationsComponent {
  @Output() notificationsEnabled: EventEmitter<void> = new EventEmitter<void>();

  public enableNotifications(): void {
    this.notificationsEnabled.emit();
  }
}
