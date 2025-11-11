import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PERSONAL_LOAN_ROUTES } from './personal-loan.routes';
import { IonicModule } from '@ionic/angular';
import { HeadersModule } from '../../../../../../src/app/commons/components/headers/headers.module';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { PersonalLoanComponent } from './personal-loan.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(PERSONAL_LOAN_ROUTES),
    HeadersModule,
    FormsModule,
    GlobalPipesModule,
    ModuleFederationToolsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [PersonalLoanComponent],
  providers: []
})
export class PersonalLoanModule {}
