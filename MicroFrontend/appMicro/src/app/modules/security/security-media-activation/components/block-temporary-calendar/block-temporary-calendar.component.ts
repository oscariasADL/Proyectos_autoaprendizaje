import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  CalendarProperties,
  CalendarTypes,
  Day
} from '@commons/components/calendar/entities/calendar.entities';
import { Calendar } from '@commons/components/calendar/utils/calendar';
import { ModalController } from '@commons/controllers/modal.controller';
import { StatusBarType } from '@commons/entities/header/status-bar.interface';
import { StatusBarService } from '@commons/services/status-bar.service';
import { format, getDayOfYear } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-block-temporary-calendar',
  templateUrl: './block-temporary-calendar.component.html',
  styleUrls: ['./block-temporary-calendar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockTemporaryCalendarComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('calendarMatrix', { static: false })
  public calendarMatrix: ElementRef;

  @Input() data: CalendarProperties;
  @Input() maxDateSelected: string;

  public calendar: Calendar;
  public locale: Locale = es;
  public dateControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    private modalCtrl: ModalController,
    private statusbar: StatusBarService
  ) {}

  ngOnInit(): void {
    this.initCalendar();
    this.initMaxDateSelected();
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

  public selectDay(day: Day): void {
    if (
      !day.disabled &&
      getDayOfYear(day.date) !== getDayOfYear(this.data.minDate)
    ) {
      this.calendar.setMaxRange(day.date);
      this.dateControl.setValue(format(day.date, 'dd/MM/yyyy'));
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
    if (this.maxDateSelected) {
      const [day, month, year] = this.maxDateSelected.split('/');
      this.calendar.setMaxRange(new Date(+year, +month - 1, +day));
    }
  }

  private initMaxDateSelected(): void {
    if (this.maxDateSelected) {
      this.dateControl.setValue(this.maxDateSelected);
    }
  }

  private scrollToMonthElement(id: string): void {
    const month = this.calendarMatrix.nativeElement.querySelector(
      `.${id.toUpperCase()}`
    );
    const monthHeight = (
      document.getElementsByClassName(
        'block-temporary-calendar-month'
      )[0] as any
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
