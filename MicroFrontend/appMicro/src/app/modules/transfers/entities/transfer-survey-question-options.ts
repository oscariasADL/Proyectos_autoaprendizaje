import { TransferSurveyQuestionBase } from './transfer-survey-question-base';

export class TransferSurveyQuestionOptions extends TransferSurveyQuestionBase<string> {
  override controlType = 'options';
}
