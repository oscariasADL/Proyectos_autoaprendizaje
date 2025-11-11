import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { VoucherItem } from '../entities/voucher.entities';
import { Observable, Subscription } from 'rxjs';
import {
  ProcessedVoucherItems,
  VoucherGeneratorService
} from '@app/commons/services/voucher-generator.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.sass']
})
export class VoucherComponent implements OnInit, OnDestroy {
  @Input() voucherItems: VoucherItem[] = [];
  @Input() approvalId: string = '';
  @Input() denyDownload: boolean = false;
  @Input() allowShare: boolean = true;
  @Input() id: string = 'voucher';
  @Input() utagEvent: any = {};
  @Input() filename: string = 'comprobante.pdf';
  public processedVoucherItems: VoucherItem[] = [];
  public ipLoaded: boolean = false;
  private subscriptions: Subscription[] = [];
  private readonly VOUCHER_ELEMENT_ID = 'voucher-content';
  constructor(
    private voucherGenerator: VoucherGeneratorService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.initializeVoucherData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.voucherGenerator.cleanAlerts();
  }
  private initializeVoucherData(): void {
    if (this.voucherItems?.length) {
      const subscription = this.voucherGenerator
        .processVoucherItems(this.voucherItems)
        .subscribe((processedData: ProcessedVoucherItems) => {
          this.processedVoucherItems = processedData.downloadItems;
          this.ipLoaded = processedData.ipLoaded;
          this.cdRef.detectChanges();
        });

      this.subscriptions.push(subscription);
    }
  }
  public async downloadTicket(): Promise<void> {
    if (!this.ipLoaded || this.denyDownload) {
      return;
    }

    try {
      await this.voucherGenerator.downloadVoucher({
        elementId: this.VOUCHER_ELEMENT_ID,
        filename: this.filename
      });
    } catch (error) {
      console.error('Error al descargar comprobante:', error);
      // Aquí podrías agregar manejo de errores específico
    }
  }
  public async shareTicket(): Promise<void> {
    if (!this.ipLoaded || !this.allowShare) {
      return;
    }

    try {
      await this.voucherGenerator.shareVoucher({
        elementId: this.VOUCHER_ELEMENT_ID,
        filename: this.filename
      });
    } catch (error) {
      console.error('Error al compartir comprobante:', error);
      // Aquí podrías agregar manejo de errores específico
    }
  }
  get workingDownload$(): Observable<boolean> {
    return this.voucherGenerator.workingDownload$;
  }

  get workingShare$(): Observable<boolean> {
    return this.voucherGenerator.workingShare$;
  }

  get downloadCompleted$(): Observable<boolean> {
    return this.voucherGenerator.downloadCompleted$;
  }

  get shareCompleted$(): Observable<boolean> {
    return this.voucherGenerator.shareCompleted$;
  }

  get hasApprovalId(): boolean {
    return !!this.approvalId;
  }

  get displayItems(): VoucherItem[] {
    return this.voucherItems;
  }
}
