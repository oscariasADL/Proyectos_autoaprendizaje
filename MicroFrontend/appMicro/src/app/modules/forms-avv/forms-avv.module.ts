import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FieldComponent } from '@modules/forms-avv/components/field/field.component';
import { PasswordComponent } from '@modules/forms-avv/components/password/password.component';
import { RadioComponent } from '@modules/forms-avv/components/radio/radio.component';
import { StepperComponent } from '@modules/forms-avv/components/stepper/stepper.component';
import { ValidationsComponent } from '@modules/forms-avv/components/validations/validations.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ErrorsForCheckComponent } from './components/errors-for-check/errors-for-check.component';
import { InputComponent } from './components/input/input.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { DropdownModalComponent } from './components/dropdown-modal/dropdown-modal.component';
import { ModalComponent } from './components/dropdown-modal/modal/modal.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    InputComponent,
    StepperComponent,
    DropdownComponent,
    DropdownModalComponent,
    RadioComponent,
    FieldComponent,
    PasswordComponent,
    ValidationsComponent,
    ValidationMessagesComponent,
    ErrorsForCheckComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    GlobalPipesModule
  ],
  exports: [
    InputComponent,
    DropdownComponent,
    DropdownModalComponent,
    ModalComponent,
    StepperComponent,
    RadioComponent,
    FieldComponent,
    PasswordComponent,
    ValidationsComponent,
    ErrorsForCheckComponent,
    ValidationMessagesComponent
  ],
  providers: [provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsAvvModule {}
