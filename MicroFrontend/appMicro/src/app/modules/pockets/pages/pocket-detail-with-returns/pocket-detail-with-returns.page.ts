import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  POCKETS_PAY,
  POCKETS_TRANSFER,
  POCKETS_WITH_RETURNS_EDIT
} from '@commons/constants/navigate.constants';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { IonContent, NavController } from '@ionic/angular';
import {
  POCKET_WITH_RETURNS_ACTIONS,
  PocketAction,
  PocketActionType
} from '@modules/pockets/entities/pocket-action.interface';
import {
  PERIODICITY_LABEL,
  PERIODICITY_VALUE,
  Pocket,
  PocketStatus,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { Tab } from '@modules/pockets/components/tabs/tabs.component';
import { TranslateService } from '@ngx-translate/core';

import { Observable, combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { PocketDetailWithReturnsFacade } from './pocket-detail-with-returns.facade';

@Component({
  selector: 'app-pocket-detail-with-returns',
  templateUrl: './pocket-detail-with-returns.page.html',
  styleUrls: ['./pocket-detail-with-returns.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PocketDetailWithReturnsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public actions: PocketAction[] = POCKET_WITH_RETURNS_ACTIONS;
  public readonly featureFlagsKey = FeatureFlagsKey;
  public tabs$: Observable<Tab[]> = combineLatest([
    this.translate.get('POCKET_WITH_RETURNS.POCKET_DETAIL.TABS.POCKET_DETAIL'),
    this.translate.get(
      'POCKET_WITH_RETURNS.POCKET_DETAIL.TABS.MOVEMENTS_TITLE'
    ),
    this.facade.isFeatureFlagEnabled(FeatureFlagsKey.BiometricsEnrollment)
  ]).pipe(
    map(([tab1Label, tab2Label, isMovementsDisabled]) => [
      { label: tab1Label, disabled: false },
      { label: tab2Label, disabled: isMovementsDisabled }
    ])
  );

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private facade: PocketDetailWithReturnsFacade,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchPocketDetail();
  }

  ionViewWillEnter(): void {
    this.content.scrollToTop(0).then();
  }

  public ionViewWillLeave(): void {
    this.facade.closeToast();
  }

  public closePocketDetail(): void {
    this.navCtrl.pop();
  }

  public runAction(action: PocketActionType): void {
    const pocket = this.pocket$.currentValue() as PocketWithReturns;
    let url: string[];
    switch (action) {
      case PocketActionType.Pay:
        url = [...POCKETS_PAY, pocket.pocketType];
        void this.navCtrl.navigateForward(url);
        break;
      case PocketActionType.Modify:
        this.navCtrl.navigateForward(POCKETS_WITH_RETURNS_EDIT);
        break;
      case PocketActionType.Transfer:
        url = [...POCKETS_TRANSFER, pocket.pocketType];
        void this.navCtrl.navigateForward(url);
        break;
      case PocketActionType.Remove:
        this.facade.deletePocket(this.pocket$.currentValue());
        break;
    }
  }

  private fetchPocketDetail(): void {
    const params = this.route.snapshot.params;
    this.facade.fetchPocketDetail({
      pocketId: params.number,
      pocketType: params.type,
      parentId: params.id_parent,
      parentIdType: params.type_parent
    });
  }

  get periodicity$(): Observable<string> {
    return this.facade.pocket$.pipe(
      filter((pocket: Pocket) => !isNullOrUndefinedOrEmpty(pocket?.period)),
      map(
        (pocket: Pocket) =>
          PERIODICITY_LABEL[PERIODICITY_VALUE[pocket.period.toUpperCase()]]
      )
    );
  }

  get urlParams(): Params {
    return this.route.snapshot.params;
  }

  get pocket$(): Observable<PocketWithReturns> {
    return this.facade.pocket$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get pocketStatus(): typeof PocketStatus {
    return PocketStatus;
  }

  get pocketActionType(): typeof PocketActionType {
    return PocketActionType;
  }
}
