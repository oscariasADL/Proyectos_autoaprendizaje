import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WithdrawalChannelsStepFacade } from '@modules/templates/generic-stepper/components/withdrawal-channels-step/withdrawal-channels-step.facade';
import { GenericStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-withdrawal-channels-step',
  templateUrl: './withdrawal-channels-step.component.html',
  styleUrls: ['./withdrawal-channels-step.component.sass']
})
export class WithdrawalChannelsStepComponent {
  @Input() data: GenericStepData;

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  constructor(private facade: WithdrawalChannelsStepFacade) {}

  public setWithdrawalChannel(channel: string): void {
    this.data.control.setValue(channel);
    this.data.control.markAsDirty();
    this.nextStep.emit();
  }

  get withdrawalChannels$(): Observable<any> {
    return this.facade.withdrawalChannels$;
  }
}
