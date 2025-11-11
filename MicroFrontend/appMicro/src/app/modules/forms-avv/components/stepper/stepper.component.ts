import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() currentStep: number = 1;

  @Output() stepClicked: EventEmitter<Step> = new EventEmitter<Step>();

  public isCurrentStep(step: Step): boolean {
    return Math.floor(this.currentStep) === step.id;
  }

  public isCompletedStep(step: Step): boolean {
    return Math.floor(this.currentStep) > step.id;
  }

  public click(step: Step): void {
    if (step.id < this.currentStep) {
      this.stepClicked.emit(step);
    }
  }
}
