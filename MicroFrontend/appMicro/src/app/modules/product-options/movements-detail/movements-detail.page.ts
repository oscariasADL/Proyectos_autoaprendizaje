import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCT_DETAIL } from '@commons/constants/navigate.constants';
import {
  FilterMove,
  Movement
} from '@commons/entities/product/movement.interface';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { movementFilters } from '@modules/movement/constants/movement.constants';
import {
  MovementsDetailPayload,
  MovementsDetailPayloadParams
} from '@modules/movement/entities/movements-detail-payload.entity';
import { updateIonInfiniteScroll } from '@modules/movement/mappers/movements-paginate.mapper';
import { MovementFacade } from '@modules/movement/movement.facade';
import { InfiniteScrollService } from '@modules/movement/services/infinite-scroll.service';
import { parseISO } from 'date-fns';
import { Observable, Subscription } from 'rxjs';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { distinct, filter, map, withLatestFrom } from 'rxjs/operators';
import { removeSubscriptions } from '@commons/utils/util';
import {
  areTherePFMMovements,
  showPFMInAccount
} from '@modules/pfm/helpers/pfm.helpers';
import {
  MovementsByCategory,
  PFMBalance,
  PFMChangeCategoryPayload,
  PFMExpenseIncomeCategories,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { TypeAccount } from '@commons/entities/product/type-account';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { GroupedMovements } from '@modules/product-detail/entities/groups-movement.entity';
import { groupMovementsByDate } from '@commons/utils/group-movements-by-date';

@Component({
  selector: 'app-movements-detail',
  templateUrl: './movements-detail.page.html',
  styleUrls: ['./movements-detail.page.sass']
})
export class MovementsDetailPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public date: Date;
  public showFab: boolean = false;
  public movementsFilters = movementFilters(this.accountType);
  public movements$: Observable<GroupedMovements[]> =
    this.facade.movementsHistoryResults$.pipe(
      map((movements) => groupMovementsByDate(movements))
    );
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private facade: MovementFacade,
    private pfmFacade: PFMFacade,
    private infiniteScrollService: InfiniteScrollService
  ) {}

  ngOnInit(): void {
    this.date = parseISO(this.facade.date$.currentValue());
    this.subscriptions.push(
      this.payload$
        .pipe(
          filter(() =>
            showPFMInAccount(
              this.route.snapshot.params.type,
              Boolean(this.facade.featureFlagsByKey(FeatureFlagsKey.PFM))
            )
          ),
          filter((payload) => payload.params.state === FilterMove.All),
          map((payload) => ({
            accountId: payload.id,
            startDate: payload.params.startDate,
            endDate: payload.params.endDate
          })),
          distinct(),
          withLatestFrom(this.pfmFacade.balancesSummary$)
        )
        .subscribe(([params, [balancesSummary]]) =>
          this.pfmFacade.fetchCategoriesOfMovements({
            ...params,
            accountId:
              balancesSummary.type === PFMProductTypeEnum.TC
                ? balancesSummary.accountNumberCreditCard
                : params.accountId,
            productType: balancesSummary.type
          })
        )
    );
  }

  ionViewDidEnter(): void {
    this.initInfiniteScroll();
  }

  ionViewDidLeave(): void {
    removeSubscriptions(this.subscriptions);
    this.facade.resetMovementsHistory();
  }

  public loadData(): void {
    this.facade.fetchMoreMovementsDetail();
  }

  public fetchMovementsWithFilters(params: MovementsDetailPayloadParams): void {
    if (
      !isNullOrUndefined(params) &&
      params.hasOwnProperty('startDate') &&
      params.hasOwnProperty('endDate')
    ) {
      this.pfmFacade.resetMovementsByCategory();
    }
    this.facade.fetchMovementsWithFilters(params);
  }

  public scrolling(event: any): void {
    if (event.detail.deltaY > 0 && !this.showFab) {
      return;
    }
    if (event.detail.deltaY < 0 && this.showFab) {
      return;
    }
    this.showFab = event.detail.deltaY <= 0;
  }

  public scrollToTop(): void {
    this.content.scrollToTop(500).then();
  }

  public fetchPFMMovementsByCategory(categoryCode: string): void {
    this.pfmFacade
      .movementsByCategory$(categoryCode)
      .pipe(
        withLatestFrom(this.payload$, this.pfmBalancesSummary$),
        filter(
          ([movements, filters]) =>
            !!!movements || (movements.length === 0 && !!filters)
        )
      )
      .subscribe(([_, filters, [balancesSummary]]) => {
        this.pfmFacade.fetchMovementsByCategory({
          accountId:
            this.accountType === TypeAccount.CCA
              ? balancesSummary.accountNumberCreditCard
              : filters.id,
          productType: balancesSummary.type,
          startDate: filters.params.startDate,
          endDate: filters.params.endDate,
          categoryCode
        });
      })
      .unsubscribe();
  }

  public changePFMCategory(payload: PFMChangeCategoryPayload): void {
    this.pfmFacade.changeCategory(payload);
  }

  private initInfiniteScroll(): void {
    this.infiniteScrollService.infiniteScroll = this.infiniteScroll;

    const data = this.facade.movementsHistory$.currentValue();

    updateIonInfiniteScroll(
      data.payload,
      data.response,
      this.infiniteScrollService.infiniteScroll
    );
  }

  get accountType(): TypeAccount {
    return this.route.snapshot.params?.type;
  }

  get credit(): boolean {
    return [TypeAccount.DLA, TypeAccount.CH].includes(this.accountType);
  }

  get monthsBackward(): number {
    return this.credit ? 12 : 3;
  }

  get titleMovements(): string {
    return this.credit
      ? 'MOVEMENTS.NOTICE_RANGE_YEAR'
      : 'MOVEMENTS.NOTICE_RANGE';
  }

  get backUrl(): string {
    return `${PRODUCT_DETAIL.toString()}/${this.route.snapshot.params.type}/${
      this.route.snapshot.params.id
    }`;
  }

  get working$(): Observable<boolean> {
    return this.facade.movementsHistoryWorking$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.movementsHistoryCompleted$;
  }

  get pfmCategoriesOfMovementsWorking(): Observable<boolean> {
    return this.pfmFacade.categoriesOfMovementsWorking$;
  }

  get pfmCategoriesOfMovementsCompleted(): Observable<boolean> {
    return this.pfmFacade.categoriesOfMovementsCompleted$;
  }

  get areTherePFMMovements$(): Observable<boolean> {
    const params = this.route.snapshot.params;
    return this.payload$.pipe(
      withLatestFrom(
        this.groupedIncomeCategories$,
        this.groupedExpenseCategories$
      ),
      filter(([filters]) => !!filters),
      map(
        ([
          filters,
          incomeCategoriesOfMovements,
          expenseCategoriesOfMovements
        ]) =>
          areTherePFMMovements(
            filters.params.state,
            incomeCategoriesOfMovements,
            expenseCategoriesOfMovements,
            this.facade.getProduct(params.type, params.id),
            Boolean(this.facade.featureFlagsByKey(FeatureFlagsKey.PFM))
          )
      )
    );
  }

  get groupedIncomeCategories$(): Observable<PFMExpenseIncomeCategories> {
    return this.pfmFacade.groupedIncomeCategories$(
      this.route.snapshot.params.id
    );
  }

  get groupedExpenseCategories$(): Observable<PFMExpenseIncomeCategories> {
    return this.pfmFacade.groupedExpenseCategories$(
      this.route.snapshot.params.id
    );
  }

  get allMovementsByCategory$(): Observable<MovementsByCategory[]> {
    return this.pfmFacade.allMovementsByCategory$;
  }

  get payload$(): Observable<MovementsDetailPayload> {
    return this.facade.movementsHistoryPayload$;
  }

  get pfmBalancesSummary$(): Observable<PFMBalance[]> {
    return this.pfmFacade.balancesSummary$;
  }
}
