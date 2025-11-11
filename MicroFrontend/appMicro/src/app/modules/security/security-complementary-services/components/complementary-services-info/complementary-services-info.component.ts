import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AlertService } from '@commons/services/alert.service';
import { COMPLEMENTARY_SERVICE_DEACTIVATE_CONFIRM } from '@modules/security/security-complementary-services/constants/security-complementary-services.constants';

@Component({
  selector: 'app-complementary-services-info',
  templateUrl: './complementary-services-info.component.html',
  styleUrls: ['./complementary-services-info.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryServicesInfoComponent {
  @Input() state: boolean = false;

  @Output() activate: EventEmitter<void> = new EventEmitter<void>();
  @Output() deactivate: EventEmitter<void> = new EventEmitter<void>();

  constructor(private alertService: AlertService) {}

  public nextStep(): void {
    if (this.state) {
      this.alertService
        .create(COMPLEMENTARY_SERVICE_DEACTIVATE_CONFIRM)
        .then((confirmed) => {
          if (confirmed) {
            this.deactivate.emit();
          }
        });
    } else {
      this.activate.emit();
    }
  }
}
