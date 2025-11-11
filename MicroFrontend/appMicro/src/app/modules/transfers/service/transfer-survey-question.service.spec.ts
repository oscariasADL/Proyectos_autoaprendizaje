import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { TransferSurveyQuestionControlService } from './transfer-survey-question-control.service';
import { TransferSurveyQuestionBase } from '../entities/transfer-survey-question-base';
describe('TransferSurveyQuestionControlService - toFormGroup()', () => {
  let service: TransferSurveyQuestionControlService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferSurveyQuestionControlService]
    });
    service = TestBed.inject(TransferSurveyQuestionControlService);
  });
  it('should create a form group with controls for each question', () => {
    const questions: TransferSurveyQuestionBase<string>[] = [
      new TransferSurveyQuestionBase<string>({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: 'string',
        value: 'Alice'
      }),
      new TransferSurveyQuestionBase<string>({
        key: 'age',
        label: 'Age',
        required: false,
        order: 2,
        controlType: 'number',
        type: 'string',
        value: '30'
      })
    ];
    const formGroup: UntypedFormGroup = service.toFormGroup(questions);
    // Verify controls exist
    expect(formGroup.contains('name')).toBeTruthy();
    expect(formGroup.contains('age')).toBeTruthy();
  });
  it('should add required validator to controls for required questions', () => {
    const questions: TransferSurveyQuestionBase<string>[] = [
      new TransferSurveyQuestionBase<string>({
        key: 'email',
        label: 'Email',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: 'string',
        value: ''
      })
    ];
    const formGroup: UntypedFormGroup = service.toFormGroup(questions);
    const control = formGroup.get('email') as UntypedFormControl;
    // Setting an empty value should trigger the required validator's error
    control.setValue('');
    expect(control.valid).toBeFalsy();
    expect(control.errors).toEqual({ required: true });
  });
  it('should not add required validator to controls for optional questions', () => {
    const questions: TransferSurveyQuestionBase<string>[] = [
      new TransferSurveyQuestionBase<string>({
        key: 'nickname',
        label: 'Nickname',
        required: false,
        order: 1,
        controlType: 'textbox',
        type: 'string',
        value: ''
      })
    ];
    const formGroup: UntypedFormGroup = service.toFormGroup(questions);
    const control = formGroup.get('nickname') as UntypedFormControl;
    // The control should be valid even if empty because it is not required
    control.setValue('');
    expect(control.valid).toBeTruthy();
    expect(control.errors).toBeNull();
  });
  it('should assign the initial value to controls', () => {
    const questions: TransferSurveyQuestionBase<string>[] = [
      new TransferSurveyQuestionBase<string>({
        key: 'city',
        label: 'City',
        required: false,
        order: 1,
        controlType: 'textbox',
        type: 'string',
        value: 'Madrid'
      })
    ];
    const formGroup: UntypedFormGroup = service.toFormGroup(questions);
    const control = formGroup.get('city') as UntypedFormControl;
    expect(control.value).toBe('Madrid');
  });
});
