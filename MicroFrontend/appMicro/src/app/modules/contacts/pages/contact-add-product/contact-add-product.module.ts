import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { ContactAddProductFacade } from '@modules/contacts/pages/contact-add-product/contact-add-product.facade';
import { ContactAddProductEffect } from '@modules/contacts/pages/contact-add-product/store/contact-add-product.effect';
import { contactAddProductReducer } from '@modules/contacts/pages/contact-add-product/store/contact-add-product.reducer';
import {
  contactAddProductFeatureName,
  ContactAddProductState
} from '@modules/contacts/pages/contact-add-product/store/contact-add-product.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { ContactAddProductPage } from './contact-add-product.page';

export const CONTACT_ADD_PRODUCT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ContactAddProductState>
>('Contact Add Product Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(
      contactAddProductFeatureName,
      CONTACT_ADD_PRODUCT_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ContactAddProductEffect]),
    ContactsModule
  ],
  declarations: [ContactAddProductPage],
  providers: [
    ContactAddProductFacade,
    {
      provide: CONTACT_ADD_PRODUCT_REDUCER_TOKEN,
      useValue: contactAddProductReducer
    }
  ]
})
export class ContactAddProductPageModule {}
