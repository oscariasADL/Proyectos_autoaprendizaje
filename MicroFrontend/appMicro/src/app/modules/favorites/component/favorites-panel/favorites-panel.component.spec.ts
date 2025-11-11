import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesPanelComponent } from './favorites-panel.component';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { FirstLettersWordsPipe } from '@commons/pipes/first-letters-words.pipe';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';
import { CONTINUE_ONBOARDING_EVENT } from '@app/modules/onboarding/constants/onboarding.constants';

describe('FavoritesPanelComponent', () => {
  let component: FavoritesPanelComponent;
  let fixture: ComponentFixture<FavoritesPanelComponent>;
  let modalController: ModalController;
  let modalSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        FavoritesPanelComponent,
        ImageUrlPipe,
        FirstLettersWordsPipe
      ],
      imports: [TestingModule, IonicModule, PreloadImageDirective],
      providers: [
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        },
        {
          provide: ModalController,
          useClass: ModalControllerMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPanelComponent);
    modalController = TestBed.inject(ModalController);

    component = fixture.componentInstance;
    component.favorites = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call showOnboarding', async () => {
    const createModalController = spyOn(modalController, 'create');
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: { event: CONTINUE_ONBOARDING_EVENT }
    }));
    createModalController.and.callFake(() => {
      return modalSpy;
    });

    await component.showOnboarding();

    expect(modalSpy.present).toHaveBeenCalled();
    expect(modalSpy.onDidDismiss).toHaveBeenCalled();
  });

  it('should return number', () => {
    expect(component.maxFavoritesShow).toBeDefined();
  });

  it('should return number', () => {
    expect(component.maxNumberFavorites).toBeDefined();
  });

  it('should return Observable<boolean>', () => {
    expect(component.working$).toBeDefined();
  });

  it('should return Observable<boolean>', () => {
    expect(component.completed$).toBeDefined();
  });
});
