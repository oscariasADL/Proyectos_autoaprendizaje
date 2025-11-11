import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { ACTIVATE_TCV } from '../activate-virtual-credit-card/constants/activate-virtual-credit-card.constants';

@Component({
  selector: 'app-onboarding-activate-virtual-credit-card',
  templateUrl: './onboarding-activate-virtual-credit-card.page.html',
  styleUrls: ['./onboarding-activate-virtual-credit-card.page.sass']
})
export class OnboardingActivateVirtualCreditCardPage {
  public readonly activeTCVUtag: UtagEvent = ACTIVATE_TCV;
  public readonly franchiseCardImage$: Observable<string> =
    this.facade.productSelected$.pipe(
      filter((product: ProductDetail) => !!product),
      map(
        (product: ProductDetail) =>
          `virtual-credit-card/virtual-credit-card-${product.franchise.toLowerCase()}.png`
      )
    );

  constructor(private facade: VirtualCreditCardFacade) {}

  public showFrequentQuestions(): void {
    this.facade.showFrequentQuestions();
  }
}
