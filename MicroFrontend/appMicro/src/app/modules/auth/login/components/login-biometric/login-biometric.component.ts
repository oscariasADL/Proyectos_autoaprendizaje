import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { BiometricService } from '@commons/services/biometric.service';
import { removeSubscriptions } from '@commons/utils/util';
import {
  BiometricIcons,
  BiometricType
} from '@modules/auth/login/entities/biometric.interface';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { Actions } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-biometric',
  templateUrl: './login-biometric.component.html',
  styleUrls: ['./login-biometric.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginBiometricComponent implements OnDestroy {
  @Output() loginUser: EventEmitter<string> = new EventEmitter<string>();

  private subscriptions: Subscription[] = [];

  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private biometric: BiometricService
  ) {}

  /* ngAfterViewInit(): void {
     this.subscriptions.push(
       this.biometric.hasLoaded$
         .pipe(
           filter((loaded) => loaded),
           filter(
             () =>
               !this.route.snapshot.queryParams.hasOwnProperty('no-biometric')
           ),
           take(1)
         )
         .subscribe(() => this.runBiometric())
     );
   }*/

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public async runBiometric(): Promise<void> {
    const loginData: LoginUserPayload = await this.biometric.useBiometric();
    if (!isNullOrUndefined(loginData)) {
      this.loginUser.emit(loginData.password);
    }
  }

  get biometricIcon$(): Observable<string> {
    return this.biometricType$.pipe(
      map((type: BiometricType) => BiometricIcons[type])
    );
  }

  get hasBiometricRegistered$(): Observable<boolean> {
    return this.biometric.hasBiometricRegistered$;
  }

  get biometricType$(): Observable<BiometricType> {
    return this.biometric.biometricType$;
  }
}
