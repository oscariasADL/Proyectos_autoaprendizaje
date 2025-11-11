import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { FAVORITE_ONBOARDING_SLIDES } from '@modules/favorites/constants/favorites.contants';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types/swiper-options';
import SwiperCore, { Autoplay } from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import Swiper from 'swiper';
import { OnboardingComponent } from '@app/modules/onboarding/components/onboarding/onboarding.component';
import {
  INITIAL_ONBOARDING_SLIDER_OPTIONS,
  ONBOARDING_SLIDER_LENGTH
} from '@app/modules/onboarding/constants/onboarding.constants';
import { OnboardingSlide } from '@app/modules/onboarding/entities/onboarding.entities';
import { ADD_FAVORITES } from '@app/commons/constants/navigate.constants';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-favorites-onboarding',
  templateUrl: './favorites-onboarding.component.html',
  styleUrls: ['./favorites-onboarding.component.sass'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    GlobalPipesModule,
    CommonModule,
    SwiperModule,
    OnboardingComponent
  ]
})
export class FavoritesOnboardingComponent {
  @ViewChild('swiper', { static: false }) swiperComponent: SwiperComponent;
  swiper: Swiper;

  public slideOpts: SwiperOptions = INITIAL_ONBOARDING_SLIDER_OPTIONS;
  public currentSlide: number = INITIAL_ONBOARDING_SLIDER_OPTIONS.initialSlide;
  public favoriteOnboardingSliders: OnboardingSlide[] =
    FAVORITE_ONBOARDING_SLIDES;

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  public async onCloseOnboarding(): Promise<void> {
    await this.modalController.dismiss();
  }

  public onContinue() {
    this.navCtrl.navigateRoot(ADD_FAVORITES);
  }

  get isLastSlide(): boolean {
    return this.currentSlide === ONBOARDING_SLIDER_LENGTH - 1;
  }
}
