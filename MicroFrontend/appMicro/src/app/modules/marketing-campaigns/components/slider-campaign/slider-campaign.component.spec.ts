import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { SliderCampaignComponent } from './slider-campaign.component';
import { ProductsFacade } from '@modules/products/products.facade';
import { ProductsFacadeMock } from '@testing/mocks/facade/products.facade.mock';
import { AlertService } from '@commons/services/alert.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';
import {
  CONFIG_SLIDES,
  REQUEST_PRODUCTS_SLIDERS
} from './constants/slider-campaign.constants';
import { DIGITAL_DEBIT_CARD } from '@commons/constants/navigate.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TypeAccount } from '@commons/entities/product/type-account';
import { RequestProductSlide } from '@modules/products/pages/request-products/entities/request-products.entities';
import { SwiperModule } from 'swiper/angular';

describe('SliderCampaignComponent', () => {
  let component: SliderCampaignComponent;
  let fixture: ComponentFixture<SliderCampaignComponent>;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    const swiperMock = {
      swiperRef: {
        autoplay: {
          run: jasmine.createSpy('run'),
          start: jasmine.createSpy('start')
        },
        slides: [],
        activeIndex: 0,
        isBeginning: true,
        isEnd: false,
        allowTouchMove: true,
        slideTo: jasmine.createSpy('slideTo'),
        slideNext: jasmine.createSpy('slideNext'),
        slidePrev: jasmine.createSpy('slidePrev')
      }
    };
    TestBed.configureTestingModule({
      declarations: [SliderCampaignComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule, SwiperModule],
      providers: [
        { provide: ProductsFacade, useClass: ProductsFacadeMock },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderCampaignComponent);
    component = fixture.componentInstance;
    component.idProduct = '232387238274';
    component.accountType = TypeAccount.SDA;
    component.slideOpts = {
      ...CONFIG_SLIDES,
      autoplay: {
        delay: 1
      } as any
    };
    component.swiper = swiperMock as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectLink', async () => {
    const sliders = REQUEST_PRODUCTS_SLIDERS;
    const slideTDD = {
      img: 'solicitar-productos/tarjeta-debito-digital.jpg',
      btn: 'Activa tu tarjeta debito digital',
      url: DIGITAL_DEBIT_CARD.toString(),
      isExternal: true
    };
    sliders.unshift(slideTDD);

    alertServiceSpy.create.and.returnValue(Promise.resolve(true));
    await component.selectProduct(sliders[0]);
    expect(alertServiceSpy.create).toHaveBeenCalled();

    alertServiceSpy.create.and.returnValue(Promise.resolve(false));
    await component.selectProduct(sliders[0]);
    expect(alertServiceSpy.create).toHaveBeenCalled();

    slideTDD.isExternal = false;
    await component.selectProduct(sliders[0]);
    expect(navCtrlSpy.navigateForward).toHaveBeenCalled();
  });

  it('should call canRequestDigitalDebitCard()', () => {
    const componentAny = component as any;
    spyOn(componentAny, 'canRequestDigitalDebitCard').and.callThrough();
    componentAny.canRequestDigitalDebitCard();
    expect(componentAny.canRequestDigitalDebitCard).toHaveBeenCalled();
  });

  it('should handle selectProduct with different inputs', () => {
    const product = REQUEST_PRODUCTS_SLIDERS[0];
    spyOn(component, 'selectProduct').and.callThrough();
    component.selectProduct(product);
    expect(component.selectProduct).toHaveBeenCalledWith(product);
  });
  it('should update slider URLs with query parameters for CCA account type', () => {
    component.accountType = TypeAccount.CCA;
    const sliders: RequestProductSlide[] = [
      {
        url: 'http://example.com?param=value',
        img: '',
        btn: '',
        isExternal: false
      },
      { url: 'http://example.com', img: '', btn: '', isExternal: false }
    ];
    const idProduct = '123';

    const updatedSliders = component.updateSliderUrls(sliders, idProduct);

    expect(updatedSliders[0].url).toBe(
      'http://example.com?param=value&idProduct=123'
    );
    expect(updatedSliders[1].url).toBe('http://example.com?idProduct=123');
  });

  it('should not update slider URLs for non-CCA account type', () => {
    component.accountType = TypeAccount.SDA;
    const sliders: RequestProductSlide[] = [
      {
        url: 'http://example.com?param=value',
        img: '',
        btn: '',
        isExternal: false
      },
      { url: 'http://example.com', img: '', btn: '', isExternal: false }
    ];
    const idProduct = '123';

    const updatedSliders = component.updateSliderUrls(sliders, idProduct);

    expect(updatedSliders).toEqual(sliders);
  });

  it('should configure slide options correctly when there is only one slide', () => {
    component.sliders = [
      { url: 'http://example.com', img: '', btn: '', isExternal: false }
    ];
    component.configureSlideOptions();
    expect(component.onlySlide).toBeTrue();
    expect(component.swiper.swiperRef.allowTouchMove).toBeFalse();
  });
  it('should navigate to the next slide when slideNext is called', () => {
    const slideNextSpy = spyOn(component.swiper.swiperRef, 'slideNext');

    component.slideNext();

    expect(slideNextSpy).toHaveBeenCalled();
  });
  it('should navigate to the first slide when slideNext is called and swiper is at the end', () => {
    component.swiper.swiperRef.isEnd = true;

    const slideToSpy = spyOn(component.swiper.swiperRef, 'slideTo');

    component.slideNext();

    expect(slideToSpy).toHaveBeenCalledWith(0);
  });
  it('should call slidePrev on swiperRef when slidePrev is called', () => {
    const slideToSpy = spyOn(component.swiper.swiperRef, 'slidePrev');

    component.slidePrev();

    expect(slideToSpy).toHaveBeenCalled();
  });
  it('should call slidePrev on swiperRef when slidePrev is called', () => {
    const slideToSpy = spyOn(component.swiper.swiperRef, 'slidePrev');

    component.slidePrev();

    expect(slideToSpy).toHaveBeenCalled();
  });
  it('should start autoplay when activeIndex + 1 equals length', () => {
    const slideToSpy = spyOn(component.swiper.swiperRef, 'slidePrev');

    component.swiper.swiperRef.activeIndex = 4;
    component.swiper.swiperRef.slides.length = 5;
    component.slidePrev();

    expect(slideToSpy).toHaveBeenCalled();
  });
  it('should slide to the last slide when isBeginning is true', () => {
    const slideToSpy = spyOn(component.swiper.swiperRef, 'slideTo');

    component.swiper.swiperRef.activeIndex = 0;
    component.swiper.swiperRef.isBeginning = true;

    component.slidePrev();

    expect(slideToSpy).toHaveBeenCalledWith(2);
  });
  it('should not configure slide options when swiper or swiperRef is missing', () => {
    component.swiper = undefined;
    const onlySlideInitial = component.onlySlide;
    expect(() => {
      component.configureSlideOptions();
    }).not.toThrowError();
    expect(component.onlySlide).toBe(onlySlideInitial);
    component.swiper = {} as any;
    expect(() => {
      component.configureSlideOptions();
    }).not.toThrowError();
  });
  it('should return early in canRequestDigitalDebitCard() for non SDA/DDA account types', () => {
    component.accountType = TypeAccount.CCA;

    const initialSubscriptionsLength = component['subscriptions'].length;
    const initialShowSlides = component.showSlides;
    component.canRequestDigitalDebitCard();
    expect(component['subscriptions'].length).toBe(initialSubscriptionsLength);

    expect(component.showSlides).toBe(initialShowSlides);
  });

  it('should include slider when accountTypesAllowed is an empty array', () => {
    const sliderWithEmptyArray: RequestProductSlide = {
      url: 'http://example.com',
      img: '',
      btn: '',
      isExternal: false,
      accountTypesAllowed: []
    };
    const sliderWithAllowed: RequestProductSlide = {
      url: 'http://example.com',
      img: '',
      btn: '',
      isExternal: false,
      accountTypesAllowed: [TypeAccount.CCA]
    };
    const sliders: RequestProductSlide[] = [
      sliderWithEmptyArray,
      sliderWithAllowed
    ];
    const filteredSliders = component.filterAccounts(sliders, TypeAccount.SDA);

    expect(filteredSliders).toContain(sliderWithEmptyArray);
    expect(filteredSliders).not.toContain(sliderWithAllowed);
  });
});
