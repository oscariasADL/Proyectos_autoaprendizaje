import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as ENV } from '@environment';
import {
  PFMBalance,
  PFMBalancesResponse,
  PFMCategoriesOfMovements,
  PFMCategoriesOfMovementsResponse,
  PFMCategoriesResponse,
  PFMCategory,
  PFMCategoryType,
  PFMChangeCategoryPayload,
  PFMChangeCategoryResponse,
  PFMFilterBalanceSummaryPayload,
  PFMFilterCategoriesOfMovements,
  PFMMovement,
  PFMMovementByCategoryFilterPayload,
  PFMMovementsByCategoryResponse,
  PFMProductTypeEnum,
  VARIABLE0,
  VARIABLE1
} from '@modules/pfm/entities/pfm.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { TypeAccount } from '@commons/entities/product/type-account';

@Injectable()
export class PFMService {
  constructor(private http: HttpClient) {}

  public fetchCategoriesByType(
    categoryType: PFMCategoryType,
    productType: PFMProductTypeEnum
  ): Observable<PFMCategory[]> {
    const url = urlBuilder.services(
      ENV.api.services.pfm.fetch_categories_by_type,
      {
        categoryType,
        productType
      }
    );

    return this.http
      .get<PFMCategoriesResponse>(url)
      .pipe(map((response: PFMCategoriesResponse) => response.data.categories));
  }

  public getBalancesSummary(
    filters: PFMFilterBalanceSummaryPayload
  ): Observable<PFMBalance[]> {
    const endpoint =
      filters.accountType === TypeAccount.CCA
        ? ENV.api.services.pfm.credit_card_balances_summary
        : ENV.api.services.pfm.balances_summary;

    const url = urlBuilder.services(endpoint, {
      accountId: filters.accountId,
      startDate: filters.startDate,
      endDate: filters.endDate
    });

    return this.http
      .get<PFMBalancesResponse>(url)
      .pipe(map((response: PFMBalancesResponse) => response.data.products));
  }

  public fetchCategoriesOfMovements(
    filters: PFMFilterCategoriesOfMovements
  ): Observable<PFMCategoriesOfMovements[]> {
    const url = urlBuilder.services(
      ENV.api.services.pfm.categories_of_movements
    );

    return this.http
      .post<PFMCategoriesOfMovementsResponse>(url, {
        productId: filters.accountId,
        productType: filters.productType,
        startDate: filters.startDate,
        endDate: filters.endDate
      })
      .pipe(
        map(
          (response: PFMCategoriesOfMovementsResponse) => response.data.products
        )
      );
  }

  public fetchMovementsByCategory(
    filters: PFMMovementByCategoryFilterPayload
  ): Observable<PFMMovement[]> {
    const url = urlBuilder.services(ENV.api.services.pfm.movements_by_category);

    return this.http
      .post<PFMMovementsByCategoryResponse>(url, {
        ...filters,
        productId: filters.accountId,
        categoryId: filters.categoryCode
      })
      .pipe(
        map(
          (response: PFMMovementsByCategoryResponse) => response.data.movements
        )
      );
  }

  public changeCategory(
    changeCategoryPayload: PFMChangeCategoryPayload
  ): Observable<PFMChangeCategoryResponse> {
    const url = urlBuilder.services(ENV.api.services.pfm.change_category);
    return this.http.post<PFMChangeCategoryResponse>(
      url,
      changeCategoryPayload
    );
  }

  public adviserStartConversation(): Observable<any> {
    const url = urlBuilder.services(
      ENV.api.services.pfm.adviser_aval.send_start_conversation
    );
    return this.http.post<any>(url, {
      variable0: VARIABLE0,
      variable1: VARIABLE1
    });
  }

  public loadConsejeroScript(): void {
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { defineCustomElements } from '${ENV.api.services.pfm.adviser_aval.consejero_aval_script}';
      defineCustomElements();
    `;
    document.head.appendChild(script);
  }
}
