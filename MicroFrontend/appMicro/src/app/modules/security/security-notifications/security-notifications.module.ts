import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { SecurityNotificationsConfirmComponent } from '@modules/security/security-notifications/components/security-notifications-confirm/security-notifications-confirm.component';
import { SecurityNotificationsResultComponent } from '@modules/security/security-notifications/components/security-notifications-result/security-notifications-result.component';
import { SecurityNotificationsFacade } from '@modules/security/security-notifications/security-notifications.facade';
import { SecurityNotificationsService } from '@modules/security/security-notifications/services/security-notifications.service';
import { SecurityNotificationsEffect } from '@modules/security/security-notifications/store/security-notifications.effect';
import { securityNotificationsReducer } from '@modules/security/security-notifications/store/security-notifications.reducer';
import { securityNotificationsFeatureName } from '@modules/security/security-notifications/store/security-notifications.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NotificationsState } from '@store/state/notifications.state';

import { SecurityNotificationsPageRoutingModule } from './security-notifications-routing.module';

import { SecurityNotificationsPage } from './security-notifications.page';

export const SECURITY_NOTIFICATIONS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<NotificationsState>
>('Notifications Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityNotificationsPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    StoreModule.forFeature(
      securityNotificationsFeatureName,
      SECURITY_NOTIFICATIONS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([SecurityNotificationsEffect])
  ],
  declarations: [
    SecurityNotificationsPage,
    SecurityNotificationsResultComponent,
    SecurityNotificationsConfirmComponent
  ],
  providers: [
    SecurityNotificationsFacade,
    SecurityNotificationsService,
    {
      provide: SECURITY_NOTIFICATIONS_REDUCER_TOKEN,
      useValue: securityNotificationsReducer
    }
  ]
})
export class SecurityNotificationsPageModule {}
