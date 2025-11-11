import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import {
  filter,
  groupBy,
  map,
  mergeMap,
  reduce,
  take,
  toArray
} from 'rxjs/operators';

import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import {
  ACTION_LABEL,
  Favorite,
  GroupedFavorites,
  IdentificationFavoriteType,
  SubtypeOperations,
  TypeTarget
} from '@modules/favorites/entities/favorites.interface';
import { AlertService } from '@commons/services/alert.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { getDBValue } from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';
import { removeSubscriptions } from '@commons/utils/util';
import {
  FAVORITE_ONBOARDING_SLIDES,
  FAVORITE_TYPES_LABELS,
  FAVORITE_UI_CONFIG
} from '@modules/favorites/constants/favorites.contants';
import { ModalController } from '@commons/controllers/modal.controller';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { OnboardingComponent } from '@app/modules/onboarding/components/onboarding/onboarding.component';
import { OnboardingSlide } from '@app/modules/onboarding/entities/onboarding.entities';
import { ADD_FAVORITE } from '@app/commons/constants/navigate.constants';

@Component({
  selector: 'app-favorites-home',
  templateUrl: './favorites-home.page.html',
  styleUrls: ['./favorites-home.page.sass']
})
export class FavoritesHomePage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public readonly ADD_FAVORITE = ADD_FAVORITE;
  public readonly favorites$: Observable<GroupedFavorites[]> =
    this.facade.favorites$.pipe(
      take(1),
      mergeMap((favorite: Favorite[]) => favorite),
      groupBy((favorite) => favorite.identificationFavoriteType),
      mergeMap((group$) =>
        group$.pipe(
          reduce((acc, cur) => [...acc, cur], [group$.key.toString()])
        )
      ),
      map((arr) => ({ typeFavorite: arr[0], values: arr.slice(1) })),
      toArray()
    );
  isAddFavoritesEnabled = false;
  constructor(
    private facade: FavoritesFacade,
    private alertService: AlertService,
    private secureStorage: AdlSecureStorageService,
    private navController: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.isAddFavoritesEnabled = Boolean(
      this.facade.featureFlagsByKey(FeatureFlagsKey.AddFavorite)
    );
    this.subscriptions.push(
      this.facade.completed$
        .pipe(
          filter((completed) => completed),
          mergeMap((completed) =>
            this.favorites$.pipe(map((favorites) => favorites?.length === 0))
          )
        )
        .subscribe((isCompleted) => {
          if (isCompleted) {
            this.navController.navigateForward(['/']);
          }
        })
    );
  }
  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
    this.facade.closeToast();
  }

  public async delete(keyFavorite: string): Promise<void> {
    const db = await this.secureStorage.getAll();
    const { typeDocument, document } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );
    this.facade.showDeleteConfirm({
      userData: { idUserType: typeDocument, idUser: document },
      idFavoriteTransaction: keyFavorite
    });
  }

  public async edit(keyFavorite: string): Promise<void> {
    await this.navController.navigateForward(`/favorites/edit/${keyFavorite}`);
  }

  public async showOnboarding(): Promise<void> {
    const favoriteOnboardingSliders: OnboardingSlide[] =
      FAVORITE_ONBOARDING_SLIDES;

    const modal = await this.modalCtrl.create({
      component: OnboardingComponent,
      componentProps: {
        onboardingSliders: favoriteOnboardingSliders,
        continueButtonLabel: 'FAVORITES.ONBOARDING.CONTINUE'
      },
      id: 'favorites-onboarding-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  // ToDo: Remove when there is getOneFavorite micro
  get balanceWorking$(): Observable<boolean> {
    return this.facade.balanceWorking$;
  }

  get typeTarget(): typeof TypeTarget {
    return TypeTarget;
  }

  get identificationFavoriteType(): typeof IdentificationFavoriteType {
    return IdentificationFavoriteType;
  }

  get subTypeOperationFavorite(): typeof SubtypeOperations {
    return SubtypeOperations;
  }

  get favoriteUiConfig(): typeof FAVORITE_UI_CONFIG {
    return FAVORITE_UI_CONFIG;
  }

  get favoriteTypesLabels(): typeof FAVORITE_TYPES_LABELS {
    return FAVORITE_TYPES_LABELS;
  }

  get actionLabels(): typeof ACTION_LABEL {
    return ACTION_LABEL;
  }
}
