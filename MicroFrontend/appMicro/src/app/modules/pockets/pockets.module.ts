import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PocketCategoryPipe } from '@modules/pockets/pipes/pocket-category.pipe';
import { PocketsRoutingModule } from '@modules/pockets/pockets-routing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { PocketProgressComponent } from './pages/pocket-detail/components/pocket-progress/pocket-progress.component';

@NgModule({
  declarations: [PocketProgressComponent],
  imports: [CommonModule, PocketsRoutingModule, PocketCategoryPipe],
  providers: [PocketsFacade, PocketsService, PocketCategoryPipe],
  exports: [PocketCategoryPipe, PocketProgressComponent]
})
export class PocketsModule {}
