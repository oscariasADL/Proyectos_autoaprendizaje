import { Component, Input, OnInit } from '@angular/core';
import { HOME } from '@app/commons/constants/navigate.constants';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-cant-load-product',
  templateUrl: './product-cant-load-product.component.html',
  styleUrls: ['./product-cant-load-product.component.sass'],
  standalone: true,
  imports: [TranslateModule, GlobalPipesModule]
})
export class ProductCantLoadProductComponent {
  constructor(private navCtrl: NavController) {}

  public goHome() {
    this.navCtrl.navigateForward(HOME);
  }
}
