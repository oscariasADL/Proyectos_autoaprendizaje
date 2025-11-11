import { Injectable } from '@angular/core';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { Product } from '@commons/entities/product/product.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';
import { ProductFactory } from '@testing/factories/product.factory';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class TransfiyaAuthorizationsFacadeMock extends AppFacadeMock {
  public products$: Observable<Product[]> = new BehaviorSubject([
    new ProductFactory().create()
  ]);

  public getTransfiyaNotificationById$(
    id: number
  ): Observable<TransfiyaAuthorizationItem> {
    return of(null);
  }

  public sendTransfiyaAuthorization(
    payload: TransfiyaPayload,
    data: AlertStepData,
    isRequest: boolean
  ): void {}

  public rejectTransfiyaAuthorization(
    payload: TransfiyaPayload,
    data: AlertStepData,
    isRequest: boolean
  ): void {}
}
