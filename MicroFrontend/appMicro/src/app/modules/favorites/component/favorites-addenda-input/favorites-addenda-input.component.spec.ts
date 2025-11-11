import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { FavoritesAddendaInputComponent } from './favorites-addenda-input.component';
import { TestingModule } from '@testing/testing.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { ALPHANUMERIC_PATTERN } from '@app/commons/constants/regex.constants';

describe('FavoritesAddendaInputComponent', () => {
  let component: FavoritesAddendaInputComponent;
  let fixture: ComponentFixture<FavoritesAddendaInputComponent>;
  const modalCtrlSpy = jasmine.createSpyObj<ModalController>(
    'ModalController',
    ['dismiss']
  );
  let facade: FavoritesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesAddendaInputComponent],
      imports: [TestingModule, FormsAvvModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesAddendaInputComponent);
    facade = TestBed.inject(FavoritesFacade);
    spyOn(facade, 'boundsByKey').and.returnValue(5);

    component = fixture.componentInstance;
    component.title = 'Ingresa la addenda';
    component.label = 'addenda';
    component.helpText = '';
    component.initValue = 'Cenas';
    component.addendaFormControl = new FormControl('Cenas', [
      Validators.required,
      Validators.pattern(ALPHANUMERIC_PATTERN),
      Validators.minLength(5),
      Validators.maxLength(5)
    ]);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveChanges', waitForAsync(async () => {
    const closeSpy = spyOn(component, 'closeModal').and.returnValue(
      Promise.resolve()
    );

    await component.saveChanges();

    expect(component.addendaFormControl.touched).toBe(true);
    expect(closeSpy).toHaveBeenCalledOnceWith({ addenda: 'Cenas' });
  }));

  it('should call close modal', fakeAsync(() => {
    try {
      modalCtrlSpy.dismiss.and.returnValue(Promise.resolve(true));
      tick();
      component.closeModal();
      expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
    } catch (error) {
      fail(`showPanelIfNecessary threw an error: ${error}`);
    }
  }));
});
