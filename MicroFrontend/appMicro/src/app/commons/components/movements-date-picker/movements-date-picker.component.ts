import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarComponent } from '@commons/components/calendar/calendar.component';
import { CalendarTypes } from '@commons/components/calendar/entities/calendar.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { MovementsDetailPayloadParams } from '@modules/movement/entities/movements-detail-payload.entity';
import { format, parseISO, subMonths } from 'date-fns';

@Component({
  selector: 'app-movements-date-picker',
  templateUrl: './movements-date-picker.component.html',
  styleUrls: ['./movements-date-picker.component.sass']
})
export class MovementsDatePickerComponent implements OnInit {
  @Input() date: Date;
  @Input() params: MovementsDetailPayloadParams;
  @Input() calendarDescription: string;
  @Input() monthsBackward: number;

  @Output()
  changeEvent: EventEmitter<MovementsDetailPayloadParams> =
    new EventEmitter<MovementsDetailPayloadParams>();

  public endDate: string;
  public startDate: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.endDate = this.params.endDate;
    this.startDate = this.params.startDate;
  }

  public formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  public formatDateToShow(date: string): string {
    return date && format(parseISO(date), 'dd/MM/yyyy');
  }

  public async openCalendar(
    calendarType: CalendarTypes = CalendarTypes.from
  ): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: CalendarComponent,
      componentProps: {
        data: {
          date: this.date,
          minDate: subMonths(this.date, this.monthsBackward),
          maxDate: this.date,
          setMinRange: parseISO(this.startDate),
          setMaxRange: parseISO(this.endDate),
          monthsBackward: this.monthsBackward,
          monthsForward: 0,
          format: 'dd/MM/yyyy',
          description: this.calendarDescription,
          calendarType
        },
        id: 'calendar-modal'
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (!isNullOrUndefined(data)) {
      const [startDate, endDate] = data;

      this.startDate = this.formatDate(startDate);
      this.endDate = this.formatDate(endDate);

      this.changeEvent.emit({
        startDate: this.startDate,
        endDate: this.endDate
      });
    }

    return data;
  }

  get calendarTypes(): typeof CalendarTypes {
    return CalendarTypes;
  }
}
