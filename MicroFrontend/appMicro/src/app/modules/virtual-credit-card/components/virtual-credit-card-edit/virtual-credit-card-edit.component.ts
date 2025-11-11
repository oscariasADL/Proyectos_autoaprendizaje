import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { VirtualCreditCardDetail } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { ModalController } from '@commons/controllers/modal.controller';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ALPHABETIC_PATTERN } from '@commons/constants/regex.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { virtualCreditCardAmountValidator } from '@modules/virtual-credit-card/helpers/virtual-credit-card-validators.helper';
import { CommonsModule } from '@app/commons/commons.module';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

@Component({
  selector: 'app-virtual-credit-card-edit',
  templateUrl: './virtual-credit-card-edit.component.html',
  styleUrls: ['./virtual-credit-card-edit.component.sass'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    GlobalPipesModule,
    FormsAvvModule,
    CommonsModule
  ],
  providers: [VirtualCreditCardFacade]
})
export class VirtualCreditCardEditComponent implements OnInit {
  @Input() virtualCreditCardDetail: VirtualCreditCardDetail;
  @Input() acctTypeParent: string;
  @Input() numberProductParent: string;
  public readonly EDIT_TCV: UtagEvent = {
    track: 'link',
    tealium_event: 'link',
    event_category: 'Modificar TCV',
    event_label: 'Modificar TCV - guardar cambios'
  };
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private facade: VirtualCreditCardFacade
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.initializeForm();
  }

  public editVirtualCreditCard(): void {
    if (this.form.valid) {
      this.closeModal();
      this.facade.editVirtualCreditCard({
        acctTypeParent: this.acctTypeParent,
        numberProductParent: this.numberProductParent,
        numberCreditCard: this.virtualCreditCardDetail.numberProductTCV,
        nickName: this.nickName.value,
        amount: this.amount.currencyValue().toString()
      });
    }
  }

  public closeModal(): void {
    void this.modalCtrl.dismiss();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      nickName: [
        '',
        [
          Validators.required,
          Validators.pattern(ALPHABETIC_PATTERN),
          Validators.maxLength(
            this.facade.boundsByKey(ParameterKey.tcvMaxNicknameLength)
          )
        ]
      ],
      amount: ['', [Validators.required]]
    });
  }

  private initializeForm(): void {
    const creditLimit = this.creditLimit$.currentValue();
    this.form.setValue({
      nickName: this.virtualCreditCardDetail?.nickname || '',
      amount: this.virtualCreditCardDetail.maxAmtTCV
    });
    this.amount.addValidators(
      virtualCreditCardAmountValidator(creditLimit).bind(this)
    );
    this.form.updateValueAndValidity();
  }

  get creditLimit$(): Observable<number> {
    return this.facade.creditLimit$;
  }

  get nickName(): AbstractControl {
    return this.form.get('nickName');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
