import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsServiceMock {
  public async initAnalytics(version: string): Promise<void> {}

  private listenRouterEvents(): void {}

  public async sendError(type: string, error: any): Promise<void> {}
}
