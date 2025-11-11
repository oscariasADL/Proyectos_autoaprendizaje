import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesNameInputComponent } from '@modules/favorites/component/favorites-name-input/favorites-name-input';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

describe('FavoritesNameInputComponent', () => {
  let component: FavoritesNameInputComponent;
  let fixture: ComponentFixture<FavoritesNameInputComponent>;
  let modalCtrlSpy;

  beforeEach(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [FavoritesNameInputComponent],
      imports: [TestingModule, IonicModule, FormsAvvModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesNameInputComponent);
    component = fixture.componentInstance;
    component.initValue = '1000000';
    component.nameFormControl = new UntypedFormControl(component.initValue);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveChanges', async () => {
    try {
      await component.saveChanges();
      expect(component.saveChanges).toBeDefined();
    } catch (error) {
      fail(`saveChanges threw an error: ${error}`);
    }
  });

  it('should call closeModal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    try {
      await component.closeModal();
      expect(component.closeModal).toHaveBeenCalled();
    } catch (error) {
      fail(`closeModal threw an error: ${error}`);
    }
  });
});
