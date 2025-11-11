import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Observable, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { DownloadFacade } from '@commons/components/download/download.facade';
import { ShareFacade } from '@commons/components/share/share.facade';
import { ConfigService } from '@commons/services/config.service';
import {
  VoucherItem,
  VoucherItemType
} from '../components/voucher/entities/voucher.entities';

const PDF_WIDTH = 400;

export interface VoucherGenerationOptions {
  elementId: string;
  filename?: string;
  items?: VoucherItem[];
  includeDeviceInfo?: boolean;
}

export interface ProcessedVoucherItems {
  items: VoucherItem[];
  downloadItems: VoucherItem[];
  ipLoaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VoucherGeneratorService {
  constructor(
    private shareFacade: ShareFacade,
    private downloadFacade: DownloadFacade,
    private configService: ConfigService
  ) {}

  /**
   * Procesa los items del comprobante agregando información del dispositivo e IP
   */
  public processVoucherItems(
    items: VoucherItem[]
  ): Observable<ProcessedVoucherItems> {
    if (!items) {
      return new Observable((subscriber) => {
        subscriber.next({
          items: [],
          downloadItems: [],
          ipLoaded: false
        });
        subscriber.complete();
      });
    }

    const processedItems = this.maskSensitiveData([...items]);

    return this.configService
      .fetchIP()
      .pipe(
        withLatestFrom(
          this.downloadFacade.deviceInfo$.pipe(
            filter((deviceInfo) => !!deviceInfo)
          ),
          this.downloadFacade.lastTransactionDate$
        )
      )
      .pipe(
        map(([currentIp, { uuid }, lastTransactionDate]) => {
          const ipItem = currentIp
            ? [
                {
                  id: 'my-ip',
                  label: 'IP',
                  fields: [currentIp]
                }
              ]
            : [];

          const downloadItems = [
            processedItems[0],
            ...processedItems.filter(
              (val, i) => i > 0 && val.type !== VoucherItemType.List
            ),
            ...ipItem,
            {
              id: 'my-deviceId',
              label: 'Identificador dispositivo',
              fields: [uuid]
            },
            ...processedItems.filter((val) => val.type === VoucherItemType.List)
          ];

          this.downloadFacade.updateLastTransactionDate(null);

          return {
            items: processedItems,
            downloadItems,
            ipLoaded: true
          };
        })
      );
  }

  /**
   * Descarga un comprobante como PDF
   */
  public async downloadVoucher(
    options: VoucherGenerationOptions
  ): Promise<void> {
    const filename = options.filename || 'comprobante.pdf';

    if (this.downloadFacade.working$.currentValue()) {
      return;
    }

    this.cleanAlerts();
    this.downloadFacade.toggleWorkingDownload(true);

    try {
      const data = await this.generatePdfFromElement(
        options.elementId,
        filename
      );
      this.downloadFacade.downloadFile({ name: filename, data });
    } catch (error) {
      console.error('Error al descargar comprobante:', error);
      this.downloadFacade.toggleWorkingDownload(false);
    }
  }
  /**
   * Comparte un comprobante como PDF
   */
  public async shareVoucher(options: VoucherGenerationOptions): Promise<void> {
    const filename = options.filename || 'comprobante.pdf';

    if (this.shareFacade.working$.currentValue()) {
      return;
    }

    this.cleanAlerts();
    this.shareFacade.toggleWorkingShare(true);

    try {
      const data = await this.generatePdfFromElement(
        options.elementId,
        filename
      );
      this.shareFacade.shareFile({ name: filename, data });
    } catch (error) {
      console.error('Error al compartir comprobante:', error);
      this.shareFacade.toggleWorkingShare(false);
    }
  }

  /**
   * Genera un PDF a partir de un elemento HTML
   */
  public async generatePdfFromElement(
    elementId: string,
    filename: string
  ): Promise<string> {
    const canvas = await this.captureElementAsCanvas(elementId);
    const dataUrl = canvas.toDataURL('image/jpeg', 1);
    const pdfDataString = await this.convertImageToPdf(dataUrl, filename);
    return pdfDataString.replace(
      `data:application/pdf;filename=${filename};base64,`,
      ''
    );
  }

  /**
   * Genera un PDF con contenido personalizado
   */
  public async generateCustomVoucher(
    elementId: string,
    filename: string = 'comprobante.pdf'
  ): Promise<string> {
    await this.delay(500);
    return await this.generatePdfFromElement(elementId, filename);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Limpia las alertas de descarga y compartir
   */
  public cleanAlerts(): void {
    this.downloadFacade.downloadClean();
    this.shareFacade.shareFileClean();
  }

  /**
   * Getters para observables de estado
   */
  get workingDownload$(): Observable<boolean> {
    return this.downloadFacade.working$;
  }

  get workingShare$(): Observable<boolean> {
    return this.shareFacade.working$;
  }
  //@typescript-eslint/no-unnecessary-boolean-literal-compare
  get downloadCompleted$(): Observable<boolean> {
    return this.downloadFacade.completed$.pipe(
      filter((completed) => !completed)
    );
  }
  //@typescript-eslint/no-unnecessary-boolean-literal-compare
  get shareCompleted$(): Observable<boolean> {
    return this.shareFacade.completed$.pipe(filter((completed) => !completed));
  }

  // Métodos privados
  private maskSensitiveData(items: VoucherItem[]): VoucherItem[] {
    const fromIndex = items.findIndex((item) => item.id === 'from');
    if (fromIndex >= 0) {
      const item = items[fromIndex];
      const words = item.fields[0].split(' ');
      const num = words.pop();
      items[fromIndex] = {
        ...item,
        fields: [`${words.join(' ')} **** ${num.slice(-4)}`]
      };
    }
    return items;
  }

  private async captureElementAsCanvas(
    elementId: string
  ): Promise<HTMLCanvasElement> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Elemento con ID '${elementId}' no encontrado`);
    }
    return html2canvas(element);
  }

  private async convertImageToPdf(
    imageDataUrl: string,
    filename: string
  ): Promise<string> {
    const headerImageUrl = '/assets/img/Logo-AVVillas.png'; // Ruta fija
    const headerImg = await this.loadImage(headerImageUrl);
    const contentImg = await this.loadImage(imageDataUrl);

    const headerHeight = (PDF_WIDTH / headerImg.width) * headerImg.height;
    const contentHeight = (PDF_WIDTH / contentImg.width) * contentImg.height;
    const totalHeight = headerHeight + contentHeight;
    const logoWidth = 150; // o el ancho que prefieras
    const logoHeight = (logoWidth / headerImg.width) * headerImg.height;

    // Centrar el logo horizontalmente
    const x = (PDF_WIDTH - logoWidth) / 2;
    const y = 40; // un pequeño margen superior
    const doc = new jsPDF('p', 'px', [PDF_WIDTH, totalHeight]);

    let currentY = 0;

    doc.addImage(headerImg, 'PNG', x, y, logoWidth, logoHeight);
    currentY += logoHeight + 40;
    doc.addImage(contentImg, 'JPEG', 0, currentY, PDF_WIDTH, contentHeight);

    if (!Capacitor.isNativePlatform()) {
      doc.save(filename);
    }

    return doc.output('datauristring');
  }

  public getDoc(imgHeight: number): any {
    return new jsPDF('p', 'px', [PDF_WIDTH, imgHeight]);
  }
  private loadImage(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }
}
