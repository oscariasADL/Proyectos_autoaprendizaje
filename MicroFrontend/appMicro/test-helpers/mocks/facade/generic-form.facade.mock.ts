import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class GenericFormFacadeMock extends AppFacadeMock {
  public products$: Observable<Product[]> = new BehaviorSubject([]);
}
