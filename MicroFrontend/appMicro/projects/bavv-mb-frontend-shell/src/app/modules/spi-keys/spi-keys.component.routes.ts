import { Routes } from '@angular/router';
import { SpiKeysMFComponent } from './spi-keys.component';
import { startsWith } from '@angular-architects/module-federation-tools';

export const SPI_KEYS_ROUTES: Routes = [
  {
    path: '',
    matcher: startsWith('spi'),
    component: SpiKeysMFComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
