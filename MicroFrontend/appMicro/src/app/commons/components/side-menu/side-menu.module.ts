import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClearDataModule } from '@commons/components/clear-data/clear-data.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { SideMenuComponent } from './side-menu.component';
import { SideMenuFacade } from './side-menu.facade';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    GlobalPipesModule,
    ClearDataModule,
    FeatureToggleDirective
  ],
  exports: [SideMenuComponent],
  providers: [SideMenuFacade]
})
export class SideMenuModule {}
