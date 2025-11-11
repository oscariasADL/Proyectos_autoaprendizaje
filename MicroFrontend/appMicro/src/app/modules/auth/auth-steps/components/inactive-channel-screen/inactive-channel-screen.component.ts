import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';

@Component({
  selector: 'app-inactive-channel-screen',
  templateUrl: './inactive-channel-screen.component.html',
  styleUrls: ['./inactive-channel-screen.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InactiveChannelScreenComponent extends AuthStepsBase {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public run(type: boolean): void {
    this.method({
      processId: this.data.processId,
      content: {
        agree: type
      }
    });
  }

  public redirectLink(): void {
    this.facade.redirectExternal(LinkKey.linkOfficeMap);
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
