import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ContactBookComponent } from '@modules/contacts/components/contact-book/contact-book.component';
import { ContactItemComponent } from '@modules/contacts/components/contact-item/contact-item.component';
import { ContactProductItemComponent } from '@modules/contacts/components/contact-product-item/contact-product-item.component';
import { ContactsRoutingModule } from '@modules/contacts/contacts-routing.module';
import { ContactService } from '@modules/contacts/services/contact.service';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

@NgModule({
  declarations: [
    ContactItemComponent,
    ContactProductItemComponent,
    ContactBookComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ContactsRoutingModule,
    GlobalPipesModule,
    FormsAvvModule
  ],
  exports: [
    ContactItemComponent,
    ContactProductItemComponent,
    ContactBookComponent
  ],
  providers: [ContactService]
})
export class ContactsModule {}
