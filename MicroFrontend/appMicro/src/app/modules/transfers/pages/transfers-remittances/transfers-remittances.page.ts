// transfers-remittances.page.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { TransfersFacade } from '../../transfers.facade';
import { Product } from '@app/commons/entities/product/product.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { ProductFilterSelector } from '@app/commons/entities/product/product-types.interface';
import { ProductTypeDetail } from '@app/commons/entities/product/product-type-detail.interface';
import { Balance } from '@app/commons/entities/product/balance.interface';
import {
  CheckCustomerResult,
  CustomerRemittancesType
} from './interfaces/remittance-services.interface';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-transfers-remittances',
  templateUrl: './transfers-remittances.page.html',
  styleUrls: ['./transfers-remittances.page.sass']
})
export class TransfersRemittancesPage implements OnInit, OnDestroy {
  private queryParams: Subscription;
  public backUrl = '';
  public showHeaders = false;
  public readonly customerRemittancesType = CustomerRemittancesType;
  public readonly isLoading$: Observable<boolean> =
    this.facade.remittanceLoading$;
  constructor(
    private facade: TransfersFacade,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  private accountFilters: ProductFilterSelector = {
    excludeSubtypeAccountProducts: [ProductTypeDetail.CER],
    typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
  };

  public readonly products$: Observable<Product[]> = this.facade.balance$.pipe(
    filter((balance) => !!balance),
    map((balance: Balance[]) =>
      this.productService.filterProducts(balance, this.accountFilters)
    )
  );

  public validateCustomer$: Observable<CheckCustomerResult> =
    this.facade.remittanceResult$.pipe(
      filter((res): res is CheckCustomerResult => !!res),
      tap(() => (this.showHeaders = true))
    );

  ngOnInit(): void {
    this.queryParams = this.route.queryParams.subscribe((params) => {
      this.backUrl = decodeURI(params['from']);
    });

    this.facade.transferRemittance();
  }

  ngOnDestroy(): void {
    this.queryParams.unsubscribe();
  }

  public selectProduct(
    product: Product,
    remittanceCheckResponse: CheckCustomerResult
  ) {
    this.facade.handleCustomerFlow(remittanceCheckResponse, product);
  }
}
