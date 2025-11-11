import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AgreementDetail,
  AgreementTaxes,
  CityPaymentTaxes,
  PaymentsReferenceValueRequest,
  PaymentTaxesRequest
} from './entities/payment-taxes.interface';
import * as paymentTaxesActions from './store/payment-taxes.action';
import {
  agreementDetailMessageSelector,
  agreementDetailNotFoundSelector,
  agreementDetailSelector,
  agreementSelector,
  citiesSelector,
  completedAgreementDetailSelector,
  errorAgreements,
  errorCities,
  workingAgreementDetailSelector,
  workingAgreements,
  workingCities
} from './store/payment-taxes.selector';

@Injectable()
export class PaymentTaxesFacade extends AppFacade {
  public cities$: Observable<CityPaymentTaxes[]> = this.store.pipe(
    select(citiesSelector)
  );

  public errorCities$: Observable<boolean> = this.store.pipe(
    select(errorCities)
  );

  public workingCities$: Observable<boolean> = this.store.pipe(
    select(workingCities)
  );

  public agreements$: Observable<AgreementTaxes[]> = this.store.pipe(
    select(agreementSelector)
  );

  public workingAgreements$: Observable<boolean> = this.store.pipe(
    select(workingAgreements)
  );

  public errorAgreements$: Observable<boolean> = this.store.pipe(
    select(errorAgreements)
  );

  public agreementDetail$: Observable<AgreementDetail> = this.store.pipe(
    select(agreementDetailSelector)
  );

  public agreementDetailNotFound$: Observable<boolean> = this.store.pipe(
    select(agreementDetailNotFoundSelector)
  );

  public agreementDetailNotFoundMessage$: Observable<string> = this.store.pipe(
    select(agreementDetailMessageSelector)
  );

  public workingAgreementDetail$: Observable<boolean> = this.store.pipe(
    select(workingAgreementDetailSelector)
  );

  public completedAgreementDetail$: Observable<boolean> = this.store.pipe(
    select(completedAgreementDetailSelector)
  );

  public fetchCities(): void {
    this.store.dispatch(paymentTaxesActions.fetchCities());
  }

  public fetchAgreements(city: string): void {
    this.store.dispatch(paymentTaxesActions.fetchAgreements({ city }));
  }

  public fetchReferenceValue(payload: PaymentsReferenceValueRequest): void {
    this.store.dispatch(paymentTaxesActions.fetchReferenceValue({ payload }));
  }

  public fetchReferenceValueSuccess(payload: AgreementDetail): void {
    this.store.dispatch(
      paymentTaxesActions.fetchReferenceValueSuccess({ payload })
    );
  }

  public cleanReferenceDetail(): void {
    this.store.dispatch(paymentTaxesActions.cleanReferenceDetail());
  }

  public makePayment(payload: PaymentTaxesRequest, data: AlertStepData): void {
    this.store.dispatch(
      paymentTaxesActions.makePaymentTaxes({ payload, data })
    );
  }
}
