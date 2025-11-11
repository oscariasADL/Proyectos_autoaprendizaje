import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SecureKeys } from '@commons/constants/keys.constants';
import {
  initAnalytics,
  logError,
  trackViewEvent
} from '@commons/helpers/event.helpers';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private userDocument: string;

  constructor(
    private router: Router,
    private secureStorage: AdlSecureStorageService
  ) {}

  public async initAnalytics(version: string): Promise<void> {
    await initAnalytics(version);
    this.listenRouterEvents();
  }

  private listenRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.snapshot.url.split('?')[0])
      )
      .subscribe((url) => trackViewEvent(url));
  }

  public async sendError(type: string, error: any): Promise<void> {
    if (isNullOrUndefinedOrEmpty(this.userDocument)) {
      const db = await this.secureStorage.getAll();
      const loginData = getDBValue(db, SecureKeys.loginData);
      this.setUserDocument(
        !isNullOrUndefinedOrEmpty(loginData)
          ? (JSON.parse(loginData) as LoginUserPayload)?.document
          : ' 0'
      );
    }

    logError(type, error, this.userDocument);
  }

  public setUserDocument(document: string | null): void {
    this.userDocument = document;
  }
}
