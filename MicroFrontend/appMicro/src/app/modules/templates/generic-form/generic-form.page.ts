import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fee } from '@commons/entities/fee/fee.interface';
import { FeeService } from '@commons/services/fee.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { GenericFormConfirmComponent } from '@modules/templates/generic-form/components/generic-form-confirm/generic-form-confirm.component';
import {
  FieldType,
  GenericFormData,
  TemplateForm,
  TemplateType
} from '@modules/templates/generic-form/entitites/generic-form.data';
import { GenericFormFacade } from '@modules/templates/generic-form/generic-form.facade';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.page.html',
  styleUrls: ['./generic-form.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericFormPage {
  constructor(
    private fee: FeeService,
    private route: ActivatedRoute,
    private facade: GenericFormFacade,
    private modalCtrl: ModalController
  ) {}

  public async confirmAction(data: TemplateForm): Promise<void> {
    if (data.form.valid) {
      const fee = await this.getFee();
      const confirmed = await this.modalConfirm(fee);

      if (confirmed) {
        data.action(fee);
      }
    }
  }

  private async getFee(): Promise<Fee> {
    this.facade.enableLoading();
    const fee = await this.fee.fetchCost(this.data.feePayload()).toPromise();
    this.facade.disableLoading();

    return fee;
  }

  private async modalConfirm(fee: Fee): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: GenericFormConfirmComponent,
      componentProps: {
        data: this.voucher(fee)
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    return data;
  }

  get data(): GenericFormData {
    return this.route.snapshot.data.data;
  }

  get id(): string {
    return this.data.id;
  }

  get template(): TemplateForm[] {
    return this.data.template;
  }

  get voucher(): any {
    return this.data.voucher;
  }

  get fieldType(): typeof FieldType {
    return FieldType;
  }

  get templateType(): typeof TemplateType {
    return TemplateType;
  }
}
