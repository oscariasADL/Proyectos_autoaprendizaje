import { Routes } from '@angular/router';
import { PersonalLoanComponent } from './personal-loan.component';
import { startsWith } from '@angular-architects/module-federation-tools';

export const PERSONAL_LOAN_ROUTES: Routes = [
  {
    path: '',
    matcher: startsWith('libre-inversion'),
    component: PersonalLoanComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
