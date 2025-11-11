import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SearchListItem } from '@commons/components/search-list/entities/search-list.entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgreementTaxes } from '../../entities/payment-taxes.interface';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';

@Component({
  selector: 'app-payments-taxes-step-agreement',
  templateUrl: './payments-taxes-step-agreement.component.html',
  styleUrls: ['./payments-taxes-step-agreement.component.sass']
})
export class PaymentsTaxesStepAgreementComponent implements OnInit {
  @Input() city: UntypedFormControl;
  @Input() agreement: UntypedFormControl;
  @Input() isBarcode: UntypedFormControl;
  @Output() continue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() scrollToTop: EventEmitter<number> = new EventEmitter<number>();

  constructor(private facade: PaymentTaxesFacade) {}

  ngOnInit(): void {
    this.scrollToTop.emit(0);
    if (this.isBarcode.value) {
      this.continue.emit(false);
    } else {
      this.facade.fetchAgreements(this.city.value.code);
    }
  }

  public onSelectAgreement(agreement: AgreementTaxes): void {
    this.agreement.patchValue(agreement);
    this.continue.emit(true);
  }

  get agreements$(): Observable<SearchListItem[]> {
    return this.facade.agreements$.pipe(
      map((agreements) =>
        agreements.map((tax) => ({
          title: tax.name,
          subtitle: tax.expectedReferenceDescription,
          item: tax
        }))
      )
    );
  }

  get workingAgreements$(): Observable<boolean> {
    return this.facade.workingAgreements$;
  }

  get errorAgreements$(): Observable<boolean> {
    return this.facade.errorAgreements$;
  }
}
