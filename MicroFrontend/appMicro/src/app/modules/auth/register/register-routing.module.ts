import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStepCompletedComponent } from '@modules/auth/auth-steps/components/auth-step-completed/auth-step-completed.component';
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
import { registerGuard } from '@modules/auth/register/guards/register.guard';
import { RegisterResolver } from '@modules/auth/register/guards/register.resolver';
import { SelectProductTypeComponent } from '@modules/auth/auth-steps/components/select-product-type/select-product-type.component';
import { BiometricVerificationComponent } from '../auth-steps/components/biometric-verification/biometric-verification.component';
import { BiometricVerificationFailedComponent } from '../auth-steps/components/biometric-verification-failed/biometric-verification-failed.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [registerGuard],
    children: []
  },
  {
    path: 'request-input-otp-from-another-channel',
    resolve: { data: RegisterResolver },
    component: FillOtpComponent
  },
  {
    path: 'fill-otp-data',
    resolve: { data: RegisterResolver },
    component: FillOtpDataComponent
  },
  {
    path: 'fill-new-universal-password',
    resolve: { data: RegisterResolver },
    component: FillUniversalPasswordComponent
  },
  {
    path: 'fill-secure-data',
    resolve: { data: RegisterResolver },
    component: FillSecureDataComponent
  },
  {
    path: 'fill-current-channel-password',
    resolve: { data: RegisterResolver },
    component: FillCurrentPasswordComponent
  },
  {
    path: 'confirm-device-registration',
    resolve: { data: RegisterResolver },
    component: ConfirmDeviceRegistrationComponent
  },
  {
    path: 'inactive-channel',
    resolve: { data: RegisterResolver },
    component: InactiveChannelScreenComponent
  },
  {
    path: 'request-product-validation',
    resolve: { data: RegisterResolver },
    component: RequestProductValidationComponent
  },
  {
    path: 'registering-device',
    resolve: { data: RegisterResolver },
    component: RegisteringDeviceComponent
  },
  {
    path: 'registering-device-error',
    resolve: { data: RegisterResolver },
    component: RegisteringDeviceErrorComponent
  },
  {
    path: 'biometric-verification',
    resolve: { data: RegisterResolver },
    component: BiometricVerificationComponent
  },
  {
    path: 'confirm-user-permissions',
    resolve: { data: RegisterResolver },
    component: NotificationPermissionsComponent
  },
  {
    path: 'select-product-type',
    resolve: { data: RegisterResolver },
    component: SelectProductTypeComponent
  },
  {
    path: 'completed',
    resolve: { data: RegisterResolver },
    component: AuthStepCompletedComponent
  },
  {
    path: 'biometric-verification-failed',
    resolve: { data: RegisterResolver },
    component: BiometricVerificationFailedComponent
  },
  {
    path: 'user-does-not-exists',
    redirectTo: '/request-products'
  },
  {
    path: 'redirect-to-login',
    redirectTo: 'completed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
