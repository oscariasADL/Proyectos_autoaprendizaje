import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NavController } from '@ionic/angular';
import SwiperCore, { Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Subscription } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import {
  BACKGROUND_CLASS_SLIDERS,
  CONFIG_SLIDES,
  REQUEST_PRODUCTS_ALERT,
  REQUEST_PRODUCTS_SLIDERS
} from './constants/slider-campaign.constants';
import { ProductsFacade } from '@modules/products/products.facade';
import { AlertService } from '@commons/services/alert.service';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { RequestProductSlide } from '@modules/products/pages/request-products/entities/request-products.entities';
import { DIGITAL_DEBIT_CARD } from '@commons/constants/navigate.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideOptions } from '@modules/shared/entities/slider.interface';
import { removeSubscriptions } from '@commons/utils/util';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-slider-campaign',
  templateUrl: './slider-campaign.component.html',
  styleUrls: ['./slider-campaign.component.sass']
})
export class SliderCampaignComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  @Input() idProduct: string;
  @Input() accountType: TypeAccount;

  public sliders: RequestProductSlide[];
  public slideOpts: SlideOptions = CONFIG_SLIDES;
  public showSlides = true;
  public onlySlide = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private facade: ProductsFacade,
    private alertService: AlertService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.initSliders();
    this.canRequestDigitalDebitCard();
    this.canRequestVirtualCreditCard();
  }

  ngAfterViewInit(): void {
    if (this.swiper && this.swiper.swiperRef) {
      this.configureSlideOptions();
    }
  }

  ngOnDestroy() {
    removeSubscriptions(this.subscriptions);
  }

  private initSliders(): void {
    const enabledSliders = this.getEnabledSliders(REQUEST_PRODUCTS_SLIDERS);
    this.sliders = this.updateSliderUrls(
      this.filterAccounts(enabledSliders, this.accountType),
      this.idProduct
    );
  }

  public configureSlideOptions(): void {
    if (!this.swiper || !this.swiper.swiperRef) return;

    this.onlySlide = this.sliders?.length <= 1;
    this.swiper.swiperRef.allowTouchMove = !this.onlySlide;
    if (this.onlySlide) {
      this.swiper.swiperRef.autoplay.run();
    }
  }

  public slidePrev(): void {
    const index = this.swiper.swiperRef.activeIndex;
    const length = this.swiper.swiperRef.slides.length;
    if (index + 1 === length) {
      this.swiper.swiperRef.autoplay.start();
    }
    if (this.swiper.swiperRef.isBeginning) {
      this.swiper.swiperRef.slideTo(length - 1);
      return;
    }
    this.swiper.swiperRef.slidePrev();
  }

  public slideNext(): void {
    if (this.swiper.swiperRef.isEnd) {
      this.swiper.swiperRef.slideTo(0);
      return;
    }
    this.swiper.swiperRef.slideNext();
  }

  public async selectProduct(slide: RequestProductSlide): Promise<void> {
    if (!slide.isExternal) {
      this.navCtrl.navigateForward(slide.url);
      return;
    }
    const response = await this.alertService.create(REQUEST_PRODUCTS_ALERT);
    if (!!response) {
      this.facade.logout();
      this.facade.redirectExternal(slide.url as LinkKey);
    }
  }

  public canRequestDigitalDebitCard(): void {
    if (![TypeAccount.SDA, TypeAccount.DDA].includes(this.accountType)) return;
    this.facade.digitalDebitCards$
      .pipe(
        withLatestFrom(
          this.facade.digitalDebitCardsCompleted$,
          this.facade.basicData$
        ),
        filter(([_, completed, basicData]) => {
          const { hasDigitalCard } = basicData;
          return !hasDigitalCard || completed;
        }),
        tap(() => this.initSliders()),
        map(([cards, completed]) =>
          cards?.find((card) => card?.relativeParentId === this.idProduct)
        ),
        filter((card) => isNullOrUndefined(card))
      )
      .subscribe(() => {
        this.showSlides = false;
        const sliderTDD = this.sliders.find(
          (slide: RequestProductSlide) =>
            slide.id === 'btn-request-digital-debit-card'
        );
        if (!sliderTDD && this.accountType !== TypeAccount.CCA) {
          this.sliders = [
            {
              img: 'slider-campaign/tdd.png',
              title: 'CAMPAIGN.SLIDES.SLIDE_3.TITLE',
              content: 'CAMPAIGN.SLIDES.SLIDE_3.DESCRIPTION',
              btn: 'CAMPAIGN.SLIDES.SLIDE_3.BUTTON',
              url: `${DIGITAL_DEBIT_CARD.toString()}?idProduct=${
                this.idProduct
              }`,
              isExternal: false,
              id: 'btn-request-digital-debit-card',
              class: BACKGROUND_CLASS_SLIDERS.TDD
            },
            ...this.sliders
          ];
        }
        this.showSlides = true;
      });
  }

  public canRequestVirtualCreditCard(): void {
    if (
      !this.facade.featureFlagsByKey(
        FeatureFlagsKey.VirtualCreditCard
      ) as boolean
    )
      return;
    if (this.accountType !== TypeAccount.CCA) return;
    this.subscriptions.push(
      this.facade.virtualCreditCards$
        .pipe(
          withLatestFrom(
            this.facade.virtualCreditCardsCompleted$,
            this.facade.virtualCreditCardMaxCardsLimit$
          ),
          filter(([cards, completed, maxCardsLimit]) => {
            const cardsLength = cards?.length ?? 0;
            return (
              completed && Array.isArray(cards) && cardsLength < maxCardsLimit
            );
          })
        )
        .subscribe(([cards]) => {
          this.showSlides = false;
          const sliderTCV = this.sliders.find(
            (slide: RequestProductSlide) =>
              slide.id === 'slide-activate-virtual-credit-card'
          );
          if (!sliderTCV) {
            this.sliders = [
              {
                img: 'slider-campaign/tcv-new.svg',
                title: 'CAMPAIGN.SLIDES.SLIDE_5.TITLE',
                id: 'slide-activate-virtual-credit-card',
                content: 'CAMPAIGN.SLIDES.SLIDE_5.DESCRIPTION',
                btn: 'CAMPAIGN.SLIDES.SLIDE_5.BUTTON',
                url: '/virtual-credit-card/activate/onboarding',
                isExternal: false,
                class: BACKGROUND_CLASS_SLIDERS.TCV,
                accountTypesAllowed: [TypeAccount.CCA]
              },
              ...this.sliders
            ];
          }
          this.showSlides = true;
          this.configureSlideOptions();
        })
    );
  }

  public filterAccounts(sliders: RequestProductSlide[], account: TypeAccount) {
    return sliders.filter((slider: RequestProductSlide) => {
      if (slider.accountTypesAllowed?.length === 0) {
        return true;
      }
      return slider.accountTypesAllowed?.includes(account);
    });
  }

  public updateSliderUrls(sliders: RequestProductSlide[], idProduct: string) {
    if (this.accountType === TypeAccount.CCA) {
      return sliders.map((slider: RequestProductSlide) => {
        const url = slider.url;
        if (url.includes('?')) {
          const [baseUrl, queryString] = url.split('?');
          const params = new URLSearchParams(queryString);
          params.set('idProduct', idProduct.toString());
          slider.url = `${baseUrl}?${params.toString()}`;
        } else {
          // URL no tiene parámetros
          slider.url = `${url}?idProduct=${idProduct}`;
        }

        return slider;
      });
    }
    return sliders;
  }
  private getEnabledSliders(
    sliders: RequestProductSlide[]
  ): RequestProductSlide[] {
    return structuredClone(sliders).filter(
      (slider) =>
        !slider.featureFlagKey ||
        this.facade.featureFlagsByKey(slider.featureFlagKey)
    );
  }
}
