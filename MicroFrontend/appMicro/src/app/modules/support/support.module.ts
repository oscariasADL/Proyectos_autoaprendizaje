import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportPage } from './support.page';
import { SupportRoutingModule } from './support-routing.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '../forms-avv/forms-avv.module';
import { AccordionUrlComponent } from './components/accordion-url/accordion-url.component';
import { IonicModule } from '@ionic/angular';
import { SupportFacade } from './support.facade';

@NgModule({
  declarations: [SupportPage, AccordionUrlComponent],

  imports: [
    CommonModule,
    SupportRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule,
    IonicModule.forRoot()
  ],
  providers: [SupportFacade]
})
export class SupportModule {}
