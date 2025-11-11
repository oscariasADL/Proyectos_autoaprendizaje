import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { RATES_URL } from '../../constants/pockets.constants';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import {
  REDIRECT_POCKET_ORGANIZER,
  REDIRECT_POCKET_RENTABILITY
} from '../../constants/create.constants';
import { CommonsModule } from '@app/commons/commons.module';

@Component({
  selector: 'app-pockets-onboarding',
  templateUrl: './pocket-create-onboarding.component.html',
  styleUrls: ['./pocket-create-onboarding.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GlobalPipesModule,
    HeadersModule,
    FeatureToggleDirective,
    CommonsModule
  ],
  providers: [PocketsFacade]
})
export class PocketCreateOnboardingComponent {
  @Input() withHeader: boolean = true;

  public readonly redirectPocketTag = REDIRECT_POCKET_RENTABILITY;
  public readonly redirectReturnsPocketTag = REDIRECT_POCKET_ORGANIZER;
  public readonly ratesURL = RATES_URL;
  protected readonly featureFlagsKey = FeatureFlagsKey;

  constructor(private facade: PocketsFacade) {}

  public openUrl(url: string) {
    this.facade.openExternalLinks(url);
  }
}
