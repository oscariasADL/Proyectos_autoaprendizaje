import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { PopoverComponent } from '@commons/components/popover/popover.component';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isValidCellPhone } from '@commons/utils/util';
import { PopoverController } from '@ionic/angular';
import { TYPE_ACCOUNT_TRANSFER_ACCOUNTS } from '@modules/contacts/entities/contact-product.interface';
import {
  Contact,
  ContactProduct,
  StatusType,
  StatusTypeProduct
} from '@modules/contacts/entities/contact.interface';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransferContactSlide } from '@modules/transfers/pages/transfers-contacts/constants/transfers-contacts.constants';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-contacts-products',
  templateUrl: './transfer-contacts-products.component.html',
  styleUrls: ['./transfer-contacts-products.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferContactsProductsComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<string> = new EventEmitter<string>();
  @Output() continueSlide: EventEmitter<string> = new EventEmitter<string>();

  public contactData: Contact;
  public statusProduct = StatusTypeProduct;
  public popoverMessage = this.translate.instant(
    'CONTACTS.POPOVER.BLOCK_PRODUCT'
  );

  constructor(
    private facade: TransfersContactsFacade,
    private popoverCtrl: PopoverController,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.contactData = this.contact.value;
    this.facade.fetchContactProducts({
      id: this.contactData.identificationData.id,
      idType: this.contactData.identificationData.idType
    });
  }

  public selectContactProduct(product: ContactProduct): void {
    this.transferType.setValue(TransferType.MY_CONTACTS);
    this.contactProduct.setValue(product);
    if (product.status === this.statusProduct.ACTIVE) {
      this.continue.emit();
    }
  }

  public selectPhoneNumber(): void {
    this.contactProduct.setValue(this.contactData.phoneNumber);
    this.continueSlide.emit(TransferContactSlide.contactProductType);
  }

  public editContactSelected(): void {
    this.continueSlide.emit(TransferContactSlide.toward);
  }

  public async showPopover(ev: Event, text: string, id: string): Promise<void> {
    const popover = await this.popoverCtrl.create({
      id: 'popover-product-detail-' + id,
      component: PopoverComponent,
      componentProps: {
        text
      },
      cssClass: 'avv-popover',
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }

  get contactProducts$(): Observable<ContactProduct[]> {
    return this.facade.contactProducts$.pipe(
      filter((prod) => !!prod),
      map((products) =>
        products.filter((product: ContactProduct) =>
          TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(
            product.type.id as TypeAccount
          )
        )
      )
    );
  }

  get contactProductsCompleted$(): Observable<boolean> {
    return this.facade.contactProductsCompleted$;
  }

  get contactProductsWorking$(): Observable<boolean> {
    return this.facade.contactProductsWorking$;
  }

  get exceedsTransferToPhoneMax(): boolean {
    return (
      this.amount.currencyValue() >
      this.facade.boundsByKey(ParameterKey.transferToAvvPhoneMax)
    );
  }

  get transferLessMinimum(): boolean {
    return (
      this.amount.currencyValue() <
      this.facade.boundsByKey(ParameterKey.transferValueToSendMin)
    );
  }

  get isValidCellPhone(): boolean | string {
    return (
      !!this.facade.featureFlagsByKey(FeatureFlagsKey.TransferCel2cel) &&
      isValidCellPhone(this.contactData.phoneNumber)
    );
  }

  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  get contactProduct(): AbstractControl {
    return this.form.get('contactProduct');
  }

  get contact(): AbstractControl {
    return this.form.get('contact');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
