import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '@commons/components/footer/footer.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepCompletedComponent } from '@modules/auth/auth-steps/components/auth-step-completed/auth-step-completed.component';
import { AuthStepErrorComponent } from '@modules/auth/auth-steps/components/auth-step-error/auth-step-error.component';
import { ConfirmDeviceRegistrationComponent } from '@modules/auth/auth-steps/components/confirm-device-registration/confirm-device-registration.component';
import { FillCurrentPasswordComponent } from '@modules/auth/auth-steps/components/fill-current-password/fill-current-password.component';
import { FillOtpDataComponent } from '@modules/auth/auth-steps/components/fill-otp-data/fill-otp-data.component';
import { FillOtpComponent } from '@modules/auth/auth-steps/components/fill-otp/fill-otp.component';
import { FillSecureDataComponent } from '@modules/auth/auth-steps/components/fill-secure-data/fill-secure-data.component';
import { FillUniversalPasswordComponent } from '@modules/auth/auth-steps/components/fill-universal-password/fill-universal-password.component';
import { InactiveChannelScreenComponent } from '@modules/auth/auth-steps/components/inactive-channel-screen/inactive-channel-screen.component';
import { NotificationPermissionsComponent } from '@modules/auth/auth-steps/components/notification-permissions/notification-permissions.component';
import { RegisteringDeviceErrorComponent } from '@modules/auth/auth-steps/components/registering-device-error/registering-device-error.component';
import { RegisteringDeviceComponent } from '@modules/auth/auth-steps/components/registering-device/registering-device.component';
import { RequestProductValidationComponent } from '@modules/auth/auth-steps/components/request-product-validation/request-product-validation.component';
import { TermsDetailComponent } from '@modules/auth/auth-steps/components/terms-detail/terms-detail.component';
import { ToggleTermsComponent } from '@modules/auth/auth-steps/components/toggle-terms/toggle-terms.component';
import { SelectProductTypeComponent } from '@modules/auth/auth-steps/components/select-product-type/select-product-type.component';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ConfirmProcessStartComponent } from '@modules/auth/auth-steps/components/confirm-process-start/confirm-process-start.component';

@NgModule({
  declarations: [
    FillOtpComponent,
    FillOtpDataComponent,
    AuthStepErrorComponent,
    FillSecureDataComponent,
    AuthStepCompletedComponent,
    FillCurrentPasswordComponent,
    InactiveChannelScreenComponent,
    FillUniversalPasswordComponent,
    NotificationPermissionsComponent,
    RequestProductValidationComponent,
    ConfirmDeviceRegistrationComponent,
    ToggleTermsComponent,
    TermsDetailComponent,
    RegisteringDeviceComponent,
    RegisteringDeviceErrorComponent,
    SelectProductTypeComponent,
    ConfirmProcessStartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsAvvModule,
    GlobalPipesModule,
    IonicModule,
    FooterModule
  ],
  providers: [AuthStepsFacade]
})
export class AuthStepsModule {}
