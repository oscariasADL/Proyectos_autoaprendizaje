import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { AlertComponent } from './alert.component';
import { ModalController } from '@commons/controllers/modal.controller';
import { PopupErrorLoginComponent } from '../popup-error-login/popup-error-login.component';
import { POPUP_ERROR_LOGIN } from '../popup-error-login/constants/popup.constant';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'dismiss',
      'create'
    ]);
    TestBed.configureTestingModule({
      declarations: [AlertComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [{ provide: ModalController, useValue: modalCtrlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close modal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should return string icon, get icon(): string ', () => {
    expect(component.icon).toBeDefined();
  });

  it('should open PopupErrorLogin and close the modal', async () => {
    const modalPresentSpy = jasmine.createSpyObj('Modal', ['present']);
    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalPresentSpy));

    spyOn(component, 'closeModal').and.callThrough();

    await component.openPopUpErrorLogin();

    expect(modalCtrlSpy.create).toHaveBeenCalledWith({
      component: PopupErrorLoginComponent,
      mode: 'md',
      cssClass: 'avv-custom-modal',
      componentProps: {
        popUpData: POPUP_ERROR_LOGIN,
        onClick: jasmine.any(Function)
      }
    });
    expect(component.closeModal).toHaveBeenCalled();
    expect(modalPresentSpy.present).toHaveBeenCalled();
  });
});
