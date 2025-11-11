import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Navigation } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { CustomizeAvalTagResponse } from '../../entities/customize-aval-tag.interface';
import {
  VoucherItem,
  VoucherItemType
} from '@app/commons/components/voucher/entities/voucher.entities';
import CustomizeResultTransactionComponent from './customize-result-transaction.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';

xdescribe('CustomizeResultTransactionComponent', () => {
  let component: CustomizeResultTransactionComponent;
  let fixture: ComponentFixture<CustomizeResultTransactionComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockFacade: any;

  const mockResponse: CustomizeAvalTagResponse = {
    newKeyId: '123',
    accountId: '456',
    accountType: 'SAVINGS',
    approvalId: '789',
    keyType: 'email',
    date: '2025-06-30',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  };

  const mockVoucherItems: VoucherItem[] = [
    {
      id: 'voucher-1',
      label: 'Correo electrónico',
      fields: ['email@example.com'],
      type: VoucherItemType.AdditionalData,
      utagCategory: 'modificar llave',
      utag: 'click'
    }
  ];

  beforeEach(() => {
    // Crear mock del Router
    mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

    const partialNavigation: Partial<Navigation> = {
      extras: {
        state: {
          response: mockResponse
        }
      }
    };

    mockRouter.getCurrentNavigation.and.returnValue(
      partialNavigation as Navigation
    );

    // Mock del AppFacade
    mockFacade = {
      userData$: {
        currentValue: jasmine.createSpy().and.returnValue({
          dataBasicClientDto: {
            ip: '127.0.0.1'
          }
        })
      }
    };

    // Mock del mapper
    (jasmine as any).createSpy = () => mockVoucherItems;

    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CustomizeResultTransactionComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AppFacade, useValue: mockFacade }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CustomizeResultTransactionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
