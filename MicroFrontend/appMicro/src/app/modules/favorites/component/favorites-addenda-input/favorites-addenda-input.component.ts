import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ALPHANUMERIC_PATTERN } from '@commons/constants/regex.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

@Component({
  selector: 'app-favorites-addenda-input',
  templateUrl: './favorites-addenda-input.component.html',
  styleUrls: ['./favorites-addenda-input.component.sass']
})
export class FavoritesAddendaInputComponent implements OnInit {
  @Input() title: string;
  @Input() label: string;
  @Input() helpText: string;
  @Input() initValue: string = '';

  public addendaFormControl: FormControl<string>;

  constructor(
    private modalCtrl: ModalController,
    private facade: FavoritesFacade
  ) {
    this.addendaFormControl = new FormControl();
  }

  ngOnInit() {
    this.addendaFormControl.setValue(this.initValue);
    this.addendaFormControl.setValidators([
      Validators.required,
      Validators.pattern(ALPHANUMERIC_PATTERN),
      Validators.minLength(
        this.facade.boundsByKey(ParameterKey.transferNoteMinLength)
      ),
      Validators.maxLength(
        this.facade.boundsByKey(ParameterKey.transferNoteMaxLength)
      )
    ]);
  }

  public async saveChanges(): Promise<void> {
    this.addendaFormControl.markAsTouched();
    if (this.addendaFormControl.valid) {
      await this.closeModal({ addenda: this.addendaFormControl.value });
    }
  }

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }
}
