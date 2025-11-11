import { Component } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule, NavController } from '@ionic/angular';
import { UpperCasePipe } from '@angular/common';
import { LOGIN } from '@commons/constants/navigate.constants';
import {
  OPEN_MAP_EXTERNAL_URL_ALERT,
  OPEN_MAP_URL_SEARCHER_ATH
} from '@modules/care-channels/constants/care-channels.constants';
import { AppFacade } from '@app/app.facade';
import * as actions from '@modules/auth/login/store/login.actions';
import { LoginType } from '@modules/auth/login/constants/login.constants';

@Component({
  selector: 'app-product-no-products-error',
  templateUrl: './product-no-products-error.component.html',
  styleUrls: ['./product-no-products-error.component.sass'],
  standalone: true,
  imports: [GlobalPipesModule, IonicModule, UpperCasePipe],
  providers: [AppFacade]
})
export class ProductNoProductsErrorComponent {
  constructor(private navCtrl: NavController, private facade: AppFacade) {}

  public redirectToLogin(): void {
    this.facade.dispatch([
      actions.setLoginTypeAction({
        loginType: LoginType.Password
      })
    ]);
    void this.navCtrl.navigateRoot(LOGIN);
  }

  public redirectPortal(): void {
    this.facade.openExternalLinks(
      OPEN_MAP_URL_SEARCHER_ATH,
      '_blank',
      OPEN_MAP_EXTERNAL_URL_ALERT
    );
  }
}
