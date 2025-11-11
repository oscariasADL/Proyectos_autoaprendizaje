import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { TestingModule } from '@testing/testing.module';
import { OnboardingComponent } from './onboarding.component';
import Swiper from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { ChangeDetectorRef } from '@angular/core';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { ModalController } from '@commons/controllers/modal.controller';

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;

  let childComponent;
  beforeEach(waitForAsync(() => {
    childComponent = jasmine.createSpyObj('swiper', ['realIndex', 'slideTo']);
    const spy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    TestBed.overrideComponent(OnboardingComponent, {
      add: {
        imports: [TestingModule, CommonModule, SwiperModule],
        providers: [
          { provide: ChangeDetectorRef, useValue: spy },
          { provide: ModalController, useValue: ModalControllerMock }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingComponent);

    component = fixture.componentInstance;
    component.swiper = childComponent;

    fixture.detectChanges();
  }));

  it('should create', () => {
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

  it('should call closeOnboardingEvent', () => {
    spyOn(component['modalCtrl'], 'dismiss');

    component.closeOnboarding();

    expect(component['modalCtrl'].dismiss).toHaveBeenCalled();
  });

  it('should call continueEvent', () => {
    spyOn(component['modalCtrl'], 'dismiss');
    component.continue();
    expect(component['modalCtrl'].dismiss).toHaveBeenCalled();
  });
});
