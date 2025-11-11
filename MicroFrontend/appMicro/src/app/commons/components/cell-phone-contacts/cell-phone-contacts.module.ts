import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { TranslateModule } from '@ngx-translate/core';
import { CellPhoneContactsComponent } from './cell-phone-contacts.component';
import { CellPhoneListComponent } from './components/cell-phone-list/cell-phone-list.component';
import { CommonsModule } from '@commons/commons.module';

@NgModule({
  declarations: [CellPhoneContactsComponent, CellPhoneListComponent],
  imports: [
    CommonModule,
    GlobalPipesModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsAvvModule,
    ContactsModule,
    CommonsModule
  ],
  exports: [CellPhoneContactsComponent]
})
export class CellPhoneContactsModule {}
