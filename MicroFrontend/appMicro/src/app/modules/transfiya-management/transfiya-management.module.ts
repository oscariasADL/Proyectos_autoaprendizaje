import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfiyaManagementStepComponent } from '@modules/transfiya-management/components/transfiya-management-step/transfiya-management-step.component';
import { TransfiyaManagementFacade } from '@modules/transfiya-management/transfiya-management.facade';

import { TransfiyaManagementPageRoutingModule } from './transfiya-management-routing.module';

import { TransfiyaManagementPage } from './transfiya-management.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfiyaManagementPageRoutingModule,
    GenericStepperModule,
    ReactiveFormsModule,
    GlobalPipesModule,
    FormsAvvModule,
    FeatureToggleDirective
  ],
  declarations: [TransfiyaManagementPage, TransfiyaManagementStepComponent],
  providers: [TransfiyaManagementFacade]
})
export class TransfiyaManagementPageModule {}
