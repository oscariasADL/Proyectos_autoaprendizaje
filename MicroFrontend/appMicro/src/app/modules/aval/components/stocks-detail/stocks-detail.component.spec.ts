import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { CHANNEL } from '@modules/aval/entities/stocks.interface';
import { AvalFacadeMock } from '@testing/mocks/facade/aval.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { AvalFacade } from '../../aval.facade';
import { StocksDetailComponent } from './stocks-detail.component';

describe('StocksDetailComponent', () => {
  let component: StocksDetailComponent;
  let fixture: ComponentFixture<StocksDetailComponent>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
    TestBed.configureTestingModule({
      declarations: [ImageUrlPipe, StocksDetailComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: AvalFacade, useClass: AvalFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(StocksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    expect(component.close()).toBeUndefined();
  });

  it('should get stocksDetail', () => {
    expect(component.stocksDetail$).toBeDefined();
  });

  it('should get channel', () => {
    expect(component.getChannel(1)).toEqual(CHANNEL[1]);
  });
});
