import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-spi-terms-and-conditions',
  templateUrl: './spi-terms-and-conditions.component.html',
  styleUrls: ['./spi-terms-and-conditions.component.sass'],
  imports: [IonicModule, GlobalPipesModule],
  standalone: true
})
export class SpiTermsAndConditionsComponent {
  @Output() termsAccepted: EventEmitter<void> = new EventEmitter<void>();
  @Output() termsClosed: EventEmitter<void> = new EventEmitter<void>();

  public acceptTerms() {
    this.termsAccepted.emit();
  }

  public goBack() {
    this.termsClosed.emit();
  }
}
