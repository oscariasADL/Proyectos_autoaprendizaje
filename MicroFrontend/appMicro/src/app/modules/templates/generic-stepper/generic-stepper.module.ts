import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CellPhoneContactsModule } from '@commons/components/cell-phone-contacts/cell-phone-contacts.module';
import { ModalModule } from '@commons/components/modal/modal.module';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { AccountsStepComponent } from '@modules/templates/generic-stepper/components/accounts-step/accounts-step.component';
import { AccountsStepFacade } from '@modules/templates/generic-stepper/components/accounts-step/accounts-step.facade';
import { ConfirmationStepComponent } from '@modules/templates/generic-stepper/components/confirmation-step/confirmation-step.component';
import { FieldStepComponent } from '@modules/templates/generic-stepper/components/field-step/field-step.component';
import { FormStepComponent } from '@modules/templates/generic-stepper/components/form-step/form-step.component';
import { GenericStepperBodyComponent } from '@modules/templates/generic-stepper/components/generic-stepper-body/generic-stepper-body.component';
import { GenericStepperHeaderComponent } from '@modules/templates/generic-stepper/components/generic-stepper-header/generic-stepper-header.component';
import { TelephoneCompaniesStepComponent } from '@modules/templates/generic-stepper/components/telephone-companies-step/telephone-companies-step.component';
import { TelephoneCompaniesStepFacade } from '@modules/templates/generic-stepper/components/telephone-companies-step/telephone-companies-step.facade';
import { WithdrawalChannelsStepComponent } from '@modules/templates/generic-stepper/components/withdrawal-channels-step/withdrawal-channels-step.component';
import { WithdrawalChannelsStepFacade } from '@modules/templates/generic-stepper/components/withdrawal-channels-step/withdrawal-channels-step.facade';
import { ContactsStepFacade } from '@modules/templates/generic-stepper/facades/contacts-step.facade';
import { GenericStepperComponent } from '@modules/templates/generic-stepper/generic-stepper.component';
import { GenericStepperFacade } from '@modules/templates/generic-stepper/generic-stepper.facade';
import { GenericStepperRoutingModule } from './generic-stepper-routing.module';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { CommonsModule } from '@commons/commons.module';
import { SwiperModule } from 'swiper/angular';
import { StoreModule } from '@ngrx/store';
import {
  GENERIC_STEPPER_REDUCER_TOKEN,
  genericStepperFeatureName
} from './store/generic-stepper.state';
import { EffectsModule } from '@ngrx/effects';
import { GenericStepperEffect } from './store/generic-stepper.effect';
import { genericStepperReducer } from './store/generic-stepper.reducer';

@NgModule({
  imports: [
    CommonModule,
    GenericStepperRoutingModule,
    ReactiveFormsModule,
    FormsAvvModule,
    IonicModule,
    ProductModule,
    GlobalPipesModule,
    ContactsModule,
    VoucherModule,
    ModalModule,
    CellPhoneContactsModule,
    CommonsModule,
    SwiperModule,
    StoreModule.forFeature(
      genericStepperFeatureName,
      GENERIC_STEPPER_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([GenericStepperEffect])
  ],
  exports: [
    GenericStepperComponent,
    GenericStepperHeaderComponent,
    GenericStepperBodyComponent
  ],
  declarations: [
    GenericStepperComponent,
    GenericStepperBodyComponent,
    GenericStepperHeaderComponent,
    AccountsStepComponent,
    TelephoneCompaniesStepComponent,
    ConfirmationStepComponent,
    FieldStepComponent,
    FormStepComponent,
    WithdrawalChannelsStepComponent
  ],
  providers: [
    ContactsStepFacade,
    AccountsStepFacade,
    TransfersCel2celFacade,
    TelephoneCompaniesStepFacade,
    WithdrawalChannelsStepFacade,
    GenericStepperFacade,
    TitleCasePipe,
    {
      provide: GENERIC_STEPPER_REDUCER_TOKEN,
      useValue: genericStepperReducer
    }
  ]
})
export class GenericStepperModule {}
