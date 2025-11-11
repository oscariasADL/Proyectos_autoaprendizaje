import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClearDataComponent } from '@commons/components/clear-data/clear-data.component';

@NgModule({
  declarations: [ClearDataComponent],
  imports: [CommonModule],
  exports: [ClearDataComponent]
})
export class ClearDataModule {}
