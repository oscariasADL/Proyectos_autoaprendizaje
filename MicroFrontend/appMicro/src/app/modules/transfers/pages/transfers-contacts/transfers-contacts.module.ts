import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactDetailPageModule } from '@modules/contacts/pages/contact-detail/contact-detail.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { ContactAddProductPageModule } from '@modules/contacts/pages/contact-add-product/contact-add-product.module';
import { ContactListPageModule } from '@modules/contacts/pages/contact-list/contact-list.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransferContactsOwnComponent } from '@modules/transfers/pages/transfers-contacts/components/transfer-contacts-own/transfer-contacts-own.component';
import { TransferContactsProductTypeComponent } from '@modules/transfers/pages/transfers-contacts/components/transfer-contacts-product-type/transfer-contacts-product-type.component';
import { TransferContactsProductsComponent } from '@modules/transfers/pages/transfers-contacts/components/transfer-contacts-products/transfer-contacts-products.component';
import { TransferContactsTowardComponent } from '@modules/transfers/pages/transfers-contacts/components/transfer-contacts-toward/transfer-contacts-toward.component';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { TransfersModule } from '../../transfers.module';
import { TransfersContactsPageRoutingModule } from './transfers-contacts-routing.module';
import { TransfersContactsPage } from './transfers-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersContactsPageRoutingModule,
    FormsAvvModule,
    ProductModule,
    TransfersModule,
    ContactsModule,
    ContactDetailPageModule,
    ContactListPageModule,
    ContactListPageModule,
    ContactAddProductPageModule,
    GlobalPipesModule,
    GenericStepperModule
  ],
  declarations: [
    TransfersContactsPage,
    TransferContactsOwnComponent,
    TransferContactsTowardComponent,
    TransferContactsProductsComponent,
    TransferContactsProductTypeComponent
  ],
  providers: [TransfersContactsFacade]
})
export class TransfersContactsPageModule {}
