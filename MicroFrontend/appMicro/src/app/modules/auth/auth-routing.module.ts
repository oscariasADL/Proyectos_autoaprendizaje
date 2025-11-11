import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      )
  },
  {
    path: 'silent-enrollment',
    loadChildren: () =>
      import('./silent-enrollment/silent-enrollment.module').then(
        (m) => m.SilentEnrollmentModule
      )
  },
  {
    path: 'update-password',
    loadChildren: () =>
      import('./update-password/update-password.module').then(
        (m) => m.UpdatePasswordPageModule
      )
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
