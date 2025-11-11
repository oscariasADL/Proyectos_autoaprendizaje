import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { TransfersPendingPage } from './transfers-pending.page';

describe('TransfersPendingPage', () => {
  let component: TransfersPendingPage;
  let fixture: ComponentFixture<TransfersPendingPage>;
  let facade: TransfersFacade;
  const navControllerSpy = jasmine.createSpyObj('NavController', [
    'navigateForward'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersPendingPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        },
        { provide: NavController, useValue: navControllerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersPendingPage);
    facade = TestBed.inject(TransfersFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToTransfiyaAuthorization', () => {
    spyOn(component, 'goToTransfiyaAuthorization').and.callThrough();
    component.goToTransfiyaAuthorization({
      amount: 30000,
      targetNumber: '32456984',
      note: '',
      transactionId: 'uier89er89eiun',
      isRequest: false
    });
    expect(component.goToTransfiyaAuthorization).toHaveBeenCalled();
  });

  it('should refresh notification', () => {
    const event = {
      target: {
        complete: jasmine.createSpy('complete')
      }
    };
    spyOn(facade, 'getTransfiyaAuthorizations');
    component.doRefresh(event);
    expect(facade.getTransfiyaAuthorizations).toHaveBeenCalled();
    expect(event.target.complete).toHaveBeenCalled();
  });
});
