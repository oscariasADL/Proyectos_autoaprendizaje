import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStepCompletedComponent } from '@modules/auth/auth-steps/components/auth-step-completed/auth-step-completed.component';
import { FillOtpDataComponent } from '@modules/auth/auth-steps/components/fill-otp-data/fill-otp-data.component';
import { FillOtpComponent } from '@modules/auth/auth-steps/components/fill-otp/fill-otp.component';
import { FillSecureDataComponent } from '@modules/auth/auth-steps/components/fill-secure-data/fill-secure-data.component';
import { FillUniversalPasswordComponent } from '@modules/auth/auth-steps/components/fill-universal-password/fill-universal-password.component';
import { InactiveChannelScreenComponent } from '@modules/auth/auth-steps/components/inactive-channel-screen/inactive-channel-screen.component';
import { NotificationPermissionsComponent } from '@modules/auth/auth-steps/components/notification-permissions/notification-permissions.component';
import { RequestProductValidationComponent } from '@modules/auth/auth-steps/components/request-product-validation/request-product-validation.component';
import { forgotPasswordGuard } from '@modules/auth/forgot-password/guards/forgot-password.guard';
import { ForgotPasswordResolver } from '@modules/auth/forgot-password/guards/forgot-password.resolver';
import { SelectProductTypeComponent } from '@modules/auth/auth-steps/components/select-product-type/select-product-type.component';
import { ConfirmProcessStartComponent } from '@modules/auth/auth-steps/components/confirm-process-start/confirm-process-start.component';
import { BiometricVerificationComponent } from '../auth-steps/components/biometric-verification/biometric-verification.component';
import { ConfirmDeviceRegistrationComponent } from '../auth-steps/components/confirm-device-registration/confirm-device-registration.component';
import { BiometricVerificationFailedComponent } from '../auth-steps/components/biometric-verification-failed/biometric-verification-failed.component';
import { RegisteringDeviceComponent } from '../auth-steps/components/registering-device/registering-device.component';
import { RegisteringDeviceErrorComponent } from '../auth-steps/components/registering-device-error/registering-device-error.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [forgotPasswordGuard],
    children: []
  },
  {
    path: 'fill-secure-data',
    resolve: { data: ForgotPasswordResolver },
    component: FillSecureDataComponent
  },
  {
    path: 'user-does-not-exists',
    redirectTo: '/request-products'
  },
  {
    path: 'request-input-otp-from-another-channel',
    resolve: { data: ForgotPasswordResolver },
    component: FillOtpComponent
  },
  {
    path: 'request-product-validation',
    resolve: { data: ForgotPasswordResolver },
    component: RequestProductValidationComponent
  },
  {
    path: 'inactive-channel',
    resolve: { data: ForgotPasswordResolver },
    component: InactiveChannelScreenComponent
  },
  {
    path: 'fill-new-universal-password',
    resolve: { data: ForgotPasswordResolver },
    component: FillUniversalPasswordComponent
  },
  {
    path: 'fill-otp-data',
    resolve: { data: ForgotPasswordResolver },
    component: FillOtpDataComponent
  },
  {
    path: 'confirm-user-permissions',
    resolve: { data: ForgotPasswordResolver },
    component: NotificationPermissionsComponent
  },
  {
    path: 'select-product-type',
    resolve: { data: ForgotPasswordResolver },
    component: SelectProductTypeComponent
  },
  {
    path: 'confirm-process-start',
    resolve: { data: ForgotPasswordResolver },
    component: ConfirmProcessStartComponent
  },
  {
    path: 'completed',
    resolve: { data: ForgotPasswordResolver },
    component: AuthStepCompletedComponent
  },

  {
    path: 'biometric-verification',
    resolve: { data: ForgotPasswordResolver },
    component: BiometricVerificationComponent
  },
  {
    path: 'biometric-verification-failed',
    resolve: { data: ForgotPasswordResolver },
    component: BiometricVerificationFailedComponent
  },
  {
    path: 'registering-device',
    resolve: { data: ForgotPasswordResolver },
    component: RegisteringDeviceComponent
  },
  {
    path: 'registering-device-error',
    resolve: { data: ForgotPasswordResolver },
    component: RegisteringDeviceErrorComponent
  },
  {
    path: 'confirm-device-registration',
    resolve: { data: ForgotPasswordResolver },
    component: ConfirmDeviceRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {}
