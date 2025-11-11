import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';

import { AppFacade } from '@app/app.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Directive({
  selector: '[appFeatureToggle]',
  standalone: true
})
export class FeatureToggleDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private facade: AppFacade
  ) {}

  @Input() set appFeatureToggle(key: FeatureFlagsKey) {
    this.getFeatureToggleWithParameterization(key);
  }

  private setView() {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  }

  private getFeatureToggleWithParameterization(key: FeatureFlagsKey) {
    this.facade
      .isFeatureFlagEnabled(key)
      .pipe(take(1))
      .subscribe((isEnabled) => {
        if (isEnabled && !this.hasView) {
          this.setView();
        } else if (!isEnabled && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }
}
