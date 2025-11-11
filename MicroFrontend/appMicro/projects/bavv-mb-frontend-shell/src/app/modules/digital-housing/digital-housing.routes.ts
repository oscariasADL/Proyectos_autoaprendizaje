import { Routes } from '@angular/router';
import { DigitalHousingComponent } from './digital-housing.component';
import { startsWith } from '@angular-architects/module-federation-tools';

export const DIGITAL_HOUSING_ROUTES: Routes = [
  {
    path: '',
    matcher: startsWith('vivienda-digital'),
    component: DigitalHousingComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
