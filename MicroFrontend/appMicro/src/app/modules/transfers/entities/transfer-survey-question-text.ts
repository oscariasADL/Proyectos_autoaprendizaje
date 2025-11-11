import { TransferSurveyQuestionBase } from './transfer-survey-question-base';

export class TransferSurveyQuestionText extends TransferSurveyQuestionBase<string> {
  override controlType = 'textbox';
}
