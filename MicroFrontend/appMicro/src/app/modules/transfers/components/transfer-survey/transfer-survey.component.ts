import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormGroup } from '@angular/forms';
import { TransferSurveyQuestionService } from '@modules/transfers/service/transfer-survey-question.service';
import { TransferSurveyQuestionBase } from '@modules/transfers/entities/transfer-survey-question-base';
import { Observable } from 'rxjs';
import { ModalController } from '@commons/controllers/modal.controller';
import { TransferSurveyExitComponent } from '@modules/transfers/components/transfer-survey-exit/transfer-survey-exit.component';

@Component({
  selector: 'app-transfer-survey',
  templateUrl: './transfer-survey.component.html',
  styleUrls: ['./transfer-survey.component.sass'],
  providers: [TransferSurveyQuestionService]
})
export class TransferSurveyComponent {
  surveyMessage = new UntypedFormControl();
  questions$: Observable<TransferSurveyQuestionBase<any>[]>;
  @ViewChild('surveySlider') surveySlider;

  constructor(
    private questionService: TransferSurveyQuestionService,
    private modalCtrl: ModalController
  ) {
    this.questions$ = questionService.getQuestions();
  }

  public async closeModal(): Promise<any> {
    this.showSurveyExit().then((data) => {
      this.modalCtrl.dismiss(data);
    });
  }

  public async showSurveyExit(): Promise<any> {
    const exitModal = await this.modalCtrl.create({
      component: TransferSurveyExitComponent,
      componentProps: {},
      id: 'avv-transfer-survey-exit-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await exitModal.present();
    const data = await exitModal.onWillDismiss();
    if (data) {
      await this.modalCtrl.dismiss(data);
    }
  }
}
