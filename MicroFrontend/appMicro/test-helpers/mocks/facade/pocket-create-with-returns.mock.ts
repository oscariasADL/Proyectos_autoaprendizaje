import { TypeAccount } from '@app/commons/entities/product/type-account';
import { ParameterType } from '@app/store/state/parameter.state';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { ProductFactory } from '@testing/factories/product.factory';
import { of } from 'rxjs';

export class PocketsFacadeWithReturnseMock {
  products$ = of([new ProductFactory().create()]);
  pockets$ = of({ pockets: [new PocketFactory().create()] });
  balance$ = of({
    products: [
      { ...new ProductFactory().create(), typeAccount: TypeAccount.SDA },
      { ...new ProductFactory().create(), typeAccount: TypeAccount.DDA }
    ]
  });

  parameterByKey(key: ParameterType) {
    return {
      currentValue: () => [
        {
          id: '1',
          name: 'Test Category'
        }
      ]
    };
  }
  boundsByKey(key: ParameterType) {
    return 1000000;
  }

  boundsValue(key: ParameterType) {
    return 500000;
  }
}
