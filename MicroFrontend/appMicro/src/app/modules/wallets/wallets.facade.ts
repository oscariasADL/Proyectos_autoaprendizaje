import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppFacade } from '@app/app.facade';
import {
  CardDetail,
  DigitalCardStructureExt
} from './entities/wallets.interface';
import {
  completedSelector,
  cardListSelector,
  workingSelector,
  walletIdSelector,
  walletCardListSelector
} from '@modules/wallets/store/wallets.selector';
import * as actions from '@modules/wallets/store/wallets.actions';
import { CardCromalineMap } from '@store/state/parameter.state';
import { cardCromalineMapParameterSelector } from '@store/selectors/parameter.selector';

@Injectable()
export class WalletsFacade extends AppFacade {
  public cardList$: Observable<CardDetail[]> = this.store.pipe(
    select(cardListSelector)
  );

  public walletCardList$: Observable<DigitalCardStructureExt[]> =
    this.store.pipe(select(walletCardListSelector));

  public working$: Observable<boolean> = this.store.pipe(
    select(workingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(completedSelector)
  );

  public walletId$: Observable<string> = this.store.pipe(
    select(walletIdSelector)
  );

  public fetchCardList(): void {
    this.store.dispatch(actions.fetchCardListAction());
  }

  public setWalletId(walletId: string): void {
    this.store.dispatch(actions.setWalletIdAction({ walletId }));
  }

  public validateAndPushCardAction(digitalCardId: string): void {
    this.store.dispatch(actions.validateAndPushCardAction({ digitalCardId }));
  }

  public cardCromalineMapByBin(bin: string): Observable<CardCromalineMap> {
    return this.store.pipe(
      select(cardCromalineMapParameterSelector),
      map((list: any) =>
        list.find((item: CardCromalineMap) => item.bin === bin)
      )
    );
  }
}
