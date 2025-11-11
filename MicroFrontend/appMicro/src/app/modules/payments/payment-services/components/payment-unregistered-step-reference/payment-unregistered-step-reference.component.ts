import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { removeSubscriptions } from '@commons/utils/util';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  SearchBillReferenceResponse,
  ServiceData
} from '../../entities/register-service.interface';
import { PaymentServicesFacade } from '../../payment-services.facade';

@Component({
  selector: 'app-payment-unregistered-step-reference',
  templateUrl: './payment-unregistered-step-reference.component.html',
  styleUrls: ['./payment-unregistered-step-reference.component.sass']
})
export class PaymentUnregisteredStepReferenceComponent
  implements OnInit, OnDestroy
{
  //
  private subscriptions: Subscription[] = [];
  private lastReference: string;
  bill: ServiceData;
  referenceInfo: SearchBillReferenceResponse;
  public showExample: boolean = false;

  @Input() form: UntypedFormGroup;
  @Input() reference: UntypedFormControl;
  @Input() payValue: UntypedFormControl;
  @Input() isBarcode: UntypedFormControl;
  @Input() isSelectNewBill: UntypedFormControl;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() backClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private facade: PaymentServicesFacade) {}

  ngOnInit(): void {
    this.lastReference = this.reference.value;
    if (!!this.isBarcode.value) {
      this.backClick.emit();
    } else {
      if (this.isSelectNewBill.value) {
        this.cleanValues();
      }
      const { bill } = this.form.value;
      this.bill = bill;
      this.subscriptions.push(
        this.facade.referenceInfo$
          .pipe(filter((ref) => !!ref))
          .subscribe((referenceInfo) => {
            this.referenceInfo = referenceInfo;
            const {
              amount,
              amountType,
              invoiceNumber,
              maxPaymentDateComplete,
              agreementType
            } = referenceInfo;
            this.payValue.patchValue(parseFloat(amount.toString()));
            this.amountType.patchValue(amountType);
            this.invoiceNumber.patchValue(invoiceNumber);
            this.maxPaymentDateComplete.patchValue(maxPaymentDateComplete);
            this.agreementType.patchValue(agreementType);
          }),
        this.reference.valueChanges
          .pipe(filter((val) => val !== this.lastReference))
          .subscribe((val) => {
            this.lastReference = val;
            this.facade.searchBillReferenceClean();
            this.referenceInfo = null;
            if (this.bill.isBiller) {
              this.payValue.patchValue(null);
            }
          })
      );
    }
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  private cleanValues(): void {
    this.referenceInfo = null;
    this.reference.reset(null);
    this.payValue.reset(null);
    this.amountType.reset('Valor_facturador_principal');
    this.invoiceNumber.reset(null);
    this.maxPaymentDateComplete.reset(null);
    this.agreementType.reset(null);
    this.facade.searchBillReferenceClean();
    this.isSelectNewBill.setValue(false);
  }

  public searchReference(nie: string): void {
    this.facade.searchBillReference({
      nie,
      orgIdNum: this.bill.orgIdNum
    });
  }

  get working$(): Observable<boolean> {
    return this.facade.searchWorkingSelector$;
  }

  get notFound$(): Observable<boolean> {
    return this.facade.notFound$;
  }

  get hasErrorMessage$(): Observable<string> {
    return this.facade.hasErrorMessage$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.searchCompleted$;
  }

  get showNotFunds(): boolean {
    return (
      !!this.bill &&
      this.bill.isBiller &&
      this.payValue.hasError('transferValueToSendNotFunds')
    );
  }

  get shouldRegisterService(): boolean {
    return (
      this.payValue.value >
      this.facade.boundsByKey(ParameterKey.paymentServiceAmountMax)
    );
  }

  get invoiceNumber(): AbstractControl {
    return this.form.get('invoiceNumber');
  }

  get maxPaymentDateComplete(): AbstractControl {
    return this.form.get('maxPaymentDateComplete');
  }

  get agreementType(): AbstractControl {
    return this.form.get('agreementType');
  }

  get amountType(): AbstractControl {
    return this.form.get('amountType');
  }
}
