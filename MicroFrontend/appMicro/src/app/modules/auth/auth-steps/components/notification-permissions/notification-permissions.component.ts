import { Component, Injector, OnInit } from '@angular/core';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { Actions, ofType } from '@ngrx/effects';
import * as pushNotificationRegisterActions from '@store/actions/push-notification-register.actions';
import { merge, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';

@Component({
  selector: 'app-notification-permissions',
  templateUrl: './notification-permissions.component.html',
  styleUrls: ['./notification-permissions.component.sass']
})
export class NotificationPermissionsComponent
  extends AuthStepsBase
  implements OnInit
{
  private actionsGroup$: Observable<any>;

  constructor(protected injector: Injector, private actions$: Actions) {
    super(injector);
    this.actionsGroup$ = merge(
      this.actions$.pipe(
        ofType(
          pushNotificationRegisterActions.togglePushNotificationsSuccessAction
        )
      ),
      this.actions$.pipe(
        ofType(
          pushNotificationRegisterActions.togglePushNotificationsErrorAction
        )
      ),
      this.actions$.pipe(
        ofType(
          pushNotificationRegisterActions.togglePushNotificationsPermissionErrorAction
        )
      )
    );
  }

  ngOnInit(): void {
    this.actionsGroup$.pipe(take(1)).subscribe((action: any) => {
      switch (action.type) {
        case pushNotificationRegisterActions
          .togglePushNotificationsSuccessAction.type:
          this.run(action?.deviceToken);
          break;
        case pushNotificationRegisterActions.togglePushNotificationsErrorAction
          .type:
        case pushNotificationRegisterActions
          .togglePushNotificationsPermissionErrorAction.type:
          this.run(null);
          break;
      }
    });
    this.facade.dispatch([
      pushNotificationRegisterActions.togglePushNotificationsAction({
        action: TogglePushNotificationsType.ENABLE,
        updateProvider: false
      })
    ]);
  }

  public run(firebaseToken: string): void {
    this.method({
      processId: this.data.processId,
      content: { firebaseToken }
    });
  }

  get method(): any {
    return this.routeData.method;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
