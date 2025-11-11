import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TransfersTrustRelationService } from '@modules/transfers/pages/transfers-trust-relation/service/transfers-trust-relation.service';
import * as actions from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  mapTransfersTrustRelationRemoveError,
  mapTransfersTrustRelationRemoveToast
} from '@modules/transfers/pages/transfers-trust-relation/mappers/transfers-trust-relation-remove.mapper';

@Injectable()
export class TransfersTrustRelationEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: TransfersTrustRelationService
  ) {}

  fetchTrustRelationsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTrustRelationsAction),
      switchMap((action) =>
        this.service.fetchTrustRelations(action.product).pipe(
          map((data) => actions.fetchTrustRelationsSuccessAction({ data })),
          catchError((message) =>
            of(actions.fetchTrustRelationsErrorAction({ message }))
          )
        )
      )
    )
  );

  removeTrustRelationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeTrustRelationAction),
      switchMap((action) =>
        this.service.removeTrustRelation(action.payload).pipe(
          mergeMap((data) => [
            actions.removeTrustRelationSuccessAction({
              props: mapTransfersTrustRelationRemoveToast()
            }),
            actions.fetchTrustRelationsAction({ product: action.product })
          ]),
          catchError((message) =>
            of(
              actions.removeTrustRelationErrorAction({
                props: mapTransfersTrustRelationRemoveError(message)
              })
            )
          )
        )
      )
    )
  );
}
