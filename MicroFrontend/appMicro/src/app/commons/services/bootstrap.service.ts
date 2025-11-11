import { Injectable } from '@angular/core';
import { NewAppUpdateService } from '@commons/services/new-app-update.service';
import { OnboardingService } from '@commons/services/onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  constructor(
    private onboarding: OnboardingService,
    private newAppUpdate: NewAppUpdateService
  ) {}

  public async checkInit(): Promise<void> {
    this.newAppUpdate.checkNewAppUpdate();
    await this.onboarding.checkOnboarding();
  }
}
