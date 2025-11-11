import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import {
  TowardAccount,
  TransferAvalKeyForm
} from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { TransfersAvalKeyFacade } from '@modules/transfers/pages/transfers-aval-key/transfers-aval-key.facade';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { removeSubscriptions } from '@commons/utils/util';
import { transfersAvalKeyValidator } from '@modules/transfers/pages/transfers-aval-key/helpers/transfer-aval-key.helper';

@Component({
  selector: 'app-transfers-aval-key-toward',
  templateUrl: './transfers-aval-key-toward.component.html',
  styleUrls: ['./transfers-aval-key-toward.component.sass']
})
export class TransfersAvalKeyTowardComponent
  implements OnDestroy, AfterViewInit
{
  @Input() form: FormGroup<TransferAvalKeyForm>;
  @Input() utagCategory: string | null = null;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  private readonly subscriptions: Subscription[] = [];

  constructor(private facade: TransfersAvalKeyFacade) {}

  ngAfterViewInit() {
    this.towardAvalKey.setErrors(null);
    this.towardAvalKey.clearValidators();
    this.towardAvalKey.setValidators([
      Validators.required,
      transfersAvalKeyValidator.call(this)
    ]);
    this.towardAvalKey.valueChanges.subscribe((value) => {
      if (value) {
        this.towardAvalKey.setValue(value.trim().toUpperCase(), {
          emitEvent: false
        });
        this.towardAvalKey.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
      }
    });
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public continueAction(): void {
    this.facade.fetchAccountAvalKey(this.towardAvalKey.value);
    this.subscriptions.push(
      this.facade.transferAvalKeyAccountAvalKey$
        .pipe(
          withLatestFrom(this.facade.transferAvalKeyCompleted$),
          filter(
            ([accountAvalKey, completed]) =>
              completed && !isNullOrUndefined(accountAvalKey)
          )
        )
        .subscribe(([accountAvalKey, completed]) => {
          this.towardProduct.setValue({
            productId: accountAvalKey.accountId,
            productType: accountAvalKey.accountType,
            bank: accountAvalKey.bankId,
            identSerialNum: accountAvalKey.identSerialNum,
            govIssueIdentType: accountAvalKey.govIssueIdentType,
            key: accountAvalKey.key,
            type: accountAvalKey.type,
            fullName: accountAvalKey.fullName,
            bankName: accountAvalKey.bankName,
            cameraReference: accountAvalKey.cameraReference,
            receiverCamera: accountAvalKey.receiverCamera,
            personType: accountAvalKey.personType,
            personCategory: accountAvalKey.personCategory,
            ...(accountAvalKey?.merchantId
              ? { merchantId: accountAvalKey.merchantId }
              : {})
          });
          this.contactName.setValue(accountAvalKey.name);
          this.continue.emit();
        })
    );
  }

  get amountMax(): number {
    return this.facade.boundsByKey(ParameterKey.cel2celAmountMax);
  }

  get towardAvalKey(): AbstractControl {
    return this.form.get('towardAvalKey');
  }

  get towardProduct(): AbstractControl<TowardAccount> {
    return this.form.get('towardProduct');
  }

  get contactName(): AbstractControl<string> {
    return this.form.get('contactName');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get note(): AbstractControl {
    return this.form.get('addenda.note');
  }
}
