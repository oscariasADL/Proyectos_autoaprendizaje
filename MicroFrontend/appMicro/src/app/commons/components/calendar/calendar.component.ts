import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  CalendarProperties,
  CalendarTypes,
  Day
} from '@commons/components/calendar/entities/calendar.entities';
import { Calendar } from '@commons/components/calendar/utils/calendar';
import { ModalController } from '@commons/controllers/modal.controller';
import { StatusBarType } from '@commons/entities/header/status-bar.interface';
import { StatusBarService } from '@commons/services/status-bar.service';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendarMatrix', { static: false })
  public calendarMatrix: ElementRef;

  @Input() data: CalendarProperties;

  public calendar: Calendar;
  public locale: Locale = es;
  public activeType: CalendarTypes;

  constructor(
    private modalCtrl: ModalController,
    private statusbar: StatusBarService
  ) {}

  ngOnInit(): void {
    this.initCalendar();
    this.statusbar.setStatusbar(StatusBarType.red);
  }

  ngAfterViewInit(): void {
    this.scrollToMonthElement(this.calendar.anchor);
  }

  ngOnDestroy(): void {
    this.statusbar.setStatusbar(StatusBarType.white);
  }

  public closeModal(dates: Date[] = null): void {
    this.modalCtrl.dismiss(dates);
  }

  public active(status: CalendarTypes): void {
    this.activeType = status;
  }

  public selectDay(day: Day): void {
    if (!day.disabled) {
      if (this.activeType === CalendarTypes.from) {
        this.calendar.setMinRange(day.date);
        this.active(CalendarTypes.to);
      } else {
        this.calendar.setMaxRange(day.date);
        this.active(CalendarTypes.from);
      }
    }
  }

  private initCalendar(): void {
    this.calendar = new Calendar(
      this.data.date,
      this.data.monthsBackward,
      this.data.monthsForward
    );
    this.calendar.setLimitsDate(this.data.minDate, this.data.maxDate);
    this.calendar.setLocale(this.locale);
    this.calendar.setRangeFormat(this.data.format);
    this.calendar.setMinRange(this.data.setMinRange);
    this.calendar.setMaxRange(this.data.setMaxRange);
    this.active(this.data.calendarType);
  }

  private scrollToMonthElement(id: string): void {
    const month = this.calendarMatrix.nativeElement.querySelector(
      `.${id.toUpperCase()}`
    );
    const monthHeight = (
      document.getElementsByClassName('calendar-month')[0] as any
    ).offsetHeight;
    this.calendarMatrix.nativeElement.scrollTop =
      monthHeight < 300
        ? month.offsetTop
        : Math.floor(month.offsetTop / monthHeight) * monthHeight;
  }

  get calendarTypes(): typeof CalendarTypes {
    return CalendarTypes;
  }
}
