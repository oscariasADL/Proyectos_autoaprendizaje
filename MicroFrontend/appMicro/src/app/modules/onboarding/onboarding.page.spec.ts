import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { SplashScreenServiceMock } from '@testing/mocks/services/splash-screen.service.mock';
import { TestingModule } from '@testing/testing.module';
import { OnboardingPage } from './onboarding.page';
import Swiper from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;
  let childComponent;

  beforeEach(waitForAsync(() => {
    childComponent = jasmine.createSpyObj('swiper', ['realIndex', 'slideTo']);
    const spy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    TestBed.configureTestingModule({
      declarations: [OnboardingPage, ImageUrlPipe],
      imports: [TestingModule, SwiperModule],
      providers: [
        { provide: SplashScreenService, useClass: SplashScreenServiceMock },
        { provide: ChangeDetectorRef, useValue: spy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    component.swiper = childComponent;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should call changeSlide', fakeAsync(() => {
    const mockSwiperRef = {
      realIndex: 3,
      params: {},
      originalParams: {},
      $el: document.createElement('div'),
      el: document.createElement('div')
    } as unknown as Swiper;

    component.swiperComponent = {
      swiperRef: mockSwiperRef
    } as SwiperComponent;

    component.ngAfterViewInit();

    component.changeSlide();

    tick(1000);

    expect(component.currentSlide).toEqual(3);
  }));

  it('should be call moveToNextSlide', async () => {
    const mockSwiperRef = {
      slideTo: jasmine.createSpy('slideTo').and.callFake(() => {
        return;
      }),
      realIndex: 0,
      params: {},
      originalParams: {},
      $el: {},
      el: {}
    } as unknown as Swiper;

    component.swiperComponent = {
      swiperRef: mockSwiperRef
    } as SwiperComponent;

    component.ngAfterViewInit();

    component.moveToNextSlide();

    expect(mockSwiperRef.slideTo).toHaveBeenCalledWith(1, 500);

    expect(component.currentSlide).toEqual(1);
  });

  it('should be call closeOnboarding', async () => {
    component.currentSlide = 10;
    fixture.ngZone.run(() =>
      expect(component.moveToNextSlide()).toBeUndefined()
    );
  });

  it('should confirm is not the last slide', async () => {
    expect(component.isLastSlide).toBeFalsy();
  });

  it('should confirm the last slide', async () => {
    component.currentSlide = 3;
    expect(component.isLastSlide).toBeTruthy();
  });
});
