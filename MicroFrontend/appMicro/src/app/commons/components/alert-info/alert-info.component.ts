import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector
} from '@angular/core';
import { HOME } from '@app/commons/constants/navigate.constants';

import { AlertBaseComponent } from '@commons/components/alert-base/alert-base.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertInfoComponent extends AlertBaseComponent {
  isChecked = false;
  navCtrl = inject(NavController);
  public onCheckboxChange(event: any) {
    this.isChecked = event.detail.checked;
  }
  public returnToHome() {
    this.navCtrl.navigateForward(HOME);
  }
}
