import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { VoucherCampaignComponent } from './voucher-campaign.component';
import { TestingModule } from '@testing/testing.module';
import { MarketingCampaignsFacade } from '@modules/marketing-campaigns/marketing-campaigns.facade';
import { MarketingCampaignsFacadeMock } from '@testing/mocks/facade/marketing-campaigns.facade.mock';
import { ImageUrlAltPipe } from '@app/commons/pipes/image-url-alt.pipe';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';

describe('VoucherCampaignComponent', () => {
  let component: VoucherCampaignComponent;
  let fixture: ComponentFixture<VoucherCampaignComponent>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherCampaignComponent, ImageUrlAltPipe],
      imports: [TestingModule, IonicModule, PreloadImageDirective],
      providers: [
        {
          provide: MarketingCampaignsFacade,
          useClass: MarketingCampaignsFacadeMock
        },
        {
          provide: NavController,
          useValue: navCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VoucherCampaignComponent);
    component = fixture.componentInstance;
    component.campaign = {
      id: 'voucher-campaign',
      place: ['alert-sheet'],
      title: 'Bolsillos',
      description:
        'Abre tu Bolsillo y comienza a ahorrar para todo lo que quieras.',
      linkKnowMore: {
        url: '/pockets',
        text: 'Ábrelo aquí',
        isExternal: false
      },
      image: {
        url: '/bancadigital/assets/img/bm/marketing/voucher-campaing-pockets.svg',
        urlAlt:
          '/bancadigital/assets/img/bm/marketing/voucher-campaing-pockets.svg',
        alt: 'Voucher campaign Image'
      },
      backgroundColor: '#F2F2F2',
      isActive: true,
      accountTypesAllowed: []
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open link', () => {
    component.openLink();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(
      component.campaign.linkKnowMore.url
    );
  });
  it('should call openExternalLinks and not navigate internally when isExternal is true', () => {
    component.campaign.linkKnowMore = {
      url: 'https://external.com',
      text: 'Enlace Externo',
      isExternal: true
    };

    const doClickSpy = spyOn(component.doClick, 'emit');
    const openExternalLinksSpy = spyOn(
      component['facade'],
      'openExternalLinks'
    ).and.callFake(() => {
      return;
    });

    component.openLink();

    expect(doClickSpy).toHaveBeenCalled();
    expect(openExternalLinksSpy).toHaveBeenCalledWith('https://external.com');
  });
});
