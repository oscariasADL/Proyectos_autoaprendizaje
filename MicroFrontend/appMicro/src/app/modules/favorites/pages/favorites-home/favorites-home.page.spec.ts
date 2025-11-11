import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { FavoritesHomePage } from './favorites-home.page';
import { TestingModule } from '@testing/testing.module';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { FirstLettersWordsPipe } from '@commons/pipes/first-letters-words.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';

describe('FavoritesHomePage', () => {
  let component: FavoritesHomePage;
  let fixture: ComponentFixture<FavoritesHomePage>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesHomePage, ImageUrlPipe, FirstLettersWordsPipe],
      imports: [TestingModule, IonicModule, RouterTestingModule],
      providers: [
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        },
        {
          provide: AlertService,
          useClass: AlertServiceMock
        },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: NavController,
          useValue: navCtrlSpy
        },
        {
          provide: ModalController,
          useClass: ModalControllerMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call delete', async () => {
    expect(await component.delete('CC9838364')).toBe(void 0);
  });

  it('should be call edit', async () => {
    expect(await component.edit('CC9838364')).toBe(void 0);
  });

  it('should to call showOnboarding', async () => {
    expect(await component.showOnboarding()).toBe(void 0);
  });

  it('should return TypeTarget', () => {
    expect(component.typeTarget).toBeDefined();
  });

  it('should return IdentificationFavoriteType', () => {
    expect(component.identificationFavoriteType).toBeDefined();
  });
});
