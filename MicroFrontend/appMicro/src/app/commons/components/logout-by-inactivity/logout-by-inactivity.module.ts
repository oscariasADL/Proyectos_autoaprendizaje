import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';

import { LogoutByInactivityPageRoutingModule } from './logout-by-inactivity-routing.module';

import { LogoutByInactivityPage } from './logout-by-inactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutByInactivityPageRoutingModule,
    GlobalPipesModule
  ],
  declarations: [LogoutByInactivityPage]
})
export class LogoutByInactivityPageModule {}
