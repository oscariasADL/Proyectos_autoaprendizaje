import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TelephoneCompaniesStepFacade } from '@modules/templates/generic-stepper/components/telephone-companies-step/telephone-companies-step.facade';
import { GenericStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-telephone-companies-step',
  templateUrl: './telephone-companies-step.component.html',
  styleUrls: ['./telephone-companies-step.component.sass']
})
export class TelephoneCompaniesStepComponent {
  @Input() data: GenericStepData;

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  constructor(private facade: TelephoneCompaniesStepFacade) {}

  public setMobileOperator(operator: string): void {
    this.data.control.setValue(operator);
    this.data.control.markAsDirty();
    this.nextStep.emit();
  }

  get mobileOperators$(): Observable<any> {
    return this.facade.mobileOperators$;
  }
}
