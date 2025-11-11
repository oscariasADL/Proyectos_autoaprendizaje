import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarComponent } from '@commons/components/calendar/calendar.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, GlobalPipesModule]
})
export class CalendarModule {}
