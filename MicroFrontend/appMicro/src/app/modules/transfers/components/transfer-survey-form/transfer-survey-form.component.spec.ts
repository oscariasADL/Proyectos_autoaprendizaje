import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { TransferSurveyFormComponent } from './transfer-survey-form.component';
import { TransferSurveyQuestionControlService } from '@modules/transfers/service/transfer-survey-question-control.service';
import { AppFacade } from '@app/app.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';

import { TransferSurveyQuestionBase } from '@modules/transfers/entities/transfer-survey-question-base';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('TransferSurveyFormComponent', () => {
  let component: TransferSurveyFormComponent;
  let fixture: ComponentFixture<TransferSurveyFormComponent>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let modalSpy: jasmine.SpyObj<any>;
  let secureStorageSpy: jasmine.SpyObj<AdlSecureStorageService>;
  let questionControlServiceSpy: jasmine.SpyObj<TransferSurveyQuestionControlService>;
  let appFacadeSpy: jasmine.SpyObj<AppFacade>;

  const mockQuestions: TransferSurveyQuestionBase<string>[] = [
    new TransferSurveyQuestionBase({
      key: 'question1',
      label: 'First Question',
      required: true,
      slide: 0,
      controlType: 'text',
      type: 'text'
    }),
    new TransferSurveyQuestionBase({
      key: 'question2',
      label: 'Second Question',
      required: true,
      slide: 1,
      controlType: 'radio',
      type: 'radio',
      options: [
        { key: 'option1', value: 'Option 1' },
        { key: 'option2', value: 'Option 2' }
      ]
    })
  ];

  beforeEach(async () => {
    // Create spies for all dependencies
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

    secureStorageSpy = jasmine.createSpyObj('AdlSecureStorageService', ['put']);

    questionControlServiceSpy = jasmine.createSpyObj(
      'TransferSurveyQuestionControlService',
      ['toFormGroup']
    );

    appFacadeSpy = jasmine.createSpyObj('AppFacade', ['boundsByKey', 'date$'], {
      date$: { currentValue: () => new Date() }
    });

    await TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule, SwiperModule],
      declarations: [TransferSurveyFormComponent],
      providers: [
        {
          provide: TransferSurveyQuestionControlService,
          useValue: questionControlServiceSpy
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: AppFacade,
          useValue: appFacadeSpy
        },
        {
          provide: AdlSecureStorageService,
          useValue: secureStorageSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    const formGroup = new FormGroup({
      question1: new FormControl('', { validators: [] }),
      question2: new FormControl('', { validators: [] })
    });

    questionControlServiceSpy.toFormGroup.and.returnValue(formGroup);

    appFacadeSpy.boundsByKey.and.returnValue(1);

    fixture = TestBed.createComponent(TransferSurveyFormComponent);
    component = fixture.componentInstance;

    component.questions = mockQuestions;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Special Characters Replacement', () => {
    const testCases = [
      { input: 'Holá', expected: 'hola' },
      { input: 'São Paulo', expected: 'sao paulo' },
      { input: 'Águia', expected: 'aguia' },
      { input: '  Test  ', expected: 'test' }
    ];

    testCases.forEach((testCase) => {
      it(`should replace special characters in "${testCase.input}"`, () => {
        expect(component.replaceSpecialCharacters(testCase.input)).toEqual(
          testCase.expected
        );
      });
    });
  });

  describe('Form Interactions', () => {
    it('should set form control value', () => {
      component.setValue('testValue', 'question1');
      expect(component.form.get('question1').value).toBe('testValue');
    });

    it('should check if a value is selected', () => {
      component.setValue('selectedValue', 'question1');
      expect(component.isSelected('selectedValue', 'question1')).toBe(true);
      expect(component.isSelected('otherValue', 'question1')).toBe(false);
    });

    it('should filter questions by slide', () => {
      const filteredQuestions = component.questionBelongsSlide(0);
      expect(filteredQuestions.length).toBe(1);
      expect(filteredQuestions[0].key).toBe('question1');
    });

    it('should get form control', () => {
      const control = component.getFormControl('question1');
      expect(control).toBeTruthy();
    });
  });

  describe('Modal Interactions', () => {
    beforeEach(() => {
      modalCtrlSpy.dismiss.and.returnValue(Promise.resolve(true));
      modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));
      secureStorageSpy.put.and.returnValue(Promise.resolve(true));
    });

    it('should close modal and show survey success', async () => {
      await component.closeModal();

      expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
      expect(secureStorageSpy.put).toHaveBeenCalled();
      expect(modalCtrlSpy.create).toHaveBeenCalled();
    });

    it('should show survey success modal', async () => {
      await component.showSurveySuccess();

      expect(modalCtrlSpy.create).toHaveBeenCalledWith({
        component: jasmine.any(Function),
        componentProps: {},
        id: 'avv-transfer-survey-success-modal',
        mode: 'md',
        cssClass: 'avv-custom-modal'
      });
      expect(modalSpy.present).toHaveBeenCalled();
    });
  });

  describe('Slide Validation', () => {
    it('should validate slide correctly', () => {
      // Make a control invalid
      component.form.get('question2').setErrors({ required: true });

      expect(component.validSlide(0)).toBe(true);
      expect(component.validSlide(1)).toBe(false);
    });
  });

  describe('Component Initialization', () => {
    it('should set active feature on init', () => {
      expect(component.activeFeature).toBe('1');
    });

    it('should set form group on init', () => {
      expect(component.form).toBeTruthy();
      expect(questionControlServiceSpy.toFormGroup).toHaveBeenCalledWith(
        mockQuestions
      );
    });
  });
});
