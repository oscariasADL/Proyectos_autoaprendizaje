import { Routes } from '@angular/router';
import { AuthGuard } from '@commons/guards/auth.guard';
import { LoginGuard } from '@commons/guards/login.guard';
import { RouterGuard } from '@commons/guards/router.guard';

export const ROOT_ROUTES: Routes = [
  {
    path: 'remotes',
    loadChildren: () =>
      import('projects/bavv-mb-frontend-shell/src/app/app.module').then(
        (m) => m.ShellAppModule
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutPageModule),
    canActivate: [AuthGuard],
    canActivateChild: [RouterGuard]
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./modules/onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      )
  },
  {
    path: 'new-update',
    loadChildren: () =>
      import('./modules/new-update/new-update.module').then(
        (m) => m.NewUpdatePageModule
      )
  },
  {
    path: 'care-channels',
    loadChildren: () =>
      import('./modules/care-channels/care-channels.module').then(
        (m) => m.CareChannelsPageModule
      )
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./modules/support/support.module').then((m) => m.SupportModule)
  },
  {
    path: 'request-products',
    loadChildren: () =>
      import(
        './modules/products/pages/request-products/request-products.module'
      ).then((m) => m.RequestProductsPageModule)
  },
  {
    path: 'logout-by-inactivity',
    loadChildren: () =>
      import(
        './commons/components/logout-by-inactivity/logout-by-inactivity.module'
      ).then((m) => m.LogoutByInactivityPageModule)
  },
  {
    path: 'qr/authorization',
    loadChildren: () =>
      import(
        './modules/qr/pages/qr-authorization/qr-authorization.module'
      ).then((m) => m.QrAuthorizationPageModule)
  },
  {
    path: 'no-products-error',
    loadComponent: () =>
      import(
        './modules/product/components/product-no-products-error/product-no-products-error.component'
      ).then((c) => c.ProductNoProductsErrorComponent)
  },
  {
    path: 'offline',
    loadComponent: () =>
      import('./commons/components/offline/offline.component').then(
        (c) => c.OfflineComponent
      )
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
