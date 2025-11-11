import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { ProductDetailCampaignComponent } from './product-detail-campaign.component';
import { TestingModule } from '@testing/testing.module';
import { MarketingCampaignsFacade } from '@modules/marketing-campaigns/marketing-campaigns.facade';
import { MarketingCampaignsFacadeMock } from '@testing/mocks/facade/marketing-campaigns.facade.mock';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ImageUrlAltPipe } from '@app/commons/pipes/image-url-alt.pipe';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';
import { ProductActionType } from '@app/modules/product/entities/product-action.interface';

describe('ProductDetailCampaignComponent', () => {
  let component: ProductDetailCampaignComponent;
  let fixture: ComponentFixture<ProductDetailCampaignComponent>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailCampaignComponent, ImageUrlAltPipe],
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

    fixture = TestBed.createComponent(ProductDetailCampaignComponent);
    component = fixture.componentInstance;
    component.campaign = {
      id: 'product-detail-campaign',
      place: ['product-detail'],
      title: 'Bolsillos',
      description: 'Crea tus bolsillos y define tus metas de ahorro.',
      linkKnowMore: {
        url: '/pockets',
        text: 'Abrir bolsillo',
        isExternal: false
      },
      image: {
        url: 'https://picsum.photos/seed/picsum/78',
        urlAlt: 'https://picsum.photos/seed/picsum/78',
        alt: 'Campaign 1 Image'
      },
      backgroundColor: '#ECF7F9',
      isActive: true,
      accountTypesAllowed: [TypeAccount.SDA]
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
  it('should open external link when isExternal is true', () => {
    component.campaign = {
      ...component.campaign,
      linkKnowMore: {
        ...component.campaign.linkKnowMore,
        isExternal: true,
        url: 'https://ejemplo.com'
      }
    };
    const facadeSpy = TestBed.inject(MarketingCampaignsFacade);
    spyOn(facadeSpy, 'openExternalLinks');
    spyOn(component.doClick, 'emit');

    component.openLink();

    expect(component.doClick.emit).toHaveBeenCalled();
    expect(facadeSpy.openExternalLinks).toHaveBeenCalledWith(
      'https://ejemplo.com'
    );
  });
  it('should emit clickAction when action is defined', () => {
    component.campaign = {
      ...component.campaign,
      linkKnowMore: {
        ...component.campaign.linkKnowMore,
        isExternal: false,
        url: '/some-url',
        action: ProductActionType.Documents
      }
    };
    spyOn(component.doClick, 'emit');
    spyOn(component.clickAction, 'emit');

    component.openLink();

    expect(component.doClick.emit).toHaveBeenCalled();
    expect(component.clickAction.emit).toHaveBeenCalledWith('Documents');
  });
});
