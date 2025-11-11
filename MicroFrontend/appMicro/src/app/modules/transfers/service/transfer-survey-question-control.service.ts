import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';

import { TransferSurveyQuestionBase } from '../entities/transfer-survey-question-base';

@Injectable()
export class TransferSurveyQuestionControlService {
  public toFormGroup(questions: TransferSurveyQuestionBase<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required
        ? new UntypedFormControl(question.value || '', Validators.required)
        : new UntypedFormControl(question.value || '');
    });
    return new UntypedFormGroup(group);
  }
}
