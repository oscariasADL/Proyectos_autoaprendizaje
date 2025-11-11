import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FooterModule } from '@commons/components/footer/footer.module';
import { SideMenuModule } from '@commons/components/side-menu/side-menu.module';
import { IonicModule } from '@ionic/angular';
import { LayoutWithFooterComponent } from '@modules/layout/components/layout-with-footer/layout-with-footer.component';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { LayoutPageRoutingModule } from './layout-routing.module';
import { LayoutFacade } from './layout.facade';
import { LayoutPage } from './layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule,
    GlobalPipesModule,
    SideMenuModule,
    NotificationsModule,
    FooterModule
  ],
  declarations: [LayoutPage, LayoutWithFooterComponent],
  providers: [LayoutFacade]
})
export class LayoutPageModule {}
