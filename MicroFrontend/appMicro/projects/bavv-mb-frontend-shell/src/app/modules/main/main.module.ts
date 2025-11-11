import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MAIN_ROUTES } from './main.routes';
import { IonicModule } from '@ionic/angular';
import { HeadersModule } from '../../../../../../src/app/commons/components/headers/headers.module';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([...MAIN_ROUTES]),
    HeadersModule,
    FormsModule,
    GlobalPipesModule
  ],
  declarations: [MainComponent],
  providers: []
})
export class MainModule {}
