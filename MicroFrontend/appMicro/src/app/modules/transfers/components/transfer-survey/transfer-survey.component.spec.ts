import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSurveyComponent } from './transfer-survey.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TransferSurveyComponent', () => {
  let component: TransferSurveyComponent;
  let fixture: ComponentFixture<TransferSurveyComponent>;
  let modalCtrlSpy;
  let modalSpy;

  beforeEach(async () => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'create',
      'dismiss',
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    await TestBed.configureTestingModule({
      declarations: [TransferSurveyComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close modal', async () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: null
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(await component.closeModal()).toBeUndefined();
  });

  it('should showSurveyExit', async () => {
    modalSpy.onDidDismiss.and.callFake(async () => true);
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });

    expect(await component.showSurveyExit()).toBeUndefined();
  });
});
