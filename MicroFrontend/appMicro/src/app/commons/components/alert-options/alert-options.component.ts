import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertBaseComponent } from '@commons/components/alert-base/alert-base.component';

@Component({
  selector: 'app-alert-options',
  templateUrl: './alert-options.component.html',
  styleUrls: ['./alert-options.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertOptionsComponent extends AlertBaseComponent {}
