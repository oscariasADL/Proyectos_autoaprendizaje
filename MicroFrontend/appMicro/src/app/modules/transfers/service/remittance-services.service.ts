import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, switchMap } from 'rxjs';
import {
  CheckCustomerResult,
  CreateCustomer,
  CreateCustomerResponse
} from '../pages/transfers-remittances/interfaces/remittance-services.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { REMITTANCES_LINK_ALERT_PROPS } from '../pages/transfers-remittances/constants/alerts';
import { Product } from '@app/commons/entities/product/product.interface';
import { CustomerRemittancesType } from '../pages/transfers-remittances/interfaces/remittance-services.interface';
import { TranslateService } from '@ngx-translate/core';
import { AppFacade } from '@app/app.facade';
@Injectable({ providedIn: 'root' })
export class RemittanceService {
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private facade: AppFacade
  ) {}
  subscriptions: Subscription[];
  public validateCustomer(): Observable<CheckCustomerResult> {
    const url = urlBuilder.services(
      ENV.api.services.remittance.customer_validate
    );
    return this.http.post<CheckCustomerResult>(url, {});
  }

  public createCustomer(
    payload: CreateCustomer
  ): Observable<CreateCustomerResponse> {
    const url = urlBuilder.services(
      ENV.api.services.remittance.register_account
    );
    return this.http.post<CreateCustomerResponse>(url, payload);
  }

  public createAndValidateCustomer(
    product: CreateCustomer
  ): Observable<CheckCustomerResult> {
    return this.createCustomer(product).pipe(
      switchMap(() => this.validateCustomer())
    );
  }

  public handleCustomerFlow(
    customerResult: CheckCustomerResult,
    product: Product
  ): Observable<CheckCustomerResult> | void {
    if (customerResult.customer === CustomerRemittancesType.A) {
      return this.translate
        .get('TRANSFERS.REMITTANCES.INFO_ALERT.NOTIFICATION_DESCRIPTION', {
          phoneNumber: customerResult.infoAccount.cellphone
        })
        .pipe(switchMap(() => this.validateCustomer()));
    }

    this.translate
      .get('TRANSFERS.REMITTANCES.INFO_ALERT.NOTIFICATION_DESCRIPTION', {
        phoneNumber: customerResult.infoAccount.cellphone
      })
      .subscribe((text) => {
        this.facade.openExternalLinks(
          `${ENV.remittancesActionsValues}${customerResult.tokenInfo.accessToken}`,
          '_blank',
          {
            ...REMITTANCES_LINK_ALERT_PROPS,
            notificationDescription: text
          },
          null,
          this.createCustomer({
            typeAccount: product.type,
            numberAccount: product.numberProduct
          })
        );
      });
  }
}
