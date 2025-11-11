import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingActivateVirtualCreditCardPage } from './onboarding-activate-virtual-credit-card.page';
import {
  VirtualCreditCardGuardCanActivate,
  VirtualCreditCardGuardCanDeactivate
} from '@modules/virtual-credit-card/guards/virtual-credit-card.guard';

const routes: Routes = [
  {
    path: '',
    component: OnboardingActivateVirtualCreditCardPage,
    canActivate: [VirtualCreditCardGuardCanActivate],
    canDeactivate: [VirtualCreditCardGuardCanDeactivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingActivateVirtualCreditCardPageRoutingModule {}
