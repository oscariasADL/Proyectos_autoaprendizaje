import { Component, Injector } from '@angular/core';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';

@Component({
  selector: 'app-confirm-process-start',
  templateUrl: './confirm-process-start.component.html',
  styleUrls: ['confirm-process-start.component.sass']
})
export class ConfirmProcessStartComponent extends AuthStepsBase {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public run(confirm: boolean): void {
    this.method({
      processId: this.data.processId,
      content: {
        confirmDecisionStartProcess: confirm
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
