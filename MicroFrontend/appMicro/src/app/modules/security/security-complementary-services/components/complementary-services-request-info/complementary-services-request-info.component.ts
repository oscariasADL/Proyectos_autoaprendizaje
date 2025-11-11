import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-complementary-services-request-info',
  templateUrl: './complementary-services-request-info.component.html',
  styleUrls: ['./complementary-services-request-info.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryServicesRequestInfoComponent {
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
}
