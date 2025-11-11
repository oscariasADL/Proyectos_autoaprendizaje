import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class FeatureToggleServiceMock {
  constructor(private router: Router) {}

  public listenRouterEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkPermissions());
  }

  public checkPermissions(): void {}
}
