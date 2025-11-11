import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BACKGROUND_RED,
  BACKGROUND_WHITE,
  HeaderType
} from '@app/commons/entities/header/header.interface';

@Component({
  selector: 'app-generic-stepper-header',
  templateUrl: './generic-stepper-header.component.html',
  styleUrls: ['./generic-stepper-header.component.sass']
})
export class GenericStepperHeaderComponent {
  @Input() title: string;
  @Input() headerType: HeaderType = HeaderType.whitePrimary;

  @Output() backClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();

  get backgroundColor(): string {
    if (BACKGROUND_RED.includes(this.headerType)) return 'red';
    return BACKGROUND_WHITE.includes(this.headerType) ? 'white' : '';
  }
}
