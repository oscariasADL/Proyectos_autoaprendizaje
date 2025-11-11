import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TransferSurveyQuestionBase } from '@modules/transfers/entities/transfer-survey-question-base';
import { UntypedFormGroup } from '@angular/forms';
import { TransferSurveyQuestionControlService } from '@modules/transfers/service/transfer-survey-question-control.service';
import { AlertService } from '@commons/services/alert.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { TransferSurveySuccessComponent } from '@modules/transfers/components/transfer-survey-success/transfer-survey-success.component';
import { AppFacade } from '@app/app.facade';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import Swiper from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-transfer-survey-form',
  templateUrl: './transfer-survey-form.component.html',
  styleUrls: ['./transfer-survey-form.component.sass']
})
export class TransferSurveyFormComponent implements OnInit, AfterViewInit {
  @ViewChild('surveySlides', { static: false })
  swiperComponent: SwiperComponent;
  swiper: Swiper;
  @Input() questions: TransferSurveyQuestionBase<string>[] | null = [];
  @Output() questionResponse: EventEmitter<any> = new EventEmitter<any>();
  form!: UntypedFormGroup;
  payLoad: any = {};
  slides: number = 2;

  activeFeature: string;

  constructor(
    private transferSurveyControlService: TransferSurveyQuestionControlService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private facade: AppFacade,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit() {
    this.form = this.transferSurveyControlService.toFormGroup(this.questions);
    this.activeFeature = this.facade
      .boundsByKey('survey_active_feature', false)
      .toString()
      .toLowerCase();
  }

  ngAfterViewInit(): void {
    if (this.swiperComponent) {
      this.swiper = this.swiperComponent.swiperRef;
    }
  }

  public onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  public setValue(value, key): void {
    this.form.controls[key].setValue(value);
  }

  public isSelected(value, key): boolean {
    return this.form.controls[key].value === value;
  }

  public questionBelongsSlide(slide): any[] {
    return this.questions.filter((question) => question.slide === slide);
  }

  public getFormControl(key: string): AbstractControl {
    return this.form.get(key);
  }

  public validSlide(slideIdx: number): boolean {
    const questions = [...this.questionBelongsSlide(slideIdx)];
    for (const question of questions) {
      if (this.form.controls[question.key].invalid) {
        return false;
      }
    }
    return true;
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss();
    const currentDate = this.facade.date$.currentValue();
    await this.secureStorage.put(SecureKeys.surveyLastDate, currentDate, true);
    await this.showSurveySuccess();
  }

  public async showSurveySuccess(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TransferSurveySuccessComponent,
      componentProps: {},
      id: 'avv-transfer-survey-success-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
  }

  public slideNext(): void {
    this.swiper.slideNext();
  }

  public replaceSpecialCharacters(data: string): string {
    let str = data.trim();
    str = str.toLowerCase();
    const from =
      'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
    const to =
      'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '');
    return str;
  }
}
