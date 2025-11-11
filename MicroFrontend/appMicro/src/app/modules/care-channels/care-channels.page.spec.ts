import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { IonicModule } from '@ionic/angular';
import { TestComponent } from '@testing/component/test.component';
import { CareChannelsFacadeMock } from '@testing/mocks/facade/care-channels.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { CareChannelsFacade } from './care-channels.facade';
import { CareChannelsPage } from './care-channels.page';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

describe('CareChannelsPage', () => {
  let component: CareChannelsPage;
  let fixture: ComponentFixture<CareChannelsPage>;
  let facade: CareChannelsFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CareChannelsPage],
      imports: [
        GlobalPipesModule,
        IonicModule,
        TestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'care-channels/chat',
            component: TestComponent
          }
        ])
      ],
      providers: [
        { provide: CareChannelsFacade, useClass: CareChannelsFacadeMock },
        { provide: AppFacade, useClass: AppFacadeMock },
        {
          provide: AdlSecureStorageService,
          useValue: { getAll: async () => ({ [SecureKeys.token]: 123 }) }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    facade = TestBed.inject(CareChannelsFacade);

    fixture = TestBed.createComponent(CareChannelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create subscription', () => {
    component.subscription = null;
    expect(component).toBeTruthy();
  });

  it('financialConsumerAdvocate should be null', () => {
    expect(component.financialConsumerAdvocate).toBeNull();
  });

  it('should open alert component', () => {
    spyOn(facade, 'openExternalLinks');
    component.openUrl('https://www.google.com');
    expect(facade.openExternalLinks).toHaveBeenCalled();
  });

  it('should open alert UrlMap component', () => {
    spyOn(facade, 'openExternalLinks');
    component.openMapUrl('https://www.google.com');
    expect(facade.openExternalLinks).toHaveBeenCalled();
  });

  it('should get username from email', () => {
    const email = 'bmavv@example.com';
    const username = component.getEmailUsername(email);
    expect(username).toBe('bmavv');
  });

  it('should get domain from email', () => {
    const email = 'bmavv@example.com';
    const domain = component.getEmailDomain(email);
    expect(domain).toBe('example.com');
  });
});
