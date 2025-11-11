import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { numberRangeBySteps } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() title: number;
  @Input() control: UntypedFormControl;

  public setValue(value: number): void {
    this.control.setValue(value);
    this.control.markAsDirty();
  }

  get labelList(): number[] {
    return numberRangeBySteps(this.min, this.max, this.step);
  }
}
