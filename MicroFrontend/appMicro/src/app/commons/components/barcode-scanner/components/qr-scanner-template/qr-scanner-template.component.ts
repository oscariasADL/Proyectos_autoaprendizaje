import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { NgIf } from '@angular/common';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { BarcodeScannerUserGuidance } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';

@Component({
  selector: 'app-qr-scanner-template',
  templateUrl: './qr-scanner-template.component.html',
  styleUrls: ['./qr-scanner-template.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GlobalPipesModule, NgIf]
})
export class QrScannerTemplateComponent {
  @Input() userGuidanceOptions: BarcodeScannerUserGuidance;
  @Input() useFlashlight: boolean = false;
  @Input() flashlightStatus: boolean = false;
  @Output() closeScannerModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleFlashlight: EventEmitter<void> = new EventEmitter<void>();
}
