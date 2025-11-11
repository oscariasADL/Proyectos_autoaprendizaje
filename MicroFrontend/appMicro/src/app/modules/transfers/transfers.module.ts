import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { TransfersService } from '@modules/transfers/service/transfers.service';
import { TransfersEffect } from '@modules/transfers/store/transfers.effect';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { EffectsModule } from '@ngrx/effects';

import { TransfersRoutingModule } from './transfers-routing.module';
import { TransferSurveyComponent } from './components/transfer-survey/transfer-survey.component';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferSurveyFormComponent } from './components/transfer-survey-form/transfer-survey-form.component';
import { TransferSurveyQuestionService } from '@modules/transfers/service/transfer-survey-question.service';
import { TransferSurveyQuestionControlService } from '@modules/transfers/service/transfer-survey-question-control.service';
import { TransferSurveyExitComponent } from './components/transfer-survey-exit/transfer-survey-exit.component';
import { TransferSurveySuccessComponent } from './components/transfer-survey-success/transfer-survey-success.component';
import { CommonsModule } from '@commons/commons.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    TransferSurveyComponent,
    TransferSurveyFormComponent,
    TransferSurveyExitComponent,
    TransferSurveySuccessComponent
  ],
  imports: [
    CommonModule,
    TransfersRoutingModule,
    EffectsModule.forFeature([TransfersEffect]),
    VoucherModule,
    FormsAvvModule,
    IonicModule,
    ReactiveFormsModule,
    CommonsModule,
    SwiperModule
  ],
  exports: [VoucherModule],
  providers: [
    TransfersFacade,
    TransfersService,
    TransferSurveyQuestionService,
    TransferSurveyQuestionControlService
  ]
})
export class TransfersModule {}
