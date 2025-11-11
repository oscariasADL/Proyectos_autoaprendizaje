import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { GenericFormConfirmComponent } from '@modules/templates/generic-form/components/generic-form-confirm/generic-form-confirm.component';
import { GenericFormFacade } from '@modules/templates/generic-form/generic-form.facade';

import { GenericFormPage } from './generic-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadersModule,
    FormsAvvModule,
    GlobalPipesModule,
    ReactiveFormsModule
  ],
  declarations: [GenericFormPage, GenericFormConfirmComponent],
  entryComponents: [GenericFormConfirmComponent],
  exports: [GenericFormPage],
  providers: [GenericFormFacade]
})
export class GenericFormPageModule {}
