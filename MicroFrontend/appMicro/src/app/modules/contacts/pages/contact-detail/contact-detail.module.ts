import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { IonicModule } from '@ionic/angular';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { ContactDetailFacade } from '@modules/contacts/pages/contact-detail/contact-detail.facade';
import { ContactDetailResolver } from '@modules/contacts/pages/contact-detail/resolvers/contact-detail.resolver';
import { ContactDetailEffect } from '@modules/contacts/pages/contact-detail/store/contact-detail.effect';
import { contactDetailReducer } from '@modules/contacts/pages/contact-detail/store/contact-detail.reducer';
import {
  contactDetailFeatureName,
  ContactDetailState
} from '@modules/contacts/pages/contact-detail/store/contact-detail.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ContactDetailPageRoutingModule } from './contact-detail-routing.module';
import { ContactDetailPage } from './contact-detail.page';

export const CONTACT_DETAIL_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ContactDetailState>
>('Contact Detail Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactDetailPageRoutingModule,
    HeadersModule,
    StoreModule.forFeature(
      contactDetailFeatureName,
      CONTACT_DETAIL_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ContactDetailEffect]),
    ContactsModule
  ],
  declarations: [ContactDetailPage],
  providers: [
    ContactDetailFacade,
    ContactDetailResolver,
    {
      provide: CONTACT_DETAIL_REDUCER_TOKEN,
      useValue: contactDetailReducer
    }
  ]
})
export class ContactDetailPageModule {}
