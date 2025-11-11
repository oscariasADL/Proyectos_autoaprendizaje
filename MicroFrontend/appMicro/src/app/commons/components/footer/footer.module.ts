import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterFacade } from '@commons/components/footer/footer.facade';
import { IonicModule } from '@ionic/angular';
import { GlobalPipesModule } from '../../pipes/global-pipes.module';
import { FooterComponent } from './footer.component';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { PFMModule } from '@modules/pfm/pfm.module';
import { MovementModule } from '@modules/movement/movement.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    GlobalPipesModule,
    IonicModule,
    RouterModule,
    FeatureToggleDirective,
    PFMModule,
    MovementModule
  ],
  providers: [FooterFacade],
  exports: [FooterComponent]
})
export class FooterModule {}
