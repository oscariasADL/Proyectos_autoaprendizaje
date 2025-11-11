import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  BreBTransfers,
  BreBTransfersForm
} from '../../entities/bre-b-transfers.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import { FormGroup } from '@angular/forms';
import { BreBTransfersFacade } from '../../bre-b-transfers.facade';
import { filter, take, tap } from 'rxjs';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';
import {
  GMF_TRANSACTION_IS_ALLOWED,
  GMF_TRANSACTION_IS_NOT_ALLOWED
} from '../../constants/bre-b-transfers.constants';
import { NotificationTypeEnum } from '@app/commons/components/notification/constants/notification.constants';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bre-b-transfers-confirmation',
  templateUrl: './bre-b-transfers-confirmation.component.html',
  styleUrls: ['./bre-b-transfers-confirmation.component.sass']
})
export class BreBTransfersConfirmationComponent implements OnInit {
  @Input() form: FormGroup<BreBTransfersForm>;
  @Output() transferCompleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() modifyTransfer: EventEmitter<void> = new EventEmitter<void>();

  public breBTransfers: BreBTransfers = null;
  public gmfTransactionIsNotAllowed = GMF_TRANSACTION_IS_NOT_ALLOWED;
  public gmfTransactionIsAllowed = GMF_TRANSACTION_IS_ALLOWED;
  public firstName: string;
  protected readonly getProductType = getProductType;
  protected readonly sanitizeCurrency = sanitizeCurrency;

  constructor(
    private facade: BreBTransfersFacade,
    private currencyFormat: CurrencyFormatPipe,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.breBTransfers = {
      amount: `${this.form.value.amount}`,
      fromProduct: this.form.value.fromProduct,
      towardAvalKey: this.form.value.towardAvalKey,
      addenda: this.form.value.addenda,
      fee: this.form.value.fee,
      towardProduct: this.form.value.towardProduct,
      contactName: this.form.value.contactName,
      gmfData: this.form.value.gmfData
    };

    this.facade.basicData$
      .pipe(
        filter((basicData) => !!basicData),
        take(1)
      )
      .subscribe(({ firstName }) => {
        this.firstName = firstName;
      });
  }
  public gmfInfoSanitized(value: string): string {
    if (!!value) {
      const gmfMapped = this.currencyFormat.transform(value);
      return `${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `;
    }
  }

  public continue() {
    this.transferCompleted.emit();
  }

  public modify() {
    this.modifyTransfer.emit();
  }

  get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }
}
