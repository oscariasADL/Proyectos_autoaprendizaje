import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-complementary-services-failed',
  templateUrl: './complementary-services-failed.component.html',
  styleUrls: ['./complementary-services-failed.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryServicesFailedComponent {
  @Input() state: boolean = false;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
}
