import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateProductComponent } from './components/activate-product/activate-product.component';
import { MediaActivationHomeComponent } from './components/media-activation-home/media-activation-home.component';
import { SecurityMediaActivationPage } from './security-media-activation.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityMediaActivationPage,
    children: [
      {
        path: '',
        component: MediaActivationHomeComponent
      },
      {
        path: 'activate-product/:id',
        component: ActivateProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityMediaActivationPageRoutingModule {}
