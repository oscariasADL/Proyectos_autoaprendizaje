import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';

@Component({
  selector: 'app-request-product-validation',
  templateUrl: './request-product-validation.component.html',
  styleUrls: ['./request-product-validation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestProductValidationComponent extends AuthStepsBase {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public run(startProductValidation: boolean): void {
    this.method({
      processId: this.data.processId,
      content: {
        startProductValidation
      }
    });
  }

  get method(): any {
    return this.routeData.method;
  }

  get title(): string {
    return this.routeData.title;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
