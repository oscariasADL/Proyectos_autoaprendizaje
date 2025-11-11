import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ProductFilterSelector } from '@commons/entities/product/product-types.interface';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgreementDetail } from '../../entities/payment-taxes.interface';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';

@Component({
  selector: 'app-payments-taxes-step-reference',
  templateUrl: './payments-taxes-step-reference.component.html',
  styleUrls: ['./payments-taxes-step-reference.component.sass']
})
export class PaymentsTaxesStepReferenceComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() accountFilters: ProductFilterSelector;

  @Output() continue: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectAccount: EventEmitter<any> = new EventEmitter<any>();
  @Output() goToCity: EventEmitter<any> = new EventEmitter<any>();
  @Output() exit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private facade: PaymentTaxesFacade) {}

  ngOnInit(): void {
    if (this.isBarcode) {
      this.setBarcodeReference();
    }
  }

  public searchReference(key: string): void {
    if (key === 'Enter') {
      this.facade.fetchReferenceValue({
        agreement: this.agreement.value.code,
        reference: this.reference.value
      });
    } else {
      this.facade.cleanReferenceDetail();
    }
  }

  public setBarcodeReference(): void {
    const agreement = this.agreement?.value;
    this.facade.fetchReferenceValueSuccess({
      invoiceNumber: agreement?.invoiceNumber,
      amount: agreement?.amount,
      currency: 'COP',
      maxPaymentDate: '',
      organizationId: agreement?.orgId.orgIdNum,
      referenceId: agreement?.nie,
      amountType: agreement?.amountType
    });
  }

  public onContinue(agreementDetail: AgreementDetail): void {
    this.agreementDetail.patchValue(agreementDetail);
    this.continue.emit();
  }

  public tryAgain(): void {
    if (this.isBarcode) {
      this.goToCity.emit();
    } else {
      this.searchReference('Enter');
    }
  }

  get agreementDetail$(): Observable<AgreementDetail> {
    return this.facade.agreementDetail$;
  }

  get working$(): Observable<boolean> {
    return this.facade.workingAgreementDetail$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completedAgreementDetail$;
  }

  get isOnlyOneAccount$(): Observable<boolean> {
    return this.facade.balance$.pipe(
      map(
        (balance) =>
          mapProductsByFilter(balance, this.accountFilters)?.length === 1
      )
    );
  }

  get agreementDetailNotFound$(): Observable<boolean> {
    return this.facade.agreementDetailNotFound$;
  }

  get agreementDetailMessage$(): Observable<string> {
    return this.facade.agreementDetailNotFoundMessage$;
  }

  get city(): AbstractControl {
    return this.form.get('city');
  }

  get agreement(): AbstractControl {
    return this.form.get('agreement');
  }

  get reference(): AbstractControl {
    return this.form.get('reference');
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get agreementDetail(): AbstractControl {
    return this.form.get('agreementDetail');
  }

  get isBarcode(): boolean {
    return this.form.get('isBarcode').value;
  }
}
