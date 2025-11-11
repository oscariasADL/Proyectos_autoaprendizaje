import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-complementary-services-complete',
  templateUrl: './complementary-services-complete.component.html',
  styleUrls: ['./complementary-services-complete.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryServicesCompleteComponent {
  @Input() state: boolean = false;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
}
