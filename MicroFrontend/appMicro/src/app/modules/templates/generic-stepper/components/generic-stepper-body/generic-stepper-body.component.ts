import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { SlideType, Step } from '@modules/forms-avv/entities/stepper.interface';
import { INITIAL_SLIDER_OPTIONS } from '@modules/templates/generic-stepper/constants/generic-stepper.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import Swiper from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-generic-stepper-body',
  templateUrl: './generic-stepper-body.component.html',
  styleUrls: ['./generic-stepper-body.component.sass']
})
export class GenericStepperBodyComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperComponent: SwiperComponent;
  swiper: Swiper;

  @Input() steps: Step[];
  @Input() data: GenericStepperData;
  @Input() showSteps: boolean = true;
  @Input() template: TemplateRef<any>;
  @Input() utagCategory: string | null = null;

  @Input()
  set currentSlide(slideName: string) {
    this._nextSlide = this.slidesKey.indexOf(slideName);
    this.currentStep = this.data[slideName]?.step ?? 1;
    this.setCurrentSlide(this._currentSlide, this._nextSlide);
    this.moveToSlide();
  }

  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() stepSelected: EventEmitter<Step> = new EventEmitter<Step>();
  @Output() slideSelected: EventEmitter<string> = new EventEmitter<string>();

  public slideOpts: any;
  public currentStep: number = 0;

  private _nextSlide: number = 0;
  private _currentSlide: number = 0;

  ngOnInit(): void {
    this.initSliderOptions();
  }

  ngAfterViewInit(): void {
    if (this.swiperComponent) {
      this.swiper = this.swiperComponent.swiperRef;
    }
  }

  public setCurrentSlide(
    currentSlide: number = this._nextSlide,
    nextSlide: number = null
  ): void {
    this._currentSlide = currentSlide;
    this._nextSlide = nextSlide;
  }

  public setNextStep(slide: string, value: any = null): void {
    this.nextStep.emit({ slide, value });
  }

  public setSlideSelected(slide: string): void {
    this.slideSelected.emit(slide);
  }

  public isVisible(index: number): boolean {
    return index === this._currentSlide || index === this._nextSlide;
  }

  private moveToSlide(
    slide: number = this._nextSlide,
    speed: number = 500
  ): void {
    if (this.swiper) {
      this.swiper.slideTo(slide, speed);
    }
  }

  private initSliderOptions(): void {
    this.slideOpts = {
      ...INITIAL_SLIDER_OPTIONS,
      initialSlide: this.currentStep
    };
  }

  get slidesKey(): string[] {
    return Object.keys(this.data);
  }

  get stepType(): typeof SlideType {
    return SlideType;
  }
}
