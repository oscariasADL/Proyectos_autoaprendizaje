import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewChild
} from '@angular/core';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  CLOSE_ONBOARDING_EVENT,
  CONTINUE_ONBOARDING_EVENT,
  INITIAL_ONBOARDING_SLIDER_OPTIONS
} from '@modules/onboarding/constants/onboarding.constants';
import { OnboardingSlide } from '@modules/onboarding/entities/onboarding.entities';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    GlobalPipesModule,
    CommonModule,
    SwiperModule,
    PreloadImageDirective
  ]
})
export class OnboardingComponent implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperComponent: SwiperComponent;
  swiper: Swiper;

  @Input() onboardingSliders: OnboardingSlide[] = [];
  @Input() continueButtonLabel: string = 'ONBOARDING.BUTTON';

  public slideOpts: SwiperOptions = INITIAL_ONBOARDING_SLIDER_OPTIONS;
  public currentSlide: number = INITIAL_ONBOARDING_SLIDER_OPTIONS.initialSlide;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalCtrl: ModalController
  ) {}

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
    if (this.currentSlide + 1 < this.onboardingSliders.length) {
      this.currentSlide++;
      this.swiper.slideTo(this.currentSlide, 500);
    } else {
      this.closeOnboarding();
    }
  }

  public closeOnboarding(): void {
    this.modalCtrl.dismiss({ event: CLOSE_ONBOARDING_EVENT });
  }

  public continue(): void {
    this.modalCtrl.dismiss({ event: CONTINUE_ONBOARDING_EVENT });
  }

  get isLastSlide(): boolean {
    return this.currentSlide === this.onboardingSliders.length - 1;
  }
}
