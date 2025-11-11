import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';

@Component({
  selector: 'app-transfer-contacts-own',
  templateUrl: './transfer-contacts-own.component.html',
  styleUrls: ['./transfer-contacts-own.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferContactsOwnComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<string> = new EventEmitter<string>();

  public clientName: string;

  constructor(private facade: TransfersContactsFacade) {}

  ngOnInit(): void {
    this.facade.basicData$.subscribe(
      (basicData: DataBasicClientDto) =>
        (this.clientName = basicData?.clientName)
    );
  }

  public selectOwnProduct(product: Product): void {
    this.ownProduct.setValue(product);
    this.continue.emit();
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$.pipe(
      map((products: Product[]) =>
        products.filter(
          (product: Product) =>
            product.id.toString() !== this.fromProduct.value.id.toString()
        )
      )
    );
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get ownProduct(): AbstractControl {
    return this.form.get('ownProduct');
  }
}
