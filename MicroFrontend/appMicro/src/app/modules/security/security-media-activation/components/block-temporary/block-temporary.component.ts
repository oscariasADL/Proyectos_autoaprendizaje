import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { BlockTemporaryCalendarComponent } from '@modules/security/security-media-activation/components/block-temporary-calendar/block-temporary-calendar.component';
import {
  ActivationProduct,
  BlockTemporaryStep
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import {
  ActivateProductSteps,
  MediaStepsData
} from '@modules/security/security-media-activation/store/security-media.state';
import { addDays, getMonth, parseISO } from 'date-fns';

@Component({
  selector: 'app-block-temporary',
  templateUrl: './block-temporary.component.html',
  styleUrls: ['./block-temporary.component.sass']
})
export class BlockTemporaryComponent {
  @Input() product: ActivationProduct;

  @Output()
  continue: EventEmitter<MediaStepsData> = new EventEmitter<MediaStepsData>();

  public dateControl: UntypedFormControl = new UntypedFormControl();
  public step: BlockTemporaryStep = BlockTemporaryStep.ChooseDate;

  constructor(
    private modalCtrl: ModalController,
    private facade: SecurityMediaActivationFacade
  ) {}

  public changeStep(step: BlockTemporaryStep): void {
    this.step = step;
  }

  public blockProduct(): void {
    if (this.dateControl.valid) {
      this.continue.emit({
        step: ActivateProductSteps.sendBlockTemporary,
        data: this.dateControl.value.split('/').reverse().join('-')
      });
    }
  }

  public async openCalendar(): Promise<void> {
    const date = parseISO(this.currentDate);
    const maxDate = addDays(date, 7);
    const monthsForward = getMonth(date) !== getMonth(maxDate) ? 1 : 0;

    const modal = await this.modalCtrl.create({
      component: BlockTemporaryCalendarComponent,
      componentProps: {
        data: {
          date,
          minDate: date,
          maxDate,
          setMinRange: date,
          monthsBackward: 0,
          monthsForward,
          format: 'dd/MM/yyyy'
        },
        maxDateSelected: this.dateControl?.value,
        id: 'temporary-block-calendar-modal'
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (!isNullOrUndefined(data)) {
      this.dateControl.setValue(data);
    }
  }

  get currentDate(): string {
    return this.facade.date$.currentValue();
  }

  get blockTemporaryStep(): typeof BlockTemporaryStep {
    return BlockTemporaryStep;
  }
}
