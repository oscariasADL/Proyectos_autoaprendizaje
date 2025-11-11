import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  VoucherItem,
  VoucherItemType
} from '@app/commons/components/voucher/entities/voucher.entities';
import { RATES_URL } from '../../constants/pocket-create-with-returns.constants';
import { PocketsFacade } from '@app/modules/pockets/pockets.facade';
import { PWR_PERIODICITY_LABEL } from '@app/modules/pockets/entities/pockets.interface';
import { Product } from '@commons/entities/product/product.interface';
import { RENTABILITY_POCKET_CREATE } from '@app/modules/pockets/constants/create.constants';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.sass']
})
export class ConfirmationStepComponent implements OnInit {
  public readonly PERIODICITY_LABEL = PWR_PERIODICITY_LABEL;
  @Input() form: FormGroup;
  @Output() completePocket: EventEmitter<void> = new EventEmitter<void>();
  voucherItems: VoucherItem[] = [];
  ratesURL = RATES_URL;

  constructor(private facade: PocketsFacade) {}
  public readonly RENTABILITY_POCKET_CREATE = RENTABILITY_POCKET_CREATE;

  ngOnInit() {
    this.voucherItems = this.mapPocketWithReturnsConfirmation(this.form);
  }

  checkForm = new FormGroup({
    checkTerms: new FormControl(false, Validators.requiredTrue)
  });

  public openUrl(url: string) {
    this.facade.openExternalLinks(url);
  }

  private mapPocketWithReturnsConfirmation(form: FormGroup): VoucherItem[] {
    const product: Product = form.value.product;

    return [
      {
        id: 'pocket-create-name',
        fields: [form.value.name],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.CONFIGURATION.POCKET_NAME'
      },
      {
        id: 'pocket-create-category',
        fields: [form.value.category.label],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.CONFIGURATION.CATEGORY'
      },
      {
        id: 'pocket-create-account',
        fields: [`No. ${product.idUM}`],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.CONFIGURATION.ORIGIN_ACCOUNT'
      },
      {
        id: 'pocket-create-goal',
        fields: [`$${form.value.goal}`],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.CONFIGURATION.GOAL'
      },
      {
        id: 'pocket-create-periodicity',
        fields: [form.value.periodicity.label],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.POCKET_DETAIL.CARD.PERIODICITY'
      },

      {
        id: 'period-info',
        fields: [`${form.value.period} días`],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.POCKET_DETAIL.CARD.DEADLINE'
      },
      {
        id: 'pocket-create-openAmount',
        fields: [`$${form.value.openAmount}`],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.OPEN_AMOUNT'
      },
      {
        id: 'confirmation',
        fields: [`$${form.value.quota}`],
        type: VoucherItemType.None,
        label: 'POCKET_WITH_RETURNS.CONFIGURATION.QUOTA'
      },
      {
        id: 'confirmation',
        fields: [Boolean(form.value.renewPocket) ? 'Sí' : 'No'],
        type: VoucherItemType.Double,
        label: 'POCKET_WITH_RETURNS.AUTOMATIC_QUOTA_RENEWAL'
      },
      {
        id: 'confirmation',
        fields: [Boolean(form.value.renewWithProfits) ? 'Sí' : 'No'],
        type: VoucherItemType.Double,
        label: 'POCKET_WITH_RETURNS.RENEW_PROFIT_WITH_GAINS'
      }
    ];
  }
}
