import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FavoritesAccountInputComponent } from '@modules/favorites/component/favorites-account-input/favorites-account-input';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('FavoritesAccountInputComponent', () => {
  let component: FavoritesAccountInputComponent;
  let fixture: ComponentFixture<FavoritesAccountInputComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesAccountInputComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesAccountInputComponent);
    component = fixture.componentInstance;
    component.products = [];
    component.amount = 0;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call selectProduct(product: Product)', async () => {
    const product = { id: '838383', availableBalance: 100 };
    expect(await component.selectProduct(product)).toBeUndefined();
    component.amount = 101;
    fixture.detectChanges();
    expect(await component.selectProduct(product)).toBeUndefined();
  });

  it('should be close the modal', async () => {
    expect(await component.closeModal()).toBeUndefined();
  });
});
