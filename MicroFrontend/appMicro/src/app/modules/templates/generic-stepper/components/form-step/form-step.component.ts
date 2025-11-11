import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  GenericStepData,
  StepperExceptions
} from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.sass']
})
export class FormStepComponent implements OnInit {
  @Input() data: GenericStepData;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();

  public form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  public setNextStep(): void {
    this.nextStep.emit();
  }

  public closeStepper(): void {
    this.nextStep.emit(StepperExceptions.closeStepper);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({});
    this.data.form.forEach((item, index) => {
      this.form.addControl(index.toString(), item.control);
    });
  }
}
