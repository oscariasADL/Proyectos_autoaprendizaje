import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { TransferPayload } from '@app/modules/transfers/entities/transfers.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-villas',
  templateUrl: './villas.component.html',
  styleUrls: ['./villas.component.sass']
})
export class VillasComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() utagEvent: UtagEvent;

  @Output() payloadChanged = new EventEmitter<TransferPayload>();
  private formChangesSub: Subscription;

  ngOnInit() {
    this.formChangesSub = this.form.valueChanges.subscribe((value) => {
      const {
        accountNumber,
        accountType,
        product,
        transferType,
        favoriteName
      } = value;
      if (accountNumber && accountType) {
        const payload = {
          sourceAccount: { productType: product.type, productId: product.id },
          targetAccount: {
            productType: accountType,
            productId: accountNumber
          },
          transferType: transferType.value,
          favoriteName
        } as TransferPayload;
        this.payloadChanged.emit(payload);
      }
    });
  }

  ngOnDestroy() {
    this.formChangesSub?.unsubscribe();
  }

  toggleValues = [
    { label: 'Ahorros', value: TypeAccount.SDA },
    { label: 'Corriente', value: TypeAccount.DDA }
  ];
  get accountNumber() {
    return this.form.get('accountNumber');
  }
  get favoriteName() {
    return this.form.get('favoriteName');
  }
  get toggleValue() {
    return this.form.get('accountType');
  }
}
