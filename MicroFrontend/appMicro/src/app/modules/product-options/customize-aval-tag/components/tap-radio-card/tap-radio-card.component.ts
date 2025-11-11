import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { RadioBtnComponent } from '../radio-btn/radio-btn.component';

@Component({
  selector: 'avv-tap-radio-card',
  templateUrl: './tap-radio-card.component.html',
  styleUrls: ['./tap-radio-card.component.sass']
})
export class TapRadioCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() radioValue: any;
  @Input() radioName: string = 'default-group';
  @Input() selectedValue: any = null;
  @Input() tag: string = '';

  @Output() cardClick = new EventEmitter<any>();
  @Output() radioChange = new EventEmitter<any>();

  @ViewChild('radioBtn') radioBtnComponent!: RadioBtnComponent;

  public onCardClick(): void {
    if (this.radioBtnComponent) {
      this.radioBtnComponent.select();
    }
    this.cardClick.emit(this.radioValue);
  }

  public onRadioChanged(value: any): void {
    this.radioChange.emit(value);
  }
}
