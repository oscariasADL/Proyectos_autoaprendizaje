import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  POCKETS_DETAIL,
  HOME,
  POCKETS_CREATE_ONBOARDING,
  POCKETS_WITH_RETURNS_DETAIL
} from '@commons/constants/navigate.constants';
import {
  GroupedPockets,
  Pocket,
  POCKET_CATEGORY_FILTER_LABEL,
  POCKET_TYPE_FILTER_LABEL,
  POCKET_TYPE_LABEL,
  PocketsCategories,
  PocketTypeEnum,
  PocketTypeFilter
} from '@modules/pockets/entities/pockets.interface';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { BalanceInfo } from '@commons/entities/product/balance.interface';
import { mapGroupPockets } from '@modules/pockets/pages/pockets-home/mappers/pockets-home.mapper';
import { TranslateService } from '@ngx-translate/core';
import { PocketCreateDescriptionProfitabilityComponent } from '@modules/pockets/pages/pocket-create-description-profitability/pocket-create-description-profitability.component';
import { ModalController } from '@app/commons/controllers/modal.controller';
import {
  CONSOLIDATED_QUERY_EVENT,
  CREATE_POCKET_EVENT
} from '../../constants/resume.constants';

@Component({
  selector: 'app-pockets-home',
  templateUrl: './pockets-home.page.html',
  styleUrls: ['./pockets-home.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PocketsHomePage implements OnInit {
  public readonly createPocketTag = CREATE_POCKET_EVENT;
  public readonly selectPocketTag = CONSOLIDATED_QUERY_EVENT;
  public readonly featureFlagsKey = FeatureFlagsKey;
  public readonly pocketsCreatePage: string[] = POCKETS_CREATE_ONBOARDING;
  public readonly homePage: string[] = HOME;
  public showNotification: boolean = false;
  public pocketCategorySelected: FormControl = new FormControl(
    this.pocketsCategories[0]
  );
  public pocketTypeSelected: FormControl = new FormControl(null);
  protected readonly POCKET_TYPE_LABEL = POCKET_TYPE_LABEL;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private facade: PocketsFacade
  ) {}

  ngOnInit(): void {
    this.facade.fetchPockets();
    this.getParams();
  }

  private getParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.showNotification = params.showMessage === 'true';
    });
  }

  public ionViewWillLeave(): void {
    this.facade.closeToast();
  }

  public navigateToDetail(pocket: Pocket): void {
    const pathToRedirect =
      pocket.pocketType === PocketTypeEnum.PocketWithReturns
        ? POCKETS_WITH_RETURNS_DETAIL.toString()
        : POCKETS_DETAIL.toString();

    void this.navCtrl.navigateForward([
      pathToRedirect,
      pocket.productTypeParent,
      pocket.productIdParent,
      pocket.type,
      pocket.numberProduct
    ]);
  }

  public closePage(): void {
    void this.navCtrl.pop();
  }

  public async showFinancialEducationModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      id: 'pocket-create-description-profitability-modal',
      component: PocketCreateDescriptionProfitabilityComponent,
      componentProps: {
        buttonActionText: 'ACTIONS.EXIT'
      },
      showBackdrop: false,
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    });

    await modal.present();
  }

  get ifPocketsExist$(): Observable<boolean> {
    return this.facade.pockets$.pipe(map((data) => data.pockets?.length > 0));
  }

  get pockets$(): Observable<Pocket[]> {
    return this.facade.pockets$.pipe(
      map((data) => {
        return this.pocketCategorySelected.value.value ===
          PocketsCategories.all.toUpperCase()
          ? data.pockets
          : data.pockets.filter(
              (pocket) =>
                pocket.statusName === this.pocketCategorySelected.value.value
            );
      })
    );
  }

  get groupedPockets(): Observable<GroupedPockets[]> {
    return this.pockets$.pipe(
      map(mapGroupPockets),
      map((data) => {
        if (
          !this.pocketTypeSelected.value ||
          this.pocketTypeSelected.value.value ===
            PocketTypeFilter.all.toUpperCase()
        ) {
          return data;
        }
        return data?.filter(
          (group) =>
            group.pocketType.toString() === this.pocketTypeSelected.value.value
        );
      })
    );
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get balanceInfo$(): Observable<BalanceInfo> {
    return this.facade.pockets$.pipe(
      map((data) => {
        return {
          items: [
            {
              description: PocketsCategories.active,
              amount: data.totalActive
            },
            {
              description: PocketsCategories.paused,
              amount: data.totalPaused
            },
            {
              description: PocketsCategories.completed,
              amount: data.totalCompleted
            }
          ],
          totalBalance: data.totalBalance
        };
      })
    );
  }

  get pocketsCategories(): any {
    return Object.keys(PocketsCategories)
      .filter((k) => isNaN(Number(k)))
      .map((key) => {
        return {
          label: this.translateService.instant(
            POCKET_CATEGORY_FILTER_LABEL[PocketsCategories[key]]
          ),
          value: key.toUpperCase()
        };
      });
  }

  get pocketTypes(): any {
    return Object.values(PocketTypeFilter)
      .filter((k) => isNaN(Number(k)))
      .map((value) => {
        return {
          label: this.translateService.instant(POCKET_TYPE_FILTER_LABEL[value]),
          value: value.toUpperCase()
        };
      });
  }
}
