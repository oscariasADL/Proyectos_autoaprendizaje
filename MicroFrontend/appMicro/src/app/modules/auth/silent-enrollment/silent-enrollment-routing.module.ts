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
import { RequestProductValidationComponent } from '@modules/auth/auth-steps/components/request-product-validation/request-product-validation.component';
import { SilentEnrollmentGuard } from './guards/silent-enrollment.guard';
import { SilentEnrollmentResolver } from './guards/silent-enrollment.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate: [SilentEnrollmentGuard],
    children: []
  },
  {
    path: 'request-input-otp-from-another-channel',
    resolve: { data: SilentEnrollmentResolver },
    component: FillOtpComponent
  },
  {
    path: 'fill-otp-data',
    resolve: { data: SilentEnrollmentResolver },
    component: FillOtpDataComponent
  },
  {
    path: 'fill-new-universal-password',
    resolve: { data: SilentEnrollmentResolver },
    component: FillUniversalPasswordComponent
  },
  {
    path: 'fill-secure-data',
    resolve: { data: SilentEnrollmentResolver },
    component: FillSecureDataComponent
  },
  {
    path: 'fill-current-channel-password',
    resolve: { data: SilentEnrollmentResolver },
    component: FillCurrentPasswordComponent
  },
  {
    path: 'confirm-device-registration',
    resolve: { data: SilentEnrollmentResolver },
    component: ConfirmDeviceRegistrationComponent
  },
  {
    path: 'request-product-validation',
    resolve: { data: SilentEnrollmentResolver },
    component: RequestProductValidationComponent
  },
  {
    path: 'inactive-channel',
    resolve: { data: SilentEnrollmentResolver },
    component: InactiveChannelScreenComponent
  },
  {
    path: 'confirm-user-permissions',
    resolve: { data: SilentEnrollmentResolver },
    component: NotificationPermissionsComponent
  },
  {
    path: 'user-does-not-exists',
    redirectTo: '/request-products'
  },
  {
    path: 'completed',
    resolve: { data: SilentEnrollmentResolver },
    component: AuthStepCompletedComponent
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
export class SilentEnrollmentRoutingModule {}
