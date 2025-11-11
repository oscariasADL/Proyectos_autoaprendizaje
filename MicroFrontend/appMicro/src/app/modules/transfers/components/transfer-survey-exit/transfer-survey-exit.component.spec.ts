import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSurveyExitComponent } from './transfer-survey-exit.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('TransferSurveyExitComponent', () => {
  let component: TransferSurveyExitComponent;
  let fixture: ComponentFixture<TransferSurveyExitComponent>;
  let modalCtrlSpy;

  beforeEach(async () => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    await TestBed.configureTestingModule({
      declarations: [TransferSurveyExitComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSurveyExitComponent);
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
