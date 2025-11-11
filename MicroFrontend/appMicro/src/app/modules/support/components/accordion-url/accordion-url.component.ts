import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { SupportCardQuestion } from '../../constants/support.constants';
import { alertBrebSupport } from '@app/commons/constants/spi-support.constants';
import { AlertService } from '@app/commons/services/alert.service';

@Component({
  selector: 'app-accordion-url',
  templateUrl: './accordion-url.component.html',
  styleUrls: ['./accordion-url.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionUrlComponent {
  @Input() urls: SupportCardQuestion[];
  @Input() content: any;
  @Output() openUrl: EventEmitter<string> = new EventEmitter();

  constructor(private alertService: AlertService) {}

  public trackByFunction(index: number, item: any) {
    return item.key;
  }

  public trackByFunction2(index: number, item: any) {
    return index;
  }

  public openPopUp(title, content) {
    const alert = alertBrebSupport(title, content);
    this.alertService.create(alert);
  }
}
