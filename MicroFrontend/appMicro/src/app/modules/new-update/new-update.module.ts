import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { NewUpdateFacade } from '@modules/new-update/new-update.facade';
import { NewUpdatePageRoutingModule } from './new-update-routing.module';
import { NewUpdatePage } from './new-update.page';

@NgModule({
  imports: [
    CommonModule,
    GlobalPipesModule,
    IonicModule,
    NewUpdatePageRoutingModule,
    HeadersModule
  ],
  declarations: [NewUpdatePage],
  providers: [NewUpdateFacade]
})
export class NewUpdatePageModule {}
