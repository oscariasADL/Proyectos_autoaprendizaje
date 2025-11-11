import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Product } from '@commons/entities/product/product.interface';
import { productsByCategory } from '@modules/product/store/product.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class GenericFormFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(productsByCategory)
  );
}
