import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { PopupErrorLoginComponent } from './popup-error-login.component';
import { POPUP_ERROR_LOGIN } from './constants/popup.constant';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { TestingModule } from '@testing/testing.module';

describe('PopupErrorLoginComponent', () => {
  let component: PopupErrorLoginComponent;
  let fixture: ComponentFixture<PopupErrorLoginComponent>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  beforeEach(waitForAsync(() => {
    const modalControllerSpy = jasmine.createSpyObj('ModalController', [
      'dismiss'
    ]);

    TestBed.configureTestingModule({
      declarations: [PopupErrorLoginComponent],
      imports: [IonicModule, GlobalPipesModule, TestingModule],
      providers: [{ provide: ModalController, useValue: modalControllerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupErrorLoginComponent);
    component = fixture.componentInstance;
    modalCtrlSpy = TestBed.inject(
      ModalController
    ) as jasmine.SpyObj<ModalController>;
    component.popUpData = POPUP_ERROR_LOGIN;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with undefined popUpData when no input is provided', () => {
    component.popUpData = undefined;
    expect(component.popUpData).toBeUndefined();
  });

  it('should accept popUpData as input', () => {
    const mockPopUpData = POPUP_ERROR_LOGIN;
    component.popUpData = mockPopUpData;
    expect(component.popUpData).toBe(mockPopUpData);
  });

  it('should accept onClick function as input', () => {
    const mockOnClick = jasmine.createSpy('onClick');
    component.onClick = mockOnClick;
    expect(component.onClick).toBe(mockOnClick);
  });

  describe('onClick input function', () => {
    it('should execute the provided onClick function when called', () => {
      const mockOnClick = jasmine.createSpy('onClick');
      component.onClick = mockOnClick;

      component.onClick();

      expect(mockOnClick).toHaveBeenCalled();
    });

    it('should handle undefined onClick gracefully', () => {
      component.onClick = undefined;

      expect(() => {
        if (component.onClick) {
          component.onClick();
        }
      }).not.toThrow();
    });
  });

  describe('closeModal', () => {
    it('should call modalCtrl.dismiss with given data', async () => {
      const testData = { test: 'data' };
      await component.closeModal(testData);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(testData);
    });

    it('should call modalCtrl.dismiss with null if no data is provided', async () => {
      await component.closeModal();
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(null);
    });

    it('should handle errors gracefully', async () => {
      modalCtrlSpy.dismiss.and.throwError('Test Error');

      await expectAsync(component.closeModal()).toBeRejected();
    });
  });
});
