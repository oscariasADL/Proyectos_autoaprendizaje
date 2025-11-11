import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

import { ModalController } from '@commons/controllers/modal.controller';
import { DigitalDebitCardDetail } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { ALPHANUMERIC_PATTERN } from '@commons/constants/regex.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { digitalDebitCardAmountValidator } from '@modules/digital-debit-card/helpers/digital-debit-card-validators.helper';
import {
  digitalDebitCardCreatePayloadMapper,
  digitalDebitCardEditPayloadMapper
} from '@modules/digital-debit-card/mappers/digital-debit-card-payload.mapper';

@Component({
  selector: 'app-digital-debit-card-reissue',
  templateUrl: './digital-debit-card-edit.component.html',
  styleUrls: ['./digital-debit-card-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, CommonModule, GlobalPipesModule, FormsAvvModule],
  providers: [DigitalDebitCardFacade]
})
export class DigitalDebitCardEditComponent implements OnInit {
  @Input() relativeParentId: string;
  @Input() card: DigitalDebitCardDetail;
  public form: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private facade: DigitalDebitCardFacade
  ) {
    this.form = this.formBuilder.group({
      productOrigin: [null, [Validators.required]],
      nickName: [
        '',
        [
          Validators.required,
          Validators.pattern(ALPHANUMERIC_PATTERN),
          Validators.maxLength(
            this.facade.boundsByKey(ParameterKey.tddMaxNicknameLength)
          )
        ]
      ],
      amount: [
        '',
        [Validators.required, digitalDebitCardAmountValidator.bind(this)]
      ]
    });
    this.form.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.form.setValue({
      productOrigin: { id: this.relativeParentId },
      nickName: this.card.name,
      amount: this.card.amount
    });
    this.form.markAllAsTouched();
    this.cdRef.detectChanges();
  }

  public editDigitalDebitCard(): void {
    if (this.form.valid) {
      this.closeModal();
      this.facade.editDigitalDebitCard(
        digitalDebitCardEditPayloadMapper(this.form.value)
      );
    }
  }

  public closeModal(): void {
    void this.modalCtrl.dismiss();
  }

  get nickName(): AbstractControl {
    return this.form.get('nickName');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
