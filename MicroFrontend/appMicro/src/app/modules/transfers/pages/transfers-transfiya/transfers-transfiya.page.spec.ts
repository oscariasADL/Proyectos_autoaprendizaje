import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InformationService } from '@commons/services/information.service';
import { TransfiyaInfoService } from '@commons/services/transfiya-info.service';
import { IonicModule, NavController } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { TransfersTransfiyaPage } from './transfers-transfiya.page';

describe('TransfersTransfiyaPage', () => {
  let component: TransfersTransfiyaPage;
  let fixture: ComponentFixture<TransfersTransfiyaPage>;
  let navControlSpy: jasmine.SpyObj<NavController>;
  let informationServiceSpy: jasmine.SpyObj<InformationService>;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    informationServiceSpy = jasmine.createSpyObj('InformationService', [
      'showPanel',
      'showPanelIfNecessary'
    ]);

    TestBed.configureTestingModule({
      declarations: [TransfersTransfiyaPage],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        {
          provide: InformationService,
          useValue: {
            showPanelIfNecessary: async () => ''
          }
        },
        {
          provide: TransfiyaInfoService,
          useValue: {}
        },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersTransfiyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the given URL when redirect is called', () => {
    const url = ['/some-url'];
    component.redirect(url);
    expect(navControlSpy.navigateForward).toHaveBeenCalledWith(url);
  });
});
