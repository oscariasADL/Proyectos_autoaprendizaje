import { Routes } from '@angular/router';
import { CreditCardComponent } from './credit-card.component';
import { startsWith } from '@angular-architects/module-federation-tools';

export const CREDIT_CARD_ROUTES: Routes = [
  {
    path: '',
    matcher: startsWith('tarjeta-credito'),
    component: CreditCardComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
