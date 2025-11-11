import { inject, Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { LOGOUT_BY_INACTIVITY } from '@commons/constants/navigate.constants';
import { removeSubscriptions } from '@commons/utils/util';
import { NavController } from '@ionic/angular';
import { ConfigState } from '@store/state/config.state';
import { UserIdleService } from 'angular-user-idle';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LogSeverity } from './log-manager-service/entities/log-manager-service.interface';
import { NewRelicService } from './new-relic/new-relic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTimerService {
  private hasActivityEvent: boolean = false;
  private subscriptions: Subscription[] = [];
  private newRelicService = inject(NewRelicService);

  constructor(
    private facade: AppFacade,
    private navCtrl: NavController,
    private userIdle: UserIdleService
  ) {
    this.initTimer();
  }

  private initTimer(): void {
    this.facade.config$
      .pipe(filter((state: ConfigState) => state.completed))
      .subscribe((data) => {
        const { idleTime: idle, pingTime: ping, timeout } = data.config;

        this.userIdle.setConfigValues({
          idle,
          ping,
          timeout
        });

        this.userIdle.setCustomActivityEvents(this.events$);

        this.restart();
        this.startWatching();

        removeSubscriptions(this.subscriptions);

        this.subscriptions.push(
          this.userIdlePing$().subscribe(),
          this.listenActivityEvents$().subscribe(),
          this.userIdle.onTimerStart().subscribe(),
          this.userIdle.onTimeout().subscribe(() => this.onTimeout())
        );
      });
  }

  public startWatching(): void {
    this.userIdle.startWatching();
  }

  public stopWatching(): void {
    this.userIdle.stopWatching();
    removeSubscriptions(this.subscriptions);
  }

  public stop(): void {
    this.userIdle.stopTimer();
  }

  public restart(): void {
    this.userIdle.resetTimer();
  }

  private onTimeout(): void {
    this.presentLogoutPanel().then();
  }

  private listenActivityEvents$(): Observable<Event> {
    return this.events$.pipe(tap(() => (this.hasActivityEvent = true)));
  }

  private userIdlePing$(): Observable<Event> {
    return this.userIdle.ping$.pipe(
      filter(() => this.hasActivityEvent),
      tap(() => (this.hasActivityEvent = false)),
      tap(() => this.facade.dispatchPing())
    );
  }

  private async presentLogoutPanel(): Promise<void> {
    this.facade.logout(false);
    this.newRelicService.recordEvent(LogSeverity.INFO, 'Logout', '', {
      fileName: 'auth-timer.service.ts',
      functionName: 'presentLogoutPanel',
      customMessage: `Testing logout by inactivity function`
    });
    await this.navCtrl.navigateRoot(LOGOUT_BY_INACTIVITY);
  }

  get events$(): Observable<Event> {
    return merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'touchstart'),
      fromEvent(document, 'touchend'),
      fromEvent(document, 'keydown'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize')
    );
  }
}
