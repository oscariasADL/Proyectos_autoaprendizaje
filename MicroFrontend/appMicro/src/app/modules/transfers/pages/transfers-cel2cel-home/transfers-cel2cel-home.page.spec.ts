import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { TransfersCel2celHomePage } from './transfers-cel2cel-home.page';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { StripTagsPipe } from '@commons/pipes/strip-tags.pipe';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SpiConsentServiceMock } from '@testing/mocks/services/spi-consent.service.mock';

describe('TransfersCel2celHomePage', () => {
  let component: TransfersCel2celHomePage;
  let fixture: ComponentFixture<TransfersCel2celHomePage>;

  const informationServiceSpy = {
    showPanelIfNecessary: jasmine
      .createSpy('showPanelIfNecessary')
      .and.resolveTo(''),
    showPanel: jasmine.createSpy('showPanel').and.resolveTo('')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersCel2celHomePage, ImageUrlPipe, StripTagsPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: InformationService,

          useValue: informationServiceSpy
        },
        { provide: SpiConsentService, useClass: SpiConsentServiceMock },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersCel2celHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showCel2CelInformation', async () => {
    await component.showCel2CelInformation();
    expect(informationServiceSpy.showPanel).toHaveBeenCalled();
  });
});
