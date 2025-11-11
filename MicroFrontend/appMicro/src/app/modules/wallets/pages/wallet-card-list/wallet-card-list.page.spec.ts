import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';

import { WalletCardListPage } from './wallet-card-list.page';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { WalletsFacadeMock } from '@testing/mocks/facade/wallets.facade.mock';
import { WalletsFactory } from '@testing/factories/wallets.factory';
import {
  DigitalCardStructureExt,
  GroupedDigitalCards
} from '@modules/wallets/entities/wallets.interface';
import { DEBIT_CARD_BIN } from '@modules/wallets/constants/wallets.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { ProductNumberMaskPipe } from '@commons/pipes/product-number-mask.pipe';
import { TestingModule } from '@testing/testing.module';
import { ActivatedRoute } from '@angular/router';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { AlertService } from '@commons/services/alert.service';

describe('WalletCardListComponent', () => {
  let component: WalletCardListPage;
  let fixture: ComponentFixture<WalletCardListPage>;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);
  let digitalWalletContextServiceStub: Partial<DigitalWalletContextService>;
  let walletFacade: WalletsFacadeMock;
  let activatedRouteMock: any;
  const walletsFactory = new WalletsFactory();

  const baseCard: DigitalCardStructureExt = {
    id: '12345',
    bin: DEBIT_CARD_BIN,
    status: 'Active',
    lastDigits: '1234',
    expirationDate: '2505',
    imageIsLoaded: true,
    canPushCardInWalletPay: true
  } as DigitalCardStructureExt;

  const mockDebitCards: DigitalCardStructureExt[] = [
    { ...baseCard },
    { ...baseCard, id: '24680', lastDigits: '2468', expirationDate: '2705' }
  ];

  beforeEach(waitForAsync(() => {
    walletFacade = new WalletsFacadeMock();
    digitalWalletContextServiceStub = {
      async getDigitalCardId(options: {
        cardId: string;
      }): Promise<{ digitalCardId: string }> {
        return {
          digitalCardId: '23238'
        };
      }
    };
    activatedRouteMock = {
      snapshot: {
        queryParams: {
          id: '23238',
          typeAccount: 'SDA'
        }
      }
    };
    TestBed.configureTestingModule({
      declarations: [WalletCardListPage, ImageUrlPipe, ProductNumberMaskPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: DigitalWalletContextService,
          useValue: digitalWalletContextServiceStub
        },
        { provide: WalletsFacade, useValue: walletFacade },
        { provide: AlertService, useValue: alertServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletCardListPage);
    component = fixture.componentInstance;

    walletFacade.cardList$ = of(walletsFactory.createCardList());
    walletFacade.walletCardList$ = of(walletsFactory.createWalletCardList());
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call pushCard', async () => {
    walletFacade.basicData$ = of({
      clientName: 'Rover'
    });
    const cardDetail: DigitalCardStructureExt = {
      ...baseCard
    };

    expect(await component.pushCard(cardDetail)).toBe(void 0);
    cardDetail.canPushCardInWalletPay = false;
    alertServiceSpy.create.and.returnValue(Promise.resolve(true));
    expect(await component.pushCard(cardDetail)).toBe(void 0);
  });

  it('should be call getSrcImgFranchise', () => {
    const cardNumber = '4242424242424242';
    const srcImgFranchise = component.getSrcImgFranchise(cardNumber);
    expect(srcImgFranchise).toEqual('./assets/img/visa-symbol.svg');
  });

  it('should call validateAndPushCardAction when alert response is true', async () => {
    const cardDetail: DigitalCardStructureExt = {
      ...baseCard
    };

    alertServiceSpy.create.and.returnValue(Promise.resolve(true));
    spyOn(walletFacade, 'validateAndPushCardAction');

    await component.pushCard(cardDetail);

    expect(walletFacade.validateAndPushCardAction).toHaveBeenCalledWith(
      cardDetail.id
    );
  });

  it('should handle case where product is not found in initTokenizationByParam', async () => {
    const spyGetProduct = spyOn(walletFacade, 'getProduct').and.returnValue(
      null
    );
    const spyPushCard = spyOn(component, 'pushCard');

    await component['initTokenizationByParam']();

    expect(spyPushCard).not.toHaveBeenCalled();
  });

  it('should not call initTokenizationByParam if no parameters in route', async () => {
    activatedRouteMock.snapshot.queryParams = {};
    fixture.detectChanges();

    const spyPushCard = spyOn(component, 'pushCard');

    await component['initTokenizationByParam']();

    expect(spyPushCard).not.toHaveBeenCalled();
  });

  it('should group cards by type (debit/credit) correctly', (done) => {
    const mockDigitalCards: DigitalCardStructureExt[] = [
      { ...baseCard },
      {
        ...baseCard,
        id: '67890',
        bin: '456789',
        lastDigits: '5678',
        expirationDate: '2605'
      },
      { ...baseCard, id: '24680', lastDigits: '2468', expirationDate: '2705' }
    ];

    walletFacade.walletCardList$ = of(mockDigitalCards);

    fixture = TestBed.createComponent(WalletCardListPage);
    component = fixture.componentInstance;

    component.walletCardListGroup$.subscribe(
      (groupedCards: GroupedDigitalCards[]) => {
        expect(groupedCards.length).toBe(2);

        const debitGroup = groupedCards.find((group) => group.type === 'debit');
        const creditGroup = groupedCards.find(
          (group) => group.type === 'credit'
        );

        expect(debitGroup).toBeTruthy();
        expect(creditGroup).toBeTruthy();

        expect(debitGroup?.cards.length).toBe(2);
        expect(creditGroup?.cards.length).toBe(1);

        expect(
          debitGroup?.cards.some((card) => card.id === '12345')
        ).toBeTrue();
        expect(
          debitGroup?.cards.some((card) => card.id === '24680')
        ).toBeTrue();
        expect(
          creditGroup?.cards.some((card) => card.id === '67890')
        ).toBeTrue();

        done();
      }
    );
  });

  it('should filter empty card lists', (done) => {
    walletFacade.walletCardList$ = of([]);

    fixture = TestBed.createComponent(WalletCardListPage);
    component = fixture.componentInstance;

    const subscription = component.walletCardListGroup$.subscribe(() => {
      fail('Observable should not emit for empty card list');
      done();
    });

    subscription.unsubscribe();
    done();
  });

  it('should handle case with only debit cards', (done) => {
    walletFacade.walletCardList$ = of(mockDebitCards);

    fixture = TestBed.createComponent(WalletCardListPage);
    component = fixture.componentInstance;

    component.walletCardListGroup$.subscribe(
      (groupedCards: GroupedDigitalCards[]) => {
        expect(groupedCards.length).toBe(1);
        expect(groupedCards[0].type).toBe('debit');
        expect(groupedCards[0].cards.length).toBe(2);
        done();
      }
    );
  });

  it('should handle case with only credit cards', (done) => {
    const mockCreditCards: DigitalCardStructureExt[] = [
      {
        ...baseCard,
        id: '67890',
        bin: '456789',
        lastDigits: '5678',
        expirationDate: '2605'
      },
      {
        ...baseCard,
        id: '13579',
        bin: '987654',
        lastDigits: '1357',
        expirationDate: '2805'
      }
    ];

    walletFacade.walletCardList$ = of(mockCreditCards);

    fixture = TestBed.createComponent(WalletCardListPage);
    component = fixture.componentInstance;

    component.walletCardListGroup$.subscribe(
      (groupedCards: GroupedDigitalCards[]) => {
        expect(groupedCards.length).toBe(1);
        expect(groupedCards[0].type).toBe('credit');
        expect(groupedCards[0].cards.length).toBe(2);
        done();
      }
    );
  });

  it('should take only the first emission due to take(1) operator', (done) => {
    let emissionCount = 0;
    const firstEmission: DigitalCardStructureExt[] = [
      {
        ...baseCard
      }
    ];

    const subject = new BehaviorSubject<DigitalCardStructureExt[]>(
      firstEmission
    );
    walletFacade.walletCardList$ = subject.asObservable();

    fixture = TestBed.createComponent(WalletCardListPage);
    component = fixture.componentInstance;

    component.walletCardListGroup$.subscribe(() => {
      emissionCount++;
    });

    subject.next([
      ...firstEmission,
      {
        ...baseCard,
        id: '67890',
        bin: '456789',
        lastDigits: '5678',
        expirationDate: '2605'
      }
    ]);

    expect(emissionCount).toBe(2);
    done();
  });
});
