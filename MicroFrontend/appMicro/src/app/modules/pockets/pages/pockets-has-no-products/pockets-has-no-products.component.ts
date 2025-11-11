import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { HeadersModule } from '@app/commons/components/headers/headers.module';
import { HOME } from '@app/commons/constants/navigate.constants';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { environment as ENV } from '@environment';
import { PocketsFacade } from '../../pockets.facade';

@Component({
  selector: 'app-pockets-has-no-products',
  templateUrl: './pockets-has-no-products.component.html',
  styleUrls: ['./pockets-has-no-products.component.sass'],
  standalone: true,
  imports: [
    HeadersModule,
    GlobalPipesModule,
    UpperCasePipe,
    IonicModule,
    RouterLink
  ],
  providers: [PocketsFacade]
})
export class PocketsHasNoProductsComponent {
  constructor(private facade: PocketsFacade) {}
  public Home = HOME;
  public openExternal() {
    this.facade.openExternalLinks(ENV.externalOpenAccount);
  }
}
