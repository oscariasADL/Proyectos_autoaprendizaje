import { Injectable } from '@angular/core';
import { Balance } from '@commons/entities/product/balance.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class ProductsFacadeMock extends AppFacadeMock {
  public balances$: Observable<Balance[]> = new BehaviorSubject([]);

  public hasProducts$: Observable<boolean> = new BehaviorSubject(false);

  public filter$: Observable<number> = new BehaviorSubject(3);

  public productTypeCategories$: Observable<DropdownList[]> =
    new BehaviorSubject([]);

  public setProductFilter(filter: number): void {}
}
