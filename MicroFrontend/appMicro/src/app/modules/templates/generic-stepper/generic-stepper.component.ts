import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { HeaderType } from '@app/commons/entities/header/header.interface';
import { HOME } from '@commons/constants/navigate.constants';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { NavController, Platform } from '@ionic/angular';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  GenericStepperData,
  StepperExceptions
} from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-generic-stepper',
  templateUrl: './generic-stepper.component.html',
  styleUrls: ['./generic-stepper.component.sass']
})
export class GenericStepperComponent implements OnInit, OnChanges, OnDestroy {
  @Input() form: UntypedFormGroup;
  @Input() data: GenericStepperData;
  @Input() title: string;
  @Input() steps: Step[];
  @Input() currentSlide: string;
  @Input() backUrl: string[] = HOME;
  @Input() exitUrl: string[] = null;
  @Input() showSteps: boolean = true;
  @Input() exitData: AlertSheetProperties;
  @Input() template: TemplateRef<any>;
  @Input() utagCategory: string | null = null;
  @Input() headerType: HeaderType = HeaderType.whitePrimary;
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() stepSelected: EventEmitter<Step> = new EventEmitter<Step>();
  @Output() slideSelected: EventEmitter<string> = new EventEmitter<string>();

  private slideStack: string[] = [];
  private subscription: Subscription;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private alertService: AlertService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        this.backClick();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentSlide) {
      this.setSlideStack(changes.currentSlide.currentValue);
    }
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public runNextStep(data: any): void {
    const { value } = data;
    if (value === StepperExceptions.closeStepper) {
      this.closeClick();
    } else {
      this.nextStep.emit(data);
    }
  }

  public backClick(): void {
    if (this.slideStack.length > 1) {
      this.slideStack.pop();
      this.slideSelected.emit(this.slideStack[this.slideStack.length - 1]);
    } else {
      this.closeClick();
    }
  }

  public async closeClick(): Promise<void> {
    if (this.form.dirty) {
      if (!this.alertService.alreadyPresent) {
        const response = await this.alertService.create(this.exitData);
        if (response) {
          this.navigateToExitUrl();
        }
      } else {
        void this.alertService.close();
      }
    } else {
      this.navigateToExitUrl();
    }
  }

  private navigateToExitUrl(): void {
    if (this.exitUrl) {
      void this.navCtrl.navigateBack(this.exitUrl);
    } else {
      this.location.back();
    }
  }

  private setSlideStack(slide: string): void {
    const slideIndex = this.slideStack.indexOf(slide);
    if (slideIndex === -1) {
      this.slideStack.push(slide);
    } else {
      this.slideStack = this.slideStack.slice(0, slideIndex + 1);
    }
  }
}
