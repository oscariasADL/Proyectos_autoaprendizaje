import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BlockCardTemporarilyForm } from '@modules/product-options/block-card-temporarily/entities/block-card-temporarily.interface';
import { addDays, getMonth, parseISO } from 'date-fns';
import { BlockCardTemporarilyFacade } from '@modules/product-options/block-card-temporarily/block-card-temporarily.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { BlockTemporaryCalendarComponent } from '@modules/security/security-media-activation/components/block-temporary-calendar/block-temporary-calendar.component';

@Component({
  selector: 'app-block-card-temporarily-date',
  templateUrl: './block-card-temporarily-date.component.html',
  styleUrls: ['./block-card-temporarily-date.component.sass']
})
export class BlockCardTemporarilyDateComponent {
  @Input() form: FormGroup<BlockCardTemporarilyForm>;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private modalCtrl: ModalController,
    private facade: BlockCardTemporarilyFacade
  ) {}

  public async openCalendar(): Promise<void> {
    const date = parseISO(this.currentDate);
    const maxDate = addDays(date, 7);
    const monthsForward = getMonth(date) !== getMonth(maxDate) ? 1 : 0;
    const modal = await this.modalCtrl.create({
      component: BlockTemporaryCalendarComponent,
      componentProps: {
        data: {
          date: date,
          minDate: date,
          maxDate,
          setMinRange: date,
          monthsBackward: 0,
          monthsForward: monthsForward,
          format: 'dd/MM/yyyy'
        },
        maxDateSelected: this.endDateControl.value,
        id: 'temporary-block-calendar-modal'
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.endDateControl.setValue(data);
    }
  }

  get currentDate(): string {
    return this.facade.date$.currentValue();
  }

  get endDateControl(): AbstractControl {
    return this.form.get('endDate');
  }

  get activationProductControl(): AbstractControl {
    return this.form.get('activationProduct');
  }
}
