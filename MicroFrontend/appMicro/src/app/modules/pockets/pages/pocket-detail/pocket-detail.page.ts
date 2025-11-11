import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  POCKETS_EDIT,
  POCKETS_MOVEMENTS,
  POCKETS_PAY,
  POCKETS_TRANSFER
} from '@commons/constants/navigate.constants';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import {
  POCKET_ACTIONS,
  PocketAction,
  PocketActionType
} from '@modules/pockets/entities/pocket-action.interface';
import {
  PERIODICITY_LABEL,
  PERIODICITY_VALUE,
  Pocket,
  PocketStatus
} from '@modules/pockets/entities/pockets.interface';
import { PocketDeleteFacade } from '@modules/pockets/pages/pocket-delete/pocket-delete.facade';
import { PocketDetailFacade } from '@modules/pockets/pages/pocket-detail/pocket-detail.facade';
import { PocketStatusFacade } from '@modules/pockets/pages/pocket-status/pocket-status.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { NotificationTypeEnum } from '@commons/components/notification/constants/notification.constants';
import { Tab } from '../../components/tabs/tabs.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pocket-detail',
  templateUrl: './pocket-detail.page.html',
  styleUrls: ['./pocket-detail.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PocketDetailPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public actions: PocketAction[] = POCKET_ACTIONS;
  public readonly featureFlagsKey = FeatureFlagsKey;
  protected readonly PocketActionType = PocketActionType;

  public tabs$: Observable<Tab[]> = combineLatest([
    this.translate.get('POCKET_WITH_RETURNS.POCKET_DETAIL.TABS.POCKET_DETAIL'),
    this.translate.get(
      'POCKET_WITH_RETURNS.POCKET_DETAIL.TABS.MOVEMENTS_TITLE'
    ),
    this.facade.isFeatureFlagEnabled(FeatureFlagsKey.PocketsMovements)
  ]).pipe(
    map(([tab1Label, tab2Label, isMovementsDisabled]) => [
      { label: tab1Label, disabled: false },
      { label: tab2Label, disabled: isMovementsDisabled }
    ])
  );

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private facade: PocketDetailFacade,
    private facadeStatus: PocketStatusFacade,
    private facadeDelete: PocketDeleteFacade,
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
    const pocket = this.pocket$.currentValue() as Pocket;
    let url: string[];
    switch (action) {
      case PocketActionType.Pay:
        url = [...POCKETS_PAY, pocket.pocketType];
        void this.navCtrl.navigateForward(url);
        break;
      case PocketActionType.Transfer:
        url = [...POCKETS_TRANSFER, pocket.pocketType];
        void this.navCtrl.navigateForward(url);
        break;
      case PocketActionType.Modify:
        this.navCtrl.navigateForward(POCKETS_EDIT);
        break;
      case PocketActionType.Movements:
        this.navCtrl.navigateForward([
          ...POCKETS_MOVEMENTS,
          pocket.productIdParent,
          pocket.numberProduct
        ]);
        break;
      case PocketActionType.Remove:
        this.facadeDelete.deletePocketConfirm(this.pocket$.currentValue());
        break;
      case PocketActionType.ChangeStatus:
        this.facadeStatus.updatePocketConfirm(this.pocket$.currentValue());
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

  get pocket$(): Observable<Pocket> {
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

  get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }
}
