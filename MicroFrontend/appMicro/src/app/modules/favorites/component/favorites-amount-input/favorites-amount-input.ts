import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { ModalController } from '@commons/controllers/modal.controller';
import { SubtypeOperations } from '@modules/favorites/entities/favorites.interface';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import {
  moneyOrdersFavoriteAmountValidators,
  rechargesFavoriteAmountValidators,
  servicePayAmountValidators,
  transferFavoriteAvvAccountAmountValidator,
  transfersFavoriteTransfiyaAmountValidators
} from '@modules/favorites/helpers/favorites-transfer.helper';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';

@Component({
  selector: 'app-favorites-amount-input',
  templateUrl: './favorites-amount-input.html',
  styleUrls: ['./favorites-amount-input.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesAmountInputComponent implements OnInit {
  @Input() subTypeOperation: SubtypeOperations;
  @Input() initValue: number;
  @Input() channel: ChannelType;

  public amountFormControl: FormControl = new FormControl();
  public notice: string = null;
  public labels: { title: string; input_label: string } = {
    title: '',
    input_label: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private facade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.initLabels();
    this.amountFormControl.setValue(this.initValue);
    this.amountFormControl.setValidators(this.validators());
  }

  public async saveChanges(): Promise<void> {
    this.amountFormControl.markAsTouched();
    if (this.amountFormControl.valid) {
      await this.closeModal({
        amount: this.amountFormControl.currencyValue()
      });
    }
  }

  private validators(): ValidatorFn[] {
    const validators = [Validators.required];
    switch (this.subTypeOperation.toString()) {
      case SubtypeOperations.TRANSFER_AVV_ACC.toString():
        validators.push(transferFavoriteAvvAccountAmountValidator.bind(this));
        break;
      case SubtypeOperations.TRANSFER_AVV_PHONE.toString():
        validators.push(transferFavoriteAvvAccountAmountValidator.bind(this));
        break;
      case SubtypeOperations.TRANSFIYA.toString():
        validators.push(transfersFavoriteTransfiyaAmountValidators.bind(this));
        break;
      case SubtypeOperations.RECHARGES.toString():
        validators.push(rechargesFavoriteAmountValidators.bind(this));
        break;
      case SubtypeOperations.MONEY_ORDER.toString():
        validators.push(
          moneyOrdersFavoriteAmountValidators(this.channel).bind(this)
        );
        break;
      case SubtypeOperations.REGISTERED_SERVICES.toString():
        validators.push(servicePayAmountValidators.bind(this));
        break;
    }
    return validators;
  }

  private initLabels(): void {
    switch (this.subTypeOperation.toString()) {
      case SubtypeOperations.TRANSFER_AVV_ACC.toString():
      case SubtypeOperations.TRANSFER_AVV_PHONE.toString():
      case SubtypeOperations.TRANSFIYA.toString():
        this.labels = {
          title: 'FAVORITES.TRANSFER.AMOUNT_MODAL.TRANSFER.TITLE',
          input_label: 'FAVORITES.TRANSFER.AMOUNT_MODAL.TRANSFER.INPUT_LABEL'
        };
        break;
      case SubtypeOperations.RECHARGES.toString():
        this.labels = {
          title: 'FAVORITES.TRANSFER.AMOUNT_MODAL.RECHARGES.TITLE',
          input_label: 'FAVORITES.TRANSFER.AMOUNT_MODAL.RECHARGES.INPUT_LABEL'
        };
        break;
      case SubtypeOperations.MONEY_ORDER.toString():
        this.labels = {
          title: 'FAVORITES.TRANSFER.AMOUNT_MODAL.MONEY_ORDER.TITLE',
          input_label: 'FAVORITES.TRANSFER.AMOUNT_MODAL.MONEY_ORDER.INPUT_LABEL'
        };
        break;
      case SubtypeOperations.REGISTERED_SERVICES.toString():
        this.labels = {
          title: 'FAVORITES.TRANSFER.AMOUNT_MODAL.SERVICE.TITLE',
          input_label: 'FAVORITES.TRANSFER.AMOUNT_MODAL.SERVICE.INPUT_LABEL'
        };
        break;
      default:
        this.labels = {
          title: 'FAVORITES.TRANSFER.AMOUNT_MODAL.TRANSFER.TITLE',
          input_label: 'FAVORITES.TRANSFER.AMOUNT_MODAL.TRANSFER.INPUT_LABEL'
        };
        break;
    }
  }

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }
}
