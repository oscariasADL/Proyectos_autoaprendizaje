import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { WalletProductDetailPanelComponent } from './wallet-product-detail-panel.component';
import { TestingModule } from '@testing/testing.module';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Product } from '@commons/entities/product/product.interface';
import { Observable, of } from 'rxjs';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

describe('WalletProductDetailPanelComponent', () => {
  let component: WalletProductDetailPanelComponent;
  let fixture: ComponentFixture<WalletProductDetailPanelComponent>;
  let digitalWalletContextServiceStub: Partial<DigitalWalletContextService>;
  let walletsFacadeStub: Partial<WalletsFacade>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    digitalWalletContextServiceStub = {
      async validateWalletStatus(): Promise<void> {
        return Promise.resolve();
      },
      async isWalletCreated(): Promise<{ wallet: boolean }> {
        return Promise.resolve({ wallet: true });
      },
      async getDigitalCardId(options: {
        cardId: string;
      }): Promise<{ digitalCardId: string }> {
        return Promise.resolve({ digitalCardId: '123' });
      },
      async canPushCardWalletPay(options: {
        cardId: string;
      }): Promise<{ canPushCardWalletPay: boolean }> {
        return Promise.resolve({ canPushCardWalletPay: true });
      }
    };
    walletsFacadeStub = {
      isFeatureFlagEnabled(key: FeatureFlagsKey): Observable<boolean> {
        return of(true);
      },
      getProduct(typeAccount: TypeAccount, id: string): Product {
        return {
          idUM: ''
        };
      },
      deviceInfo$: of({
        deviceOS: 'ios'
      }) as any
    };
    TestBed.overrideComponent(WalletProductDetailPanelComponent, {
      add: {
        imports: [TestingModule],
        providers: [
          {
            provide: NavController,
            useValue: navCtrlSpy
          },
          {
            provide: DigitalWalletContextService,
            useValue: digitalWalletContextServiceStub
          },
          {
            provide: WalletsFacade,
            useValue: walletsFacadeStub
          }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(WalletProductDetailPanelComponent);
    component = fixture.componentInstance;
    component.typeAccount = TypeAccount.CCA;
    component.id = '121234';
    component.maxTimeout = 100;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call initTokenization', () => {
    component.initTokenization();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalled();
  });
});
