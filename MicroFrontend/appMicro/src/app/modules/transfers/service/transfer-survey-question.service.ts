import { Injectable } from '@angular/core';
import { TransferSurveyQuestionBase } from '@modules/transfers/entities/transfer-survey-question-base';
import { TransferSurveyQuestionOptions } from '@modules/transfers/entities/transfer-survey-question-options';
import { TransferSurveyQuestionText } from '@modules/transfers/entities/transfer-survey-question-text';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferSurveyQuestionService {
  public getQuestions(): Observable<any> {
    const questions: TransferSurveyQuestionBase<string>[] = [
      new TransferSurveyQuestionOptions({
        key: 'transfer-survey-question-1',
        label: '¿La transferencia fue fácil de completar?',
        required: true,
        options: [
          { key: '1', value: '1' },
          { key: '2', value: '2' },
          { key: '3', value: '3' },
          { key: '4', value: '4' },
          { key: '5', value: '5' }
        ],
        order: 1,
        slide: 1
      }),

      new TransferSurveyQuestionOptions({
        key: 'transfer-survey-question-2',
        label: '¿La transferencia te generó confianza?',
        required: true,
        options: [
          { key: '1', value: '1' },
          { key: '2', value: '2' },
          { key: '3', value: '3' },
          { key: '4', value: '4' },
          { key: '5', value: '5' }
        ],
        order: 2,
        slide: 1
      }),

      new TransferSurveyQuestionOptions({
        key: 'transfer-survey-question-3',
        label: '¿La experiencia con la transferencia fue satisfactoria?',
        required: true,
        options: [
          { key: '1', value: '1' },
          { key: '2', value: '2' },
          { key: '3', value: '3' },
          { key: '4', value: '4' },
          { key: '5', value: '5' }
        ],
        order: 3,
        slide: 2
      }),

      new TransferSurveyQuestionText({
        title: 'Dejanos saber tu opinión',
        key: 'transfer-survey-question-4',
        label: 'Escribir mensaje',
        type: 'text',
        order: 3,
        slide: 2
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
