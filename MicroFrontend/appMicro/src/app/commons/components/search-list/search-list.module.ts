import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchListComponent } from './search-list.component';

@NgModule({
  declarations: [SearchListComponent],
  imports: [
    CommonModule,
    GlobalPipesModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    FormsAvvModule
  ],
  exports: [SearchListComponent]
})
export class SearchListModule {}
