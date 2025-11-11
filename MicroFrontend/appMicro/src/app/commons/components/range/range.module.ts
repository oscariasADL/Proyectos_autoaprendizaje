import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RangeComponent } from '@commons/components/range/range.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RangeComponent],
  exports: [RangeComponent],
  imports: [CommonModule, IonicModule]
})
export class RangeModule {}
