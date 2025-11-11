import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfersRemittancesPage } from './transfers-remittances.page';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TransfersFacade } from '../../transfers.facade';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductNumberMaskPipe } from '@app/commons/pipes/product-number-mask.pipe';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AppFacade } from '@app/app.facade';

describe('TransfersRemittancesPage', () => {
  let component: TransfersRemittancesPage;
  let fixture: ComponentFixture<TransfersRemittancesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersRemittancesPage],
      imports: [IonicModule, TestingModule, HttpClientTestingModule],
      providers: [
        { provide: TransfersFacade, useClass: TransfersFacadeMock },
        ProductNumberMaskPipe
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TransfersRemittancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
