import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { BarcodeScannerUserGuidance } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';

@Component({
  selector: 'app-barcode-scanner-template',
  templateUrl: './barcode-scanner-template.component.html',
  styleUrls: ['./barcode-scanner-template.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GlobalPipesModule]
})
export class BarcodeScannerTemplateComponent {
  @Input() userGuidanceOptions: BarcodeScannerUserGuidance;
  @Output() closeScannerModal: EventEmitter<void> = new EventEmitter<void>();
}
