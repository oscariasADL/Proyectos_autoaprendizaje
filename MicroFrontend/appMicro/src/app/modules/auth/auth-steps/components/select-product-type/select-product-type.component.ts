import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import {
  AuthStepResponse,
  SecureDataBriefProductType
} from '@modules/auth/auth-steps/entities/auth-steps.interface';

@Component({
  selector: 'app-select-product-type',
  templateUrl: './select-product-type.component.html',
  styleUrls: ['./select-product-type.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectProductTypeComponent extends AuthStepsBase {
  public products: ProductCard[] = [
    {
      title: 'AUTH.STEP.SELECT_PRODUCT_TYPE.PRODUCTS.SAVING_ACCOUNT',
      icon: 'icon-retiro',
      typeDetail: SecureDataBriefProductType.DEBIT_CARD
    },
    {
      title: 'AUTH.STEP.SELECT_PRODUCT_TYPE.PRODUCTS.CREDIT_CARD',
      icon: 'icon-tarjeta',
      typeDetail: SecureDataBriefProductType.CREDIT_CARD
    }
  ];

  constructor(protected injector: Injector) {
    super(injector);
  }

  public run(productType: string): void {
    this.method({
      processId: this.data.processId,
      content: {
        selectedProductType: productType
      }
    });
  }

  get method(): any {
    return this.routeData.method;
  }

  get title(): string {
    return this.routeData.title;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }
}
