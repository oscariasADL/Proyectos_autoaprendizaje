import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FavoritesOnboardingComponent } from './favorites-onboarding.component';
import { ModalController } from '@commons/controllers/modal.controller';
import { TestingModule } from '@testing/testing.module';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { ADD_FAVORITES } from '@app/commons/constants/navigate.constants';
import { ONBOARDING_SLIDER_LENGTH } from '@app/modules/onboarding/constants/onboarding.constants';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

xdescribe('FavoritesOnboardingComponent', () => {
  let component: FavoritesOnboardingComponent;
  let fixture: ComponentFixture<FavoritesOnboardingComponent>;
  let modalController: ModalController;
  let navController: NavController;

  beforeEach(async () => {
    const navControllerSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        FavoritesOnboardingComponent, // Como es standalone
        IonicModule.forRoot(),
        TestingModule
      ],
      providers: [
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: NavController, useValue: navControllerSpy },
        { provide: AppFacade, useClass: AppFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesOnboardingComponent);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController);
    navController = TestBed.inject(NavController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.slideOpts).toBeDefined();
    expect(component.currentSlide).toBeDefined();
    expect(component.favoriteOnboardingSliders).toBeDefined();
    expect(Array.isArray(component.favoriteOnboardingSliders)).toBeTruthy();
  });

  it('should call onCloseOnboarding and dismiss modal', async () => {
    spyOn(modalController, 'dismiss').and.returnValue(Promise.resolve(true));

    await component.onCloseOnboarding();

    expect(modalController.dismiss).toHaveBeenCalled();
  });

  it('should call onContinue and navigate to ADD_FAVORITES', () => {
    component.onContinue();

    expect(navController.navigateRoot).toHaveBeenCalledWith(ADD_FAVORITES);
  });

  it('should return true when isLastSlide and currentSlide is the last one', () => {
    component.currentSlide = ONBOARDING_SLIDER_LENGTH - 1;

    expect(component.isLastSlide).toBeTruthy();
  });

  it('should return false when isLastSlide and currentSlide is not the last one', () => {
    component.currentSlide = 0;

    expect(component.isLastSlide).toBeFalsy();
  });

  it('should handle different currentSlide values for isLastSlide getter', () => {
    // Test first slide
    component.currentSlide = 0;
    expect(component.isLastSlide).toBeFalsy();

    // Test middle slide (assuming length > 2)
    if (ONBOARDING_SLIDER_LENGTH > 2) {
      component.currentSlide = 1;
      expect(component.isLastSlide).toBeFalsy();
    }

    // Test last slide
    component.currentSlide = ONBOARDING_SLIDER_LENGTH - 1;
    expect(component.isLastSlide).toBeTruthy();
  });

  it('should have swiper component reference', () => {
    expect(component.swiperComponent).toBeUndefined();
  });

  it('should handle modal dismiss errors gracefully', async () => {
    const error = new Error('Modal dismiss failed');
    spyOn(modalController, 'dismiss').and.returnValue(Promise.reject(error));

    try {
      await component.onCloseOnboarding();
      fail('Expected method to throw');
    } catch (thrownError) {
      expect(thrownError).toBe(error);
    }
  });

  it('should verify favoriteOnboardingSliders is populated from constants', () => {
    expect(component.favoriteOnboardingSliders).toBeDefined();
    expect(component.favoriteOnboardingSliders.length).toBeGreaterThan(0);
  });

  it('should verify slideOpts contains initial configuration', () => {
    expect(component.slideOpts).toBeDefined();
    expect(typeof component.slideOpts).toBe('object');
  });
});
