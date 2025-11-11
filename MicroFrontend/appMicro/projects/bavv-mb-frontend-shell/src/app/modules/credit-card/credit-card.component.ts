import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { REQUEST_PRODUCTS } from '@app/commons/constants/navigate.constants';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import { AlertService } from '@app/commons/services/alert.service';
import { environment as ENV } from '@environment';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardComponent {
  options: WebComponentWrapperOptions = {
    type: 'script',
    remoteEntry: ENV.microfrontends.creditCard.remoteEntryUrl,
    exposedModule: ENV.microfrontends.creditCard.exposedModule,
    remoteName: ENV.microfrontends.creditCard.remoteName,
    elementName: ENV.microfrontends.creditCard.elementName
  };

  constructor(private alertService: AlertService, private router: Router) {}

  public async goBack() {
    const CREDIT_CARD_EXIT_DATA: AlertSheetProperties = {
      type: AlertSheetType.question,
      icon: 'billete.svg',
      id: 'credit-card-confirm-exit-alert',
      title: 'CREDIT_CARD.EXIT_ALERT.TITLE',
      description: 'CREDIT_CARD.EXIT_ALERT.DESCRIPTION',
      buttons: [
        'CREDIT_CARD.EXIT_ALERT.BUTTON_OK',
        'CREDIT_CARD.EXIT_ALERT.BUTTON_CANCEL'
      ]
    };
    const response = await this.alertService.create(CREDIT_CARD_EXIT_DATA);

    if (!response) {
      this.router.navigate(REQUEST_PRODUCTS);
    }
  }
}
