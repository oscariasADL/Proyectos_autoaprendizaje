import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { PFMBalance } from '@modules/pfm/entities/pfm.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

@Component({
  selector: 'app-product-detail-summary',
  templateUrl: './product-detail-summary.component.html',
  styleUrls: ['./product-detail-summary.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailSummaryComponent {
  @Input() accountType: TypeAccount = null;
  @Input() balancesSummary: PFMBalance[];
  @Input() balancesWorking: boolean;
  @Input() balancesCompleted: boolean;

  public isPFMSummaryOpened: boolean = false;

  public togglePFMSummaryOpened(): void {
    this.isPFMSummaryOpened = !this.isPFMSummaryOpened;
  }

  get balancesSummaryOne(): PFMBalance {
    const [summary] = this.balancesSummary;
    return summary ?? null;
  }

  get currentMonth(): string {
    return format(new Date(), 'MMMM', { locale: es });
  }

  get typeAccount(): typeof TypeAccount {
    return TypeAccount;
  }
}
