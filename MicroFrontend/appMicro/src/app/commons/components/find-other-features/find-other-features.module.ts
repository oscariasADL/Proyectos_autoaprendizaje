import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FindOtherFeaturesComponent } from '@commons/components/find-other-features/find-other-features.component';
import { FindOtherFeaturesFacade } from '@commons/components/find-other-features/find-other-features.facade';

@NgModule({
  declarations: [FindOtherFeaturesComponent],
  exports: [FindOtherFeaturesComponent],
  imports: [CommonModule],
  providers: [FindOtherFeaturesFacade]
})
export class FindOtherFeaturesModule {}
