import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Contributor } from '@modules/payments/payment-social-security/entities/social-security.interface';
import { StepperExceptions } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

@Component({
  selector: 'app-social-security-contributor',
  templateUrl: './social-security-contributor.component.html',
  styleUrls: ['./social-security-contributor.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialSecurityContributorComponent {
  @Input() form: UntypedFormGroup;
  @Input() contributors: Contributor[];
  @Input() workingContributors: boolean;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() exit: EventEmitter<string> = new EventEmitter<string>();

  public setContributor(contributor: Contributor): void {
    this.form.controls.contributor.setValue(contributor);
    this.continue.emit();
  }

  public closeStepper(): void {
    this.exit.emit(StepperExceptions.closeStepper);
  }
}
