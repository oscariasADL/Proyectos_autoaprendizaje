import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthStepsModule } from '@modules/auth/auth-steps/auth-steps.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { SilentEnrollmentGuard } from './guards/silent-enrollment.guard';
import { SilentEnrollmentResolver } from './guards/silent-enrollment.resolver';
import { SilentEnrollmentRoutingModule } from './silent-enrollment-routing.module';
import { SilentEnrollmentFacade } from './silent-enrollment.facade';
import { SilentEnrollmentService } from './silent-enrollment.service';
import { SilentEnrollmentEffect } from './store/silent-enrollment.effect';
import { silentEnrollmentReducer } from './store/silent-enrollment.reducer';
import {
  silentEnrollmentFeatureName,
  SilentEnrollmentState
} from './store/silent-enrollment.state';

export const SILENT_ENROLLMENT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<SilentEnrollmentState>
>('Forgot Password Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SilentEnrollmentRoutingModule,
    StoreModule.forFeature(
      silentEnrollmentFeatureName,
      SILENT_ENROLLMENT_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([SilentEnrollmentEffect]),
    AuthStepsModule
  ],
  providers: [
    SilentEnrollmentGuard,
    SilentEnrollmentFacade,
    SilentEnrollmentService,
    SilentEnrollmentResolver,
    {
      provide: SILENT_ENROLLMENT_REDUCER_TOKEN,
      useValue: silentEnrollmentReducer
    }
  ]
})
export class SilentEnrollmentModule {}
