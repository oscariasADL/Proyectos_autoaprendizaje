import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TransfersAdminTransfiyaPage } from './transfers-admin-transfiya.page';
import { TestingModule } from '@testing/testing.module';
import { InformationService } from '@commons/services/information.service';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AppFacade } from '@app/app.facade';
import { of } from 'rxjs';

describe('TransfersAdminTransfiyaPage', () => {
  let component: TransfersAdminTransfiyaPage;
  let fixture: ComponentFixture<TransfersAdminTransfiyaPage>;
  let appFacadeMock: AppFacadeMock;
  const informationServiceSpy = jasmine.createSpyObj('InformationService', [
    'showPanel',
    'showPanelIfNecessary'
  ]);

  beforeEach(waitForAsync(() => {
    appFacadeMock = new AppFacadeMock();
    TestBed.configureTestingModule({
      declarations: [TransfersAdminTransfiyaPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule, RouterTestingModule],
      providers: [
        {
          provide: AppFacade,
          useValue: appFacadeMock
        },
        {
          provide: InformationService,
          useValue: informationServiceSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersAdminTransfiyaPage);
    component = fixture.componentInstance;
    appFacadeMock.isFeatureFlagEnabled = () => of(true);
    informationServiceSpy.showPanelIfNecessary.and.returnValue(
      Promise.resolve(true)
    );
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to showInformation', () => {
    informationServiceSpy.showPanel.and.returnValue(Promise.resolve(null));
    component.showInformation();
    expect(informationServiceSpy.showPanel).toHaveBeenCalled();
  });
});
