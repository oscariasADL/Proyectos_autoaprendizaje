import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FavoritesTargetInputComponent } from '@modules/favorites/component/favorites-target-input/favorites-target-input';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { TypeTarget } from '@modules/favorites/entities/favorites.interface';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

describe('FavoritesTargetInputComponent', () => {
  let component: FavoritesTargetInputComponent;
  let fixture: ComponentFixture<FavoritesTargetInputComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FavoritesTargetInputComponent],
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

    fixture = TestBed.createComponent(FavoritesTargetInputComponent);
    component = fixture.componentInstance;
    component.initValue = '736373998';
    component.typeTargetVal = TypeTarget.DOCUMENT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should TypeTarget.ACCOUNT', () => {
    component.typeTargetVal = TypeTarget.ACCOUNT;
    expect(component).toBeTruthy();
  });

  it('should TypeTarget.CELLPHONE', () => {
    component.typeTargetVal = TypeTarget.CELLPHONE;
    expect(component).toBeTruthy();
  });

  it('should be call saveChanges', async () => {
    expect(await component.saveChanges()).toBeUndefined();
  });

  it('should validators to ACCOUNT', () => {
    component.typeTargetVal = TypeTarget.ACCOUNT;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should validators to CELLPHONE', () => {
    component.typeTargetVal = TypeTarget.CELLPHONE;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should close modal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
