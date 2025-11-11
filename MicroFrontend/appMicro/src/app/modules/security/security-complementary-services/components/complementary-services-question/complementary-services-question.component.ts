import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-complementary-services-question',
  templateUrl: './complementary-services-question.component.html',
  styleUrls: ['./complementary-services-question.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplementaryServicesQuestionComponent {
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
}
