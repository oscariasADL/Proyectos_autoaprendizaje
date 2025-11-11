import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  CEL2CEL_BANK_LIST,
  TRANSFERS_TRANSFIYA_INFO_ALERT,
  TransfersCel2celSlide,
  TRANSFIYA_INFO
} from '@modules/transfers/pages/transfers-cel2cel-send/constants/transfers-cel2cel-send.constants';
import { InformationService } from '@commons/services/information.service';
import { TransfiyaInfoService } from '@commons/services/transfiya-info.service';
import { AlertService } from '@commons/services/alert.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { resetControl } from '@commons/utils/forms';

@Component({
  selector: 'app-transfers-cel2cel-send-bank',
  templateUrl: './transfers-cel2cel-send-bank.component.html',
  styleUrls: ['./transfers-cel2cel-send-bank.component.sass']
})
export class TransfersCel2celSendBankComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() continueSlide: EventEmitter<string> = new EventEmitter<string>();
  public formGroup: UntypedFormGroup;

  banks = CEL2CEL_BANK_LIST;
  transfiya = {
    ...TRANSFIYA_INFO,
    utag: 'enviar plata - elige la entidad destino de tu contacto - otras entidades',
    utagCategory: 'a un celular'
  };

  constructor(
    private informationService: InformationService,
    private transfiyaInfoService: TransfiyaInfoService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private transfersCel2celFacade: TransfersCel2celFacade
  ) {}

  ngOnInit() {
    this.form.controls.useTransfiya.setValue(false);
    this.transfersCel2celFacade.transfersCel2celSetUseTransfiya(false);
    resetControl(this.form.controls.useTransfiya as any);
    this.showAlertIfHasProductsAval();
  }

  public showAlertIfHasProductsAval(): void {
    if (!this.hasProductAval) {
      this.showTransfiyaAlertInfo();
    }
  }

  public showTransfiyaAlertInfo(useAlertService: boolean = false): void {
    const data = {
      ...TRANSFERS_TRANSFIYA_INFO_ALERT,
      linkAction: () => this.transfiyaInfoService.showTransfiyaInfo(),
      utagCategory: 'a un celular',
      utag: 'enviar plata - ¿que es transfiya? - cambiar numero',
      utagCancel: 'enviar plata - ¿que es transfiya? - usar transfiya',
      utagModal: 'enviar plata - ¿que es transfiya? - abrir'
    };
    const service = useAlertService
      ? this.alertService.create(data)
      : this.informationService.showPanelIfNecessary(data, true);
    service.then((res) => {
      if (!isNullOrUndefined(res)) {
        this.alertSetTransferType(res);
        this.modalCtrl.dismiss();
      }
    });
  }

  public bankInList(bankId: string): boolean {
    return this.transfersCel2celBankIds
      ? this.transfersCel2celBankIds.includes(bankId)
      : false;
  }

  public setTowardBankInfo(bankId: string, bankName: string) {
    if (this.transfersCel2celTowardProducts) {
      const bank = this.transfersCel2celTowardProducts.find(
        (towardProduct) => towardProduct.account.bankInfo.bankId === bankId
      );
      this.form.get('towardProduct').setValue({ ...bank, bankName });
      this.form.get('transferType').setValue(TransferType.SEND_CEL2CEL);
      this.continue.emit();
    }
  }

  public alertSetTransferType(res: any): void {
    if (res) {
      this.form.controls.transferType.setValue(TransferType.SEND_TRANSFIYA);
      this.form.controls.contactData.setValue(null);
      resetControl(this.form.controls.contactData as any);
      this.form.controls.towardProduct.setValue(null);
      resetControl(this.form.controls.towardProduct as any);
      this.form.controls.useTransfiya.setValue(true);
      this.form.controls.confirmationMessage.setValue(
        'TRANSFERS.CEL2CEL.SEND.CONFIRMATION_MESSAGE_TRANSFIYA'
      );
      this.transfersCel2celFacade.transfersCel2celSetUseTransfiya(true);
      this.continue.emit();
    } else {
      this.continueSlide.emit(TransfersCel2celSlide.amount);
    }
  }

  get transfersCel2celTowardProducts() {
    return this.transfersCel2celFacade.transfersCel2celTowardProducts$.currentValue();
  }

  get transfersCel2celBankIds() {
    return this.transfersCel2celFacade.transfersCel2celBankIds$.currentValue();
  }

  get hasProductAval(): boolean {
    return (
      this.transfersCel2celTowardProducts &&
      this.transfersCel2celTowardProducts.length
    );
  }
}
