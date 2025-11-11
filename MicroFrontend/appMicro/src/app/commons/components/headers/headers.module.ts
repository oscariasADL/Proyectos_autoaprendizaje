import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadersComponent } from '@commons/components/headers/headers.component';
import { HeadersFacade } from '@commons/components/headers/headers.facade';
import { IonicModule } from '@ionic/angular';
import { GlobalPipesModule } from '../../pipes/global-pipes.module';

@NgModule({
  declarations: [HeadersComponent],
  imports: [CommonModule, GlobalPipesModule, IonicModule],
  providers: [HeadersFacade],
  exports: [HeadersComponent]
})
export class HeadersModule {}
