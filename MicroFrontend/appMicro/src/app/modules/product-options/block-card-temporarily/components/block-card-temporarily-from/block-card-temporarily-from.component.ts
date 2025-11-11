import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import {
  ActivationStatusLabel,
  BlockCardTemporarilyForm
} from '@modules/product-options/block-card-temporarily/entities/block-card-temporarily.interface';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import {
  ActivationProduct,
  ActivationStatusDescription
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';

@Component({
  selector: 'app-block-card-temporarily-from',
  templateUrl: './block-card-temporarily-from.component.html',
  styleUrls: ['./block-card-temporarily-from.component.sass']
})
export class BlockCardTemporarilyFromComponent {
  @Input() form: FormGroup<BlockCardTemporarilyForm>;
  @Input() parentProductId: string;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() unBlockProduct: EventEmitter<void> = new EventEmitter<void>();

  public readonly activationProducts: Observable<ActivationProduct[]> =
    this.securityMediaActivationFacade.productList$.pipe(
      filter((products) => Array.isArray(products)),
      withLatestFrom(this.securityMediaActivationFacade.digitalDebitCards$),
      map(([products, digitalDebitCards]) =>
        products.filter(
          (product: ActivationProduct) =>
            product.parentId === this.parentProductId &&
            !digitalDebitCards?.some(
              (card: DigitalDebitCard) =>
                card.numberDigitalCard === product.cardId
            ) &&
            [
              ActivationStatusDescription.ACTIVE,
              ActivationStatusDescription.TEMPORAL_BLOCK
            ].includes(product.status as ActivationStatusDescription)
        )
      )
    );
  public readonly activationStatusLabel = ActivationStatusLabel;

  constructor(
    private securityMediaActivationFacade: SecurityMediaActivationFacade
  ) {}

  public selectCard(product: ActivationProduct): void {
    this.activationProduct.setValue(product);
    if (product.status === ActivationStatusDescription.TEMPORAL_BLOCK) {
      this.unBlockProduct.emit();
      return;
    }
    this.continue.emit();
  }

  get workingSecurityMediaActivation$(): Observable<boolean> {
    return this.securityMediaActivationFacade.working$;
  }

  get activationProduct(): AbstractControl {
    return this.form.get('activationProduct');
  }
}
