import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PFMService } from './pfm.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  PFMCategoryType,
  PFMProductTypeEnum,
  VARIABLE0,
  VARIABLE1
} from '@modules/pfm/entities/pfm.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

describe('PfmService', () => {
  const setup = (): {
    service: PFMService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(PFMService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PFMService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(PFMService);
    expect(service).toBeTruthy();
  });

  it('should get balances summary', () => {
    const { service, httpTestingController } = setup();
    const startDate = '2022-04-25';
    const endDate = '2022-04-26';

    const idProduct = '3';

    const url = urlBuilder.services(ENV.api.services.pfm.balances_summary, {
      accountId: idProduct,
      startDate,
      endDate
    });

    const balancesResponse = {
      data: {
        products: [
          {
            accountNumber: '518500000000999',
            idProduct,
            type: 'CA',
            incomes: 1550000.22,
            expenses: -445000,
            balance: 1105000.22,
            previousBalance: 0,
            overdraft: 0,
            totalIncomes: 1550000.22
          }
        ]
      }
    };

    service
      .getBalancesSummary({
        accountId: idProduct,
        startDate,
        endDate,
        accountType: TypeAccount.SDA
      })
      .subscribe();

    const req = httpTestingController.expectOne(url);
    req.flush(balancesResponse);
    expect(req.request.method).toBe('GET');
  });

  it('should fetchCategoriesByType', () => {
    const { service, httpTestingController } = setup();
    const type = PFMCategoryType.INCOME;
    const url = urlBuilder.services(
      ENV.api.services.pfm.fetch_categories_by_type,
      {
        categoryType: type,
        productType: PFMProductTypeEnum.CA
      }
    );

    service.fetchCategoriesByType(type, PFMProductTypeEnum.CA).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({
      code: 'CIS-200',
      message: 'OK',
      data: {
        categories: [
          {
            code: '100001',
            name: 'Obligaciones Financieras',
            color: '#5b679a'
          },
          {
            code: '10001',
            name: 'Alimentación',
            color: '#fe8b25'
          }
        ]
      }
    });
    expect(req.request.method).toBe('GET');
  });

  it('should fetchMovementsByCategory', () => {
    const { service, httpTestingController } = setup();
    const startDate = '2022-04-25';
    const endDate = '2022-04-26';
    const idProduct = '3';
    const categoryCode = '3';
    const url = urlBuilder.services(ENV.api.services.pfm.movements_by_category);
    service
      .fetchMovementsByCategory({
        accountId: idProduct,
        startDate,
        endDate,
        categoryCode,
        productType: PFMProductTypeEnum.CA
      })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({
      code: 'SMS-200',
      message: 'OK',
      data: {
        products: [
          {
            accountNumber: '640808478',
            idProduct: '3',
            expenses: {
              total: 5365000.0,
              previousTotal: 0.0,
              categories: [
                {
                  code: '30001',
                  name: 'Belleza',
                  value: 1849323.0,
                  color: '#a42c71'
                }
              ]
            },
            incomes: {
              total: 19550000.22,
              previousTotal: 0.0,
              categories: [
                {
                  code: '610001',
                  name: 'Acciones productos financieros',
                  value: 1300000.0,
                  color: '#710b79'
                }
              ]
            }
          }
        ]
      }
    });
    expect(req.request.method).toBe('POST');
  });

  it('should fetchCategoriesOfMovements', () => {
    const { service, httpTestingController } = setup();
    const startDate = '2022-04-25';
    const endDate = '2022-04-26';
    const idProduct = '3';
    const url = urlBuilder.services(
      ENV.api.services.pfm.categories_of_movements,
      {
        accountId: idProduct,
        startDate,
        endDate
      }
    );
    service
      .fetchCategoriesOfMovements({
        accountId: idProduct,
        startDate,
        endDate,
        productType: 'CA'
      })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({
      code: 'SMS-200',
      message: 'OK',
      data: {
        products: []
      }
    });
    expect(req.request.method).toBe('POST');
  });

  it('should changeCategory', () => {
    const { service, httpTestingController } = setup();
    const idProduct = '3';
    const url = urlBuilder.services(ENV.api.services.pfm.change_category);
    service
      .changeCategory({
        productType: 'CA',
        idCategory: idProduct,
        transactions: []
      })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({
      code: 'SMS-200',
      message: 'OK',
      data: {
        products: []
      }
    });
    expect(req.request.method).toBe('POST');
  });
  it('should adviserStartConversation', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.pfm.adviser_aval.send_start_conversation
    );

    service.adviserStartConversation().subscribe();

    const req = httpTestingController.expectOne(url);
    req.flush({
      code: 'SMS-200',
      message: 'OK',
      data: {
        success: true
      }
    });

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      variable0: VARIABLE0,
      variable1: VARIABLE1
    });
  });
  it('should loadConsejeroScript and append script to document head', () => {
    const { service } = setup();

    const createElementSpy = spyOn(document, 'createElement').and.callThrough();

    const appendChildSpy = spyOn(document.head, 'appendChild');

    service.loadConsejeroScript();

    expect(createElementSpy).toHaveBeenCalledWith('script');
    expect(createElementSpy).toHaveBeenCalledTimes(1);

    const scriptElement = appendChildSpy.calls.first().args[0];

    const expectedScriptContent =
      `import { defineCustomElements } from '${ENV.api.services.pfm.adviser_aval.consejero_aval_script}';\n` +
      `      defineCustomElements();\n` +
      `    `;
    expect(scriptElement.textContent.trim()).toBe(expectedScriptContent.trim());

    expect(appendChildSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalledWith(scriptElement);
  });
});
