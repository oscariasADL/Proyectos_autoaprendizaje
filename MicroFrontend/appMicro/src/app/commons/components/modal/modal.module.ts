import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalPipesModule } from '../../pipes/global-pipes.module';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [CommonModule, IonicModule, TranslateModule, GlobalPipesModule],
  exports: [ModalConfirmComponent]
})
export class ModalModule {}
