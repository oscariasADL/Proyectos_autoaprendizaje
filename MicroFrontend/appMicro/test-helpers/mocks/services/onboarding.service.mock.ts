import { Injectable } from '@angular/core';

@Injectable()
export class OnboardingServiceMock {
  public async checkOnboarding(): Promise<any> {}

  public async setOnboardingComplete(): Promise<any> {}

  private async denyOnboarding(): Promise<boolean> {
    return true;
  }
}
