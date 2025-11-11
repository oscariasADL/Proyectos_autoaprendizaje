import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { ALPHABETIC_PATTERN } from '@commons/constants/regex.constants';

@Component({
  selector: 'app-favorites-amount-input',
  templateUrl: './favorites-name-input.html',
  styleUrls: ['./favorites-name-input.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesNameInputComponent implements OnInit {
  @Input() initValue: string;

  public nameFormControl: UntypedFormControl;

  constructor(
    private modalCtrl: ModalController,
    private facade: FavoritesFacade
  ) {
    this.nameFormControl = new UntypedFormControl();
  }

  ngOnInit(): void {
    this.nameFormControl.setValue(this.initValue);
    this.nameFormControl.setValidators([
      Validators.required,
      Validators.pattern(ALPHABETIC_PATTERN),
      Validators.maxLength(
        this.facade.boundsByKey(ParameterKey.favoritesMaxNicknameLength)
      )
    ]);
  }

  public async saveChanges(): Promise<void> {
    this.nameFormControl.markAsTouched();
    if (this.nameFormControl.valid) {
      await this.closeModal({
        name: this.nameFormControl.value
      });
    }
  }

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }
}
