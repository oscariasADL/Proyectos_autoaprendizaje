import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { InformationService } from '@commons/services/information.service';
import { TRANSFERS_TRANSFIYA_INFO_ALERT } from '@modules/transfers/constants/transfers.constants';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';

@Component({
  selector: 'app-transfer-contacts-product-type',
  templateUrl: './transfer-contacts-product-type.component.html',
  styleUrls: ['./transfer-contacts-product-type.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferContactsProductTypeComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<string> = new EventEmitter<string>();

  public MENU_PHONE_NUMBER_LIST: AvvIconsBtnList[];

  constructor(
    private facade: TransfersContactsFacade,
    private informationService: InformationService
  ) {}

  ngOnInit(): void {
    this.initMenu();
  }

  public showInformation(): void {
    this.informationService.showPanel(TRANSFERS_TRANSFIYA_INFO_ALERT);
  }

  private initMenu(): void {
    this.MENU_PHONE_NUMBER_LIST = [
      {
        label: 'TRANSFERS.CONTACTS.PRODUCT_TYPE.AVV_CELL_PHONE',
        image: 'icons/telefono-villas.svg',
        id: 'btn-toward-avv-celular',
        disabled:
          this.amount.currencyValue() <
            this.facade.boundsByKey(ParameterKey.transferValueToSendMin) ||
          this.amount.currencyValue() >
            this.facade.boundsByKey(ParameterKey.transferToAvvPhoneMax),
        action: () => this.setTransferType(TransferType.SEND_AVV_PHONE)
      },
      {
        label: 'TRANSFERS.CONTACTS.PRODUCT_TYPE.TRANSFIYA_CELL_PHONE',
        image: 'icons/telefono-transfiya.svg',
        id: 'btn-transfiya',
        disabled:
          this.amount.currencyValue() >
          this.facade.boundsByKey(ParameterKey.transfiyaAmountMax),
        action: () => this.setTransferType(TransferType.SEND_TRANSFIYA)
      }
    ];
  }

  public setTransferType(transferType: TransferType): void {
    this.transferType.patchValue(transferType);
    this.continue.emit();
  }

  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
