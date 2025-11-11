import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { ModalConfirmComponent } from './modal-confirm.component';

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [ModalConfirmComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should closeModal', async () => {
    expect(component.closeModal()).toBeUndefined();
  });

  it('should call close modal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
