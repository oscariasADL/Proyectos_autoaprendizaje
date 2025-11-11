import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';
import { OnboardingService } from '@commons/services/onboarding.service';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import {
  INITIAL_ONBOARDING_SLIDER_OPTIONS,
  ONBOARDING_SLIDER_LENGTH,
  ONBOARDING_SLIDERS
} from '@modules/onboarding/constants/onboarding.constants';
import { OnboardingSlide } from '@modules/onboarding/entities/onboarding.entities';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingPage implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperComponent: SwiperComponent;
  swiper: Swiper;

  public slideOpts: SwiperOptions = INITIAL_ONBOARDING_SLIDER_OPTIONS;
  public currentSlide: number = INITIAL_ONBOARDING_SLIDER_OPTIONS.initialSlide;
  public onboardingSliders: OnboardingSlide[] = ONBOARDING_SLIDERS;

  constructor(
    private cdRef: ChangeDetectorRef,
    private splashScreen: SplashScreenService,
    private onboardingService: OnboardingService
  ) {}

  ionViewDidEnter(): void {
    this.splashScreen.hideSplashScreen();
  }

  ngAfterViewInit(): void {
    if (this.swiperComponent) {
      this.swiper = this.swiperComponent.swiperRef;
    }
  }

  public changeSlide(): void {
    this.currentSlide = this.swiper.realIndex;
    this.cdRef.detectChanges();
  }

  public moveToNextSlide(): void {
    if (this.currentSlide + 1 < ONBOARDING_SLIDER_LENGTH) {
      this.currentSlide++;
      this.swiper.slideTo(this.currentSlide, 500);
    } else {
      this.closeOnboarding();
    }
  }

  public closeOnboarding(): void {
    this.onboardingService.setOnboardingComplete();
  }

  get isLastSlide(): boolean {
    return this.currentSlide === ONBOARDING_SLIDER_LENGTH - 1;
  }
}
