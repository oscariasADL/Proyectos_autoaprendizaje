import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { map, Observable } from 'rxjs';

import { ModalController } from '@commons/controllers/modal.controller';
import { FavoriteBasic } from '@modules/favorites/entities/favorites.interface';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import {
  FAVORITE_ONBOARDING_SLIDES,
  FAVORITE_UI_CONFIG,
  FAVORITY_PHONE_PATH
} from '@modules/favorites/constants/favorites.contants';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import {
  ADD_FAVORITE,
  FAVORITES
} from '@app/commons/constants/navigate.constants';
import { CONTINUE_ONBOARDING_EVENT } from '@app/modules/onboarding/constants/onboarding.constants';
import { OnboardingSlide } from '@app/modules/onboarding/entities/onboarding.entities';
import { OnboardingComponent } from '@app/modules/onboarding/components/onboarding/onboarding.component';
import { NavController } from '@ionic/angular';
import { mapProductsByFilter } from '@app/modules/product/mappers/product-filter.mapper';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { Product } from '@app/commons/entities/product/product.interface';

const MAX_FAVORITES_TO_SHOW = 3;

@Component({
  selector: 'app-favorites-panel',
  templateUrl: './favorites-panel.component.html',
  styleUrls: ['./favorites-panel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPanelComponent implements OnInit {
  @Input() favorites: FavoriteBasic[] = [];
  isAddFavoritesEnabled = false;
  public readonly FAVORITES = FAVORITES;
  public readonly ADD_FAVORITE = ADD_FAVORITE;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private facade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.isAddFavoritesEnabled = Boolean(
      this.facade.featureFlagsByKey(FeatureFlagsKey.AddFavorite)
    );
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

    const { data } = await modal.onDidDismiss();
    if (data?.event === CONTINUE_ONBOARDING_EVENT) {
      this.navCtrl.navigateForward(ADD_FAVORITE);
    }
  }

  get favoriteUiConfig(): typeof FAVORITE_UI_CONFIG {
    return FAVORITE_UI_CONFIG;
  }

  get maxFavoritesShow(): number {
    return MAX_FAVORITES_TO_SHOW;
  }

  get maxNumberFavorites(): number {
    return this.facade.boundsByKey(ParameterKey.favoritesMax);
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }
  public hasSDA(): boolean {
    const homeProducts = this.facade.balance$
      .pipe(
        map((balance) =>
          mapProductsByFilter(balance, {
            typeAccountProducts: [TypeAccount.SDA]
          })
        )
      )
      .currentValue();

    const hasSDA = homeProducts.some(
      (product: Product) => product.type === TypeAccount.SDA
    );

    return hasSDA;
  }
}
