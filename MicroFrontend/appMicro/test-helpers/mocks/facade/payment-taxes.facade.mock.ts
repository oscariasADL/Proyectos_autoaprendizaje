import { Injectable } from '@angular/core';
import {
  AgreementDetail,
  AgreementTaxes,
  CityPaymentTaxes,
  PaymentsReferenceValueRequest,
  PaymentTaxesRequest
} from '@modules/payments/payment-taxes/entities/payment-taxes.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class PaymentTaxesFacadeMock extends AppFacadeMock {
  public cities$: Observable<CityPaymentTaxes[]> = new BehaviorSubject([]);

  public errorCities$: Observable<boolean> = new BehaviorSubject(false);

  public workingCities$: Observable<boolean> = new BehaviorSubject(false);

  public agreements$: Observable<AgreementTaxes[]> = new BehaviorSubject([]);

  public workingAgreements$: Observable<boolean> = new BehaviorSubject(false);

  public errorAgreements$: Observable<boolean> = new BehaviorSubject(false);

  public agreementDetail$: Observable<AgreementDetail> = new BehaviorSubject(
    null
  );

  public workingAgreementDetail$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public completedAgreementDetail$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchCities(): void {}

  public fetchAgreements(city: string): void {}

  public fetchReferenceValue(payload: PaymentsReferenceValueRequest): void {}

  public fetchReferenceValueSuccess(payload: AgreementDetail): void {}

  public cleanReferenceDetail(): void {}

  public makePayment(payload: PaymentTaxesRequest, data: AlertStepData): void {}
}
