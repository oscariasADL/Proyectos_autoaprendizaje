import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  Observable,
  takeWhile,
  switchMap,
  from,
  map,
  filter,
  Subscription
} from 'rxjs';

import { AlertService } from '@commons/services/alert.service';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import {
  DigitalCardStructureExt,
  GroupedDigitalCards
} from '@modules/wallets/entities/wallets.interface';
import { srcImgFranchise } from '@modules/product/helpers/product.helper';
import {
  mapGroupDigitalCards,
  showContinueWalletProcessAlert
} from '@modules/wallets/pages/wallet-card-list/helpers/wallet-card-list.helper';
import { Platform } from '@commons/constants/global.constants';
import { removeSubscriptions } from '@commons/utils/util';

@Component({
  selector: 'app-wallet-card-list',
  templateUrl: './wallet-card-list.page.html',
  styleUrls: ['./wallet-card-list.page.sass']
})
export class WalletCardListPage implements OnInit, OnDestroy {
  public readonly platform = Platform;
  public readonly SKELETON_ARRAY = new Array(7).fill(0);
  private subscriptions: Subscription[] = [];
  public walletCardListGroup$: Observable<GroupedDigitalCards[]> =
    this.facade.walletCardList$.pipe(
      filter((digitalCards) => digitalCards.length > 0),
      map(mapGroupDigitalCards)
    );

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private digitalWalletContextService: DigitalWalletContextService,
    private facade: WalletsFacade
  ) {}

  ngOnInit() {
    this.facade.fetchCardList();
    this.initTokenizationByParam();
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
    this.facade.closeToast();
  }

  public getSrcImgFranchise(cardNumber: string): string {
    return srcImgFranchise(cardNumber);
  }

  public async pushCard(digitalCard: DigitalCardStructureExt): Promise<void> {
    if (!digitalCard.canPushCardInWalletPay) return;

    const response = await this.alertService.create(
      showContinueWalletProcessAlert(this.currentPlatform)
    );
    if (response) {
      this.facade.validateAndPushCardAction(digitalCard.id);
    }
  }

  private initTokenizationByParam() {
    const { id, typeAccount } = this.activatedRoute.snapshot.queryParams || {};
    if (!id || !typeAccount) return;

    const product = this.facade.getProduct(typeAccount, id);
    if (!product) return;

    this.subscriptions.push(
      this.facade.walletCardList$
        .pipe(
          takeWhile(
            (cards: DigitalCardStructureExt[]) => cards.length === 0,
            true
          ),
          filter((cards: DigitalCardStructureExt[]) => cards.length > 0),
          switchMap((digitalCards: DigitalCardStructureExt[]) =>
            from(
              this.digitalWalletContextService.getDigitalCardId({
                cardId: product.idUM
              })
            ).pipe(
              map(({ digitalCardId }) =>
                digitalCards.find((card) => card.id === digitalCardId)
              )
            )
          )
        )
        .subscribe((digitalCard) => {
          if (digitalCard) {
            void this.pushCard(digitalCard);
          }
        })
    );
  }

  get walletCardList$(): Observable<DigitalCardStructureExt[]> {
    return this.facade.walletCardList$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get currentPlatform(): string {
    return Capacitor.getPlatform();
  }
}
