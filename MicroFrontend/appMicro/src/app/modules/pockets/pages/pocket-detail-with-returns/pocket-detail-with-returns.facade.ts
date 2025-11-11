import { Injectable, Type } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  Pocket,
  PocketTypeEnum,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { PocketWithReturnsDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import {
  pocketDetailWithReturnsCompletedSelector,
  pocketDetailWithReturnsSelector,
  pocketDetailWithReturnsWorkingSelector,
  pocketWithReturnsMovementsCompletedSelector,
  pocketWithReturnsMovementsSelector,
  pocketWithReturnsMovementsWorkingSelector
} from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.selector';
import { select } from '@ngrx/store';
import { map, Observable, withLatestFrom } from 'rxjs';
import { AlertService } from '@app/commons/services/alert.service';
import {
  mapAutoRates,
  mapAutoRenewCapital,
  mapDeletePocketAlert,
  mapPocketWithReturnsStatusAlert,
  PocketModificationType
} from './mappers/pocket-wit-returns.mapper';
import { PocketMovementPayload } from '../pocket-movements/entities/pocket-movements.interface';
import {
  fetchPocketWithReturnsDetailAction,
  fetchPocketWithReturnsMovementsAction,
  pocketWithReturnsDeleteAction,
  updatePocketWithReturnsStatusAction
} from './store/pocket-detail-with-returns.actions';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';
import {
  PocketDetailPayload,
  UpdatePocketWithReturnsPayload
} from './entities/pocket-detail.interface';
import { mapPocketDetailPayload } from '../../helpers/pocket.helpers';

import { productsSelector } from '@app/modules/product/store/product.selector';
import { Product } from '@app/commons/entities/product/product.interface';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';

@Injectable()
export class PocketDetailWithReturnsFacade extends AppFacade {
  private alertService: AlertService = this.injector.get<AlertService>(
    AlertService as Type<AlertService>
  );

  public pocket$: Observable<PocketWithReturns> = this.store.pipe(
    select(pocketDetailWithReturnsSelector)
  );

  public product$: Observable<Product> = this.store.pipe(
    select(productsSelector()),
    withLatestFrom(this.pocket$),
    map(([products, pocket]) =>
      products?.find(
        (product: Product) =>
          product.id.toString() === pocket.productIdParent.toString()
      )
    )
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(pocketDetailWithReturnsWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(pocketDetailWithReturnsCompletedSelector)
  );

  public fetchPocketDetail(payload: PocketWithReturnsDetailPayload): void {
    this.store.dispatch(fetchPocketWithReturnsDetailAction({ payload }));
  }

  public updatePocket(
    pocket: PocketWithReturns,
    alertMapping: (pocket: PocketWithReturns) => AlertSheetProperties,
    pocketModificationType: PocketModificationType
  ): void {
    this.closeToast();
    this.alertService.create(alertMapping(pocket)).then((confirm) => {
      if (confirm) {
        const payload: UpdatePocketWithReturnsPayload =
          this.createPayload(pocket);

        this.updatePocketWithReturns(payload, pocketModificationType);
      }
    });
  }

  private createPayload(
    pocket: PocketWithReturns
  ): UpdatePocketWithReturnsPayload {
    return {
      id: pocket.numberProduct,
      name: pocket.description,
      goal: pocket.goal,
      quota: pocket.instalmentAmount,
      pocketCategory: pocket.pocketCategory,
      period: pocket.period.toUpperCase(),
      productIdParent: pocket.productIdParent,
      productTypeParent: pocket.productTypeParent,
      renewAutomatically: pocket.renewAutomatically,
      renewProfits: pocket.renewProfits,
      pocketType: PocketTypeEnum.PocketWithReturns,
      status: pocket.status,
      type: pocket.type
    };
  }

  public updatePocketWithReturnsStatus(pocket: PocketWithReturns): void {
    this.updatePocket(
      pocket,
      mapPocketWithReturnsStatusAlert,
      PocketModificationType.Status
    );
  }

  public updateAutoRenewal(pocket: PocketWithReturns): void {
    this.updatePocket(
      pocket,
      mapAutoRenewCapital,
      PocketModificationType.AutoRenewal
    );
  }

  public updateAutoRates(pocket: PocketWithReturns): void {
    this.updatePocket(pocket, mapAutoRates, PocketModificationType.AutoRates);
  }

  public updatePocketWithReturns(
    payload: UpdatePocketWithReturnsPayload,
    pocketModificationType: PocketModificationType
  ): void {
    this.store.dispatch(
      updatePocketWithReturnsStatusAction({ payload, pocketModificationType })
    );
  }

  public movements$: Observable<PocketMovement[]> = this.store.pipe(
    select(pocketWithReturnsMovementsSelector)
  );
  public workingMovements$: Observable<boolean> = this.store.pipe(
    select(pocketWithReturnsMovementsWorkingSelector)
  );

  public completedMovements$: Observable<boolean> = this.store.pipe(
    select(pocketWithReturnsMovementsCompletedSelector)
  );

  public fetchPocketMovements(payload: PocketMovementPayload): void {
    this.store.dispatch(fetchPocketWithReturnsMovementsAction({ payload }));
  }

  public deletePocket(pocket: PocketWithReturns): void {
    this.closeToast();
    this.alertService.create(mapDeletePocketAlert()).then((confirm) => {
      if (!!confirm) {
        this.deletePocketWithReturns(mapPocketDetailPayload(pocket));
      }
    });
  }

  private deletePocketWithReturns(payload: PocketDetailPayload): void {
    this.store.dispatch(pocketWithReturnsDeleteAction({ payload }));
  }
}
