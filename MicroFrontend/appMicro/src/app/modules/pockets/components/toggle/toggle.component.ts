import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ToggleComponent {
  @Input() isChecked: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public toggle(): void {
    if (!this.isDisabled) {
      this.toggleChange.emit(!this.isChecked);
    }
  }
}
