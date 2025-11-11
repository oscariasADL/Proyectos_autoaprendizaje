import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { Product } from '@commons/entities/product/product.interface';
import { AlertService } from '@commons/services/alert.service';
import {
  TRANSFIYA_ACCOUNT_DEFAULT_INFO_ALERT,
  TRANSFIYA_MANAGEMENT_REFUSE_DATA,
  TRANSFIYA_MANAGEMENT_TOOLTIP_DEFAULT_ACCOUNT,
  TRANSFIYA_MANAGEMENT_TOOLTIP_TRUST_RELATION
} from '@modules/transfiya-management/constants/transfiya-management.constants';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '@commons/components/popover/popover.component';
import { TransfiyaManagementTooltip } from '@modules/transfiya-management/entities/transfiya-management.interface';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { TransfiyaManagementFacade } from '@modules/transfiya-management/transfiya-management.facade';

@Component({
  selector: 'app-transfiya-management-step',
  templateUrl: './transfiya-management-step.component.html',
  styleUrls: ['./transfiya-management-step.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfiyaManagementStepComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() reject: EventEmitter<void> = new EventEmitter<void>();
  @Output() continue: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showTrustRelation: boolean = false;
  protected readonly TRANSFIYA_MANAGEMENT_TOOLTIP_DEFAULT_ACCOUNT =
    TRANSFIYA_MANAGEMENT_TOOLTIP_DEFAULT_ACCOUNT;
  protected readonly TRANSFIYA_MANAGEMENT_TOOLTIP_TRUST_RELATION =
    TRANSFIYA_MANAGEMENT_TOOLTIP_TRUST_RELATION;
  protected readonly featureFlagsKey = FeatureFlagsKey;

  constructor(
    private alertService: AlertService,
    private popoverCtrl: PopoverController,
    private facade: TransfiyaManagementFacade
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (
      this.facade
        .isFeatureFlagEnabled(
          this.featureFlagsKey.TransferCel2celDefaultAccount
        )
        .currentValue()
    ) {
      if (!this.isDispatch) {
        void this.alertService.create(TRANSFIYA_ACCOUNT_DEFAULT_INFO_ALERT);
      }
    }
  }

  public toggleTrustRelation(): void {
    this.showTrustRelation = !this.showTrustRelation;
    this.updateFormValidations();
  }

  public toggleDefaultAccount(): void {
    this.isDefaultAccount.setValue(!this.isDefaultAccount.value);
    if (this.showTrustRelation) {
      this.showTrustRelation = false;
      this.updateFormValidations();
    }
  }

  public async showPopoverInfo(
    ev: Event,
    popoverData: TransfiyaManagementTooltip
  ): Promise<void> {
    ev.preventDefault();
    const popover = await this.popoverCtrl.create({
      id: popoverData.id,
      component: PopoverComponent,
      componentProps: {
        ...popoverData
      },
      cssClass: 'avv-popover',
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }

  public rejectTransfiya(): void {
    this.alertService
      .create({
        ...TRANSFIYA_MANAGEMENT_REFUSE_DATA,
        title: !!this.isDispatch
          ? `¿Estás seguro de rechazar el pedido de No. de celular ${this.notification.targetNumber} y no enviar esta transferencia?`
          : '¿Estás seguro de rechazar esta transferencia? Si lo haces se perdera esta transacción'
      })
      .then((allow) => {
        if (allow) {
          this.reject.emit();
        }
      });
  }

  private updateFormValidations(): void {
    if (this.showTrustRelation) {
      this.form.addControl('nickname', new FormControl(null));
      this.nickname.setValidators([
        Validators.required,
        Validators.maxLength(15)
      ]);
      this.isDefaultAccount.setValue(false);
    } else {
      this.form.removeControl('nickname');
    }
  }

  private initForm(): void {
    if (this.products.length === 1) {
      this.productSelected.setValue(this.products[0]);
    }
  }

  get products(): Product[] {
    return this.form.get('products')?.value;
  }

  get isDispatch(): boolean {
    return this.form.get('isDispatch')?.value;
  }

  get notification(): TransfiyaAuthorizationItem {
    return this.form.get('notification')?.value;
  }

  get nickname(): AbstractControl {
    return this.form.get('nickname');
  }

  get productSelected(): AbstractControl {
    return this.form.get('productSelected');
  }

  get isDefaultAccount(): AbstractControl {
    return this.form.get('isDefaultAccount');
  }
}
