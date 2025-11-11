import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { ContactListFacade } from '@modules/contacts/pages/contact-list/contact-list.facade';
import { ContactListEffect } from '@modules/contacts/pages/contact-list/store/contact-list.effect';
import { contactListReducer } from '@modules/contacts/pages/contact-list/store/contact-list.reducer';
import {
  contactListFeatureName,
  ContactListState
} from '@modules/contacts/pages/contact-list/store/contact-list.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ContactListPageRoutingModule } from './contact-list-routing.module';
import { ContactListPage } from './contact-list.page';

export const CONTACT_LIST_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ContactListState>
>('Contact List Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactListPageRoutingModule,
    HeadersModule,
    ContactsModule,
    StoreModule.forFeature(contactListFeatureName, CONTACT_LIST_REDUCER_TOKEN),
    EffectsModule.forFeature([ContactListEffect]),
    GlobalPipesModule
  ],
  declarations: [ContactListPage],
  providers: [
    ContactListFacade,
    {
      provide: CONTACT_LIST_REDUCER_TOKEN,
      useValue: contactListReducer
    }
  ]
})
export class ContactListPageModule {}
