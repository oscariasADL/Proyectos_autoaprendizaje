import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSurveySuccessComponent } from './transfer-survey-success.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('TransferSurveySuccessComponent', () => {
  let component: TransferSurveySuccessComponent;
  let fixture: ComponentFixture<TransferSurveySuccessComponent>;
  let modalCtrlSpy;

  beforeEach(async () => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    await TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      declarations: [TransferSurveySuccessComponent],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSurveySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close modal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
