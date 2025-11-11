import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOGIN } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout-by-inactivity',
  templateUrl: './logout-by-inactivity.page.html',
  styleUrls: ['./logout-by-inactivity.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutByInactivityPage {
  constructor(private navCtrl: NavController) {}

  public redirectToLogin(): void {
    this.navCtrl.navigateRoot(LOGIN);
  }
}
