import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesAddPage } from './favorites-add.page';
import { FavoritesAddPageRoutingModule } from './favorites-add.routing.module';
import { IonicModule } from '@ionic/angular';
import { HeadersModule } from '@app/commons/components/headers/headers.module';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { DropdownModalProductsComponent } from '@app/modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';
import { FormsAvvModule } from '@app/modules/forms-avv/forms-avv.module';
import { CommonsModule } from '@app/commons/commons.module';
import { VillasComponent } from '../../component/favorites-add/villas/villas.component';

import { FavoritesModule } from '../../favorites.module';
import { MobileFormComponent } from '../../component/favorites-add/mobile-form/mobile-form.component';
import { ContactsFormComponent } from '../../component/favorites-add/contacs-form/contacts-form.component';
import { ContactsModule } from '@app/modules/contacts/contacts.module';
import { ContactListFacade } from '@app/modules/contacts/pages/contact-list/contact-list.facade';
import { ContactListPageModule } from '@app/modules/contacts/pages/contact-list/contact-list.module';
import { ContactDetailFacade } from '@app/modules/contacts/pages/contact-detail/contact-detail.facade';
import { TransfersContactsFacade } from '@app/modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { TransfersContactsPageModule } from '@app/modules/transfers/pages/transfers-contacts/transfers-contacts.module';

@NgModule({
  declarations: [
    FavoritesAddPage,
    VillasComponent,
    MobileFormComponent,
    ContactsFormComponent
  ],
  imports: [
    CommonModule,
    GlobalPipesModule,
    FavoritesAddPageRoutingModule,
    IonicModule,
    HeadersModule,
    DropdownModalProductsComponent,
    CommonsModule,
    FormsAvvModule,
    FavoritesModule,
    ContactsModule,
    ContactListPageModule,
    TransfersContactsPageModule
  ],
  providers: [ContactListFacade, ContactDetailFacade, TransfersContactsFacade],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FavoritesAddModule {}
