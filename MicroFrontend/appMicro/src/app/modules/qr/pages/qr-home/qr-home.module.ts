import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QrModule } from '@modules/qr/qr.module';

import { QrHomePageRoutingModule } from './qr-home-routing.module';

import { QrHomePage } from './qr-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrHomePageRoutingModule,
    QrModule
  ],
  declarations: [QrHomePage]
})
export class QrHomePageModule {}
