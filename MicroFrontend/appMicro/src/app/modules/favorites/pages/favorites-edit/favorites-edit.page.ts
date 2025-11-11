import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { Favorite } from '@modules/favorites/entities/favorites.interface';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesDetailFacade } from '@modules/favorites/pages/favorites-detail/favorites-detail.facade';
import { removeSubscriptions } from '@commons/utils/util';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { mapToTransferConfirm } from '@modules/favorites/pages/favorites-transfer/mappers/favorites-transfer-confirm.mapper';
import { EDITABLE_FIELDS_TO_EDIT } from '@modules/favorites/pages/favorites-edit/constants/favorites-edit.constants';
import { editFieldsFn } from '@modules/favorites/helpers/favorites-edit-fields.helper';
import {
  FAVORITE_TYPES_LABELS,
  FAVORITE_UI_CONFIG
} from '@modules/favorites/constants/favorites.contants';

@Component({
  selector: 'app-favorites-edit',
  templateUrl: './favorites-edit.page.html',
  styleUrls: ['./favorites-edit.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesEditPage implements OnInit, OnDestroy {
  public itemsConfirm$: Observable<VoucherItem[]> = new Observable();
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private translate: TranslateService,
    private facade: FavoritesFacade,
    private favoritesDetailFacade: FavoritesDetailFacade,
    private modalCtrl: ModalController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchFavorite();
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public fetchFavorite(): void {
    this.subscriptions.push(
      this.route.paramMap.pipe(take(1)).subscribe((params) => {
        if (params.has('key_favorite')) {
          this.favoritesDetailFacade.fetchFavorite(params.get('key_favorite'));
        } else {
          this.navCtrl.navigateForward('/');
        }
      }),
      this.completed$
        .pipe(
          mergeMap((completed) =>
            this.favorite$.pipe(map((favorite) => !favorite && completed))
          )
        )
        .subscribe((response) => {
          if (response) {
            this.navCtrl.navigateForward('/favorites');
          }
        })
    );
    this.itemsConfirm$ = this.favorite$.pipe(
      map((favoriteData) => mapToTransferConfirm.bind(this)(favoriteData))
    );
  }

  public async modifyField(typeField: string): Promise<void> {
    const favorite = this.favorite$.currentValue();
    const newFavorite = await editFieldsFn[typeField].bind(this)(favorite);
    this.favoritesDetailFacade.setFavoriteDetail(newFavorite);
    this.cdRef.detectChanges();
  }

  public saveChanges(): void {
    const favorite = this.favorite$.currentValue();
    this.facade.editFavorite({ favoriteTransaction: favorite });
  }

  get favorite$(): Observable<Favorite> {
    return this.favoritesDetailFacade.favorite$;
  }

  get working$(): Observable<boolean> {
    return this.favoritesDetailFacade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.favoritesDetailFacade.completed$;
  }

  get editableFields(): string[] {
    return Object.values(EDITABLE_FIELDS_TO_EDIT);
  }

  get favoriteTypesLabels(): typeof FAVORITE_TYPES_LABELS {
    return FAVORITE_TYPES_LABELS;
  }

  get favoriteUiConfig(): typeof FAVORITE_UI_CONFIG {
    return FAVORITE_UI_CONFIG;
  }
}
