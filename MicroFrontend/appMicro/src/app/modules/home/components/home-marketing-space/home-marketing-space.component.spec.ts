import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { HomeMarketingSpaceComponent } from './home-marketing-space.component';
import { TestingModule } from '@testing/testing.module';
import { HomeFacade } from '../../home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

describe('HomeMarketingSpaceComponent', () => {
  let component: HomeMarketingSpaceComponent;
  let fixture: ComponentFixture<HomeMarketingSpaceComponent>;
  let facadeMock: HomeFacadeMock;

  beforeEach(waitForAsync(() => {
    facadeMock = new HomeFacadeMock();
    facadeMock.deviceInfo$ = of({ deviceOS: 'ios' }) as any;
    facadeMock.isFeatureFlagEnabled = (featureFlag: FeatureFlagsKey) =>
      of(true);
    TestBed.configureTestingModule({
      declarations: [HomeMarketingSpaceComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: HomeFacade, useValue: facadeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMarketingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir interceptMathildeAdds al hacer clic', () => {
    spyOn(component.interceptMathildeAdds, 'emit');
    const mouseEvent = new MouseEvent('click');
    component.interceptMathildeAddsClick(mouseEvent);
    expect(component.interceptMathildeAdds.emit).toHaveBeenCalledWith(
      mouseEvent
    );
  });

  it('debería emitir openExternalLink al hacer clic', () => {
    spyOn(component.openExternalLink, 'emit');
    const linkKey = LinkKey.linkCdt;
    component.openExternalLinkClick(linkKey);
    expect(component.openExternalLink.emit).toHaveBeenCalledWith(linkKey);
  });

  it('debería retornar true si el banner de Feature flag está habilitado', (done) => {
    facadeMock.isFeatureFlagEnabled = (featureFlag: FeatureFlagsKey) =>
      of(true);
    component
      .isEnableFeatureFlag(FeatureFlagsKey.AppleWalletBanner)
      .subscribe((isEnabled) => {
        expect(isEnabled).toBeTrue();
        done();
      });

    facadeMock.isFeatureFlagEnabled = (featureFlag: FeatureFlagsKey) =>
      of(false);
    component
      .isEnableFeatureFlag(FeatureFlagsKey.AppleWalletBanner)
      .subscribe((isEnabled) => {
        expect(isEnabled).toBeFalse();
        done();
      });
  });

  it('debería verificar si el dispositivo es Web', () => {
    expect(component.currentPlatform).toBe('web');
  });
});
